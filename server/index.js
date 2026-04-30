import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });
config({ path: join(__dirname, '..', '.env.local') });
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import OpenAI from 'openai';
import { ENGLISH_ASSISTANT_SYSTEM } from './prompts/english-assistant-system.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.groq.com"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const TO_EMAIL = (process.env.TO_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL || 'englishers.co@gmail.com').trim();
const FROM_EMAIL = (process.env.FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev').trim();
const FROM_NAME = (process.env.FROM_NAME || 'Englishers Club').trim();
const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
const GROQ_API_KEY = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
if (GEMINI_API_KEY) process.env.GEMINI_API_KEY = GEMINI_API_KEY; // retained for other parts; not used for chat
if (GROQ_API_KEY) process.env.GROQ_API_KEY = GROQ_API_KEY;
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const groqClient = GROQ_API_KEY
  ? new OpenAI({
      apiKey: GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  : null;

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['https://englishers-club.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: false,
}));
app.use(express.json({ limit: '50kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'تم تجاوز الحد المسموح، يرجى المحاولة لاحقاً' },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 40,
  message: { success: false, message: 'تم تجاوز حد الطلبات، يرجى الانتظار دقيقة ثم أعد المحاولة' },
  standardHeaders: true,
  legacyHeaders: false,
});

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const sanitize = (str) => (typeof str === 'string' ? str.trim().slice(0, 1000) : '');

const apiRouter = express.Router();

apiRouter.post('/chat', chatLimiter, async (req, res) => {
  try {
    if (!groqClient) {
      return res.status(503).json({
        success: false,
        message: 'المساعد الذكي غير متاح حالياً. تأكد من إعداد GROQ_API_KEY في ملفات البيئة',
      });
    }

    const { message, history = [], studentLevel } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'الرسالة مطلوبة' });
    }

    const safeMessage = String(message).trim().slice(0, 2000);
    if (!safeMessage) {
      return res.status(400).json({ success: false, message: 'الرسالة لا يمكن أن تكون فارغة' });
    }

    const historyLines = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-20)) {
        const role = h?.role === 'assistant' ? 'Assistant' : 'User';
        const text = typeof h?.content === 'string' ? h.content.slice(0, 2000) : '';
        if (text) historyLines.push(`${role}: ${text}`);
      }
    }

    let systemInstruction = ENGLISH_ASSISTANT_SYSTEM;
    if (studentLevel) {
      systemInstruction += `\n\n[Student level for this session: ${studentLevel}. Adapt your explanations and style accordingly.]`;
    }

    const groqMessages = [
      { role: 'system', content: systemInstruction },
      ...(historyLines.length
        ? historyLines.map((line) => {
            if (line.startsWith('Assistant: ')) return { role: 'assistant', content: line.replace(/^Assistant:\s*/, '') };
            return { role: 'user', content: line.replace(/^User:\s*/, '') };
          })
        : []),
      { role: 'user', content: safeMessage },
    ];

    const response = await groqClient.chat.completions.create({
      model: GROQ_MODEL,
      messages: groqMessages,
      temperature: 0.35,
      max_tokens: 900,
    });

    const text = String(response?.choices?.[0]?.message?.content || '').trim();
    if (!text) {
      return res.status(502).json({ success: false, message: 'لم يتلق المساعد رداً صحيحاً من الخدمة' });
    }

    res.status(200).json({ success: true, text });
  } catch (err) {
    console.error('Chat API error:', err?.status || err?.code || '-', err?.message || err);
    const errStr = String(err?.message || err);
    const isQuotaError = err?.status === 429 || err?.code === 429 ||
      errStr.includes('quota') || errStr.includes('RESOURCE_EXHAUSTED') || errStr.includes('limit: 0');
    const isModelNotFound = err?.status === 404 || err?.code === 404 || errStr.includes('is not found') || errStr.includes('NOT_FOUND');
    const isAuthError = err?.status === 401 || err?.code === 401 || errStr.toLowerCase().includes('unauthorized');
    const isUpstreamUnavailable = err?.status === 503 || err?.code === 503 || errStr.includes('Service Unavailable');
    const isInvalidKey = /invalid api key/i.test(errStr);
    let msg = 'حدث خطأ أثناء الاتصال بالمساعد الذكي';
    if (isInvalidKey) {
      msg = 'مفتاح Groq غير صالح. حدّث GROQ_API_KEY بمفتاح صحيح.';
    } else if (isUpstreamUnavailable) {
      msg = 'خدمة المساعد مشغولة حالياً. أعد المحاولة بعد قليل.';
    } else if (isAuthError || errStr.includes('API key') || errStr.includes('API_KEY')) {
      msg = 'المساعد غير متاح - تحقق من إعدادات الخادم';
    } else if (isQuotaError) {
      msg = 'تم استنفاد حد الاستخدام المجاني للمساعد. يرجى المحاولة بعد 30 دقيقة أو غداً.';
    } else if (isModelNotFound) {
      msg = 'المساعد غير متاح مؤقتاً. يرجى المحاولة لاحقاً أو تحديث GEMINI_MODEL في .env';
    }
    const status = (isQuotaError || isModelNotFound) ? 503 : (err?.status >= 400 && err?.status < 600 ? err.status : 503);
    res.status(status).json({ success: false, message: msg });
  }
});

apiRouter.get('/chat', (req, res) => {
  res.status(405).json({ message: 'استخدم POST لإرسال الرسائل', method: 'POST' });
});

apiRouter.post('/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, phone, telegram, course, level, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'الاسم، البريد الإلكتروني ورقم الهاتف مطلوبة' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'البريد الإلكتروني غير صحيح' });
    }

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeTelegram = sanitize(telegram || '');
    const safeCourse = sanitize(course || '');
    const safeLevel = sanitize(level || '');
    const safeMessage = sanitize(message || '');

    const courseLabels = {
      'adult-inperson': 'كورس الإنجليزية الحضوري',
      'adult-online': 'كورس الإنجليزية الأونلاين',
      kids: 'كورس الأطفال',
      ielts: 'كورس IELTS',
      'private-inperson': 'البرايفت الحضوري',
      'private-online': 'البرايفت الأونلاين',
    };
    const courseLabel = courseLabels[safeCourse] || safeCourse || 'لم يُحدد';

    const html = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>طلب تواصل جديد - نادي إنجلشرز</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f8fafc; padding: 24px; margin: 0; }
    .container { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }
    .header { background: #1D1D41; color: #fff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; }
    .content { padding: 24px; color: #334155; line-height: 1.8; }
    .row { display: flex; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .row:last-child { border-bottom: none; }
    .label { font-weight: bold; color: #1D1D41; min-width: 140px; }
    .value { flex: 1; }
    .message-box { background: #FDF5E6; border: 1px solid #F28C63; border-radius: 12px; padding: 16px; margin-top: 16px; }
    .footer { padding: 16px 24px; background: #f8fafc; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📩 طلب تواصل جديد - نادي إنجلشرز</h1>
    </div>
    <div class="content">
      <div class="row"><span class="label">الاسم:</span><span class="value">${escapeHtml(safeName)}</span></div>
      <div class="row"><span class="label">البريد الإلكتروني:</span><span class="value">${escapeHtml(safeEmail)}</span></div>
      <div class="row"><span class="label">رقم الهاتف:</span><span class="value">${escapeHtml(safePhone)}</span></div>
      ${safeTelegram ? `<div class="row"><span class="label">معرف التلجرام:</span><span class="value">${escapeHtml(safeTelegram)}</span></div>` : ''}
      <div class="row"><span class="label">الكورس المطلوب:</span><span class="value">${escapeHtml(courseLabel)}</span></div>
      <div class="row"><span class="label">المستوى الحالي:</span><span class="value">${escapeHtml(safeLevel) || 'لم يُحدد'}</span></div>
      ${safeMessage ? `<div class="message-box"><strong>الرسالة:</strong><p style="margin: 8px 0 0 0;">${escapeHtml(safeMessage)}</p></div>` : ''}
    </div>
    <div class="footer">تم إرسال هذا الطلب عبر نموذج الموقع - نادي إنجلشرز</div>
  </div>
</body>
</html>
`;

    const skipResend = process.env.SKIP_RESEND === '1';
    const logAndSuccess = () => {
      console.log('📩 طلب تواصل:', { name: safeName, email: safeEmail, phone: safePhone, telegram: safeTelegram || '-', course: courseLabel, level: safeLevel, message: safeMessage });
      return res.status(200).json({ success: true, message: 'تم إرسال رسالتك بنجاح' });
    };

    if (skipResend || !resend) {
      if (!resend) console.warn('RESEND_API_KEY غير موجود - يتم تسجيل البيانات فقط');
      return logAndSuccess();
    }

    const payload = {
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: safeEmail,
      subject: `New Contact: ${safeName}`,
      html,
    };

    try {
      const result = await resend.emails.send(payload);
      const { data, error } = result || {};

      if (error) {
        console.error('Resend error:', error?.message || error);
        return logAndSuccess();
      }

      res.status(200).json({ success: true, message: 'تم إرسال رسالتك بنجاح' });
    } catch (sendErr) {
      console.error('Resend exception:', sendErr?.message || sendErr);
      return logAndSuccess();
    }
  } catch (err) {
    console.error('Contact API error:', err);
    res.status(500).json({ success: false, message: 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً' });
  }
});

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

apiRouter.get('/health', (req, res) => {
  res.json({
    ok: true,
    groq: !!GROQ_API_KEY,
    resend: !!RESEND_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.redirect(302, FRONTEND_URL);
});

app.use((req, res) => {
  if (!req.path.startsWith('/api')) {
    return res.redirect(302, `${FRONTEND_URL}${req.path || '/'}`);
  }
  res.status(404).json({ error: 'Not found' });
});

function logStartup(port) {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`TO_EMAIL: ${TO_EMAIL}`);
  console.log(`FROM_EMAIL: ${FROM_EMAIL}`);
  if (!RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY is not set - emails will not be sent');
  } else {
    console.log('✓ Resend API key loaded');
  }
  if (!GROQ_API_KEY) {
    console.warn('⚠️  GROQ_API_KEY (or GEMINI_API_KEY) is not set - AI assistant will be unavailable');
  } else {
    console.log('✓ Groq API loaded - model:', GROQ_MODEL);
  }
}

function listenWithFallback(startPort) {
  const portNum = Number(startPort) || 3001;
  const server = app.listen(portNum, () => logStartup(portNum));
  server.on('error', (err) => {
    if (err?.code === 'EADDRINUSE') {
      const altPort = portNum + 1;
      console.error(`\n❌ المنفذ ${portNum} مستخدم بالفعل — سأحاول المنفذ ${altPort} تلقائياً.\n`);
      server.close(() => listenWithFallback(altPort));
      return;
    }
    throw err;
  });
  return server;
}

listenWithFallback(PORT);
