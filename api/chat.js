import OpenAI from 'openai';
import { ENGLISH_ASSISTANT_SYSTEM } from '../server/prompts/english-assistant-system.js';

const GROQ_API_KEY = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const client = GROQ_API_KEY
  ? new OpenAI({
      apiKey: GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  : null;

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGINS?.split(',')[0] || 'https://englishers-club.vercel.app';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.status(405).json({ success: false, message: 'استخدم POST لإرسال الرسائل' });
  }

  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    if (!client) {
      return res.status(503).json({
        success: false,
        message: 'المساعد الذكي غير متاح حالياً. تأكد من إعداد GROQ_API_KEY (أو GEMINI_API_KEY) في إعدادات Vercel',
      });
    }

    const { message, history = [], studentLevel } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'الرسالة مطلوبة' });
    }

    const safeMessage = String(message).trim().slice(0, 2000);
    if (!safeMessage) {
      return res.status(400).json({ success: false, message: 'الرسالة لا يمكن أن تكون فارغة' });
    }

    const chatMessages = [];
    chatMessages.push({ role: 'system', content: ENGLISH_ASSISTANT_SYSTEM });
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-20)) {
        const role = h?.role === 'assistant' ? 'assistant' : 'user';
        const text = typeof h?.content === 'string' ? h.content.slice(0, 2000) : '';
        if (text) chatMessages.push({ role, content: text });
      }
    }
    chatMessages.push({ role: 'user', content: safeMessage });

    if (studentLevel) {
      // keep it simple: append level hint as a user message
      chatMessages.unshift({
        role: 'system',
        content: `${ENGLISH_ASSISTANT_SYSTEM}\n\n[Student level for this session: ${studentLevel}. Adapt your explanations and style accordingly.]`,
      });
    }

    const response = await client.chat.completions.create({
      model: GROQ_MODEL,
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = String(response?.choices?.[0]?.message?.content || '').trim();
    if (!text) {
      return res.status(502).json({ success: false, message: 'لم يتلق المساعد رداً صحيحاً من الخدمة' });
    }

    return res.status(200).json({ success: true, text });
  } catch (err) {
    console.error('Chat API (Vercel) error:', err?.message || err);
    const errStr = String(err?.message || err);
    const isQuotaError =
      err?.status === 429 ||
      err?.code === 429 ||
      errStr.includes('quota') ||
      errStr.includes('RESOURCE_EXHAUSTED') ||
      errStr.includes('limit: 0');
    const isModelNotFound =
      err?.status === 404 ||
      err?.code === 404 ||
      errStr.includes('is not found') ||
      errStr.includes('NOT_FOUND');

    const isAuthError = err?.status === 401 || err?.code === 401 || errStr.toLowerCase().includes('unauthorized');
    const isInvalidKey = /invalid api key/i.test(errStr);
    let msg = 'حدث خطأ أثناء الاتصال بالمساعد الذكي';
    if (isInvalidKey) {
      msg = 'مفتاح Groq غير صالح. حدّث GROQ_API_KEY بمفتاح صحيح.';
    } else if (isAuthError || errStr.includes('API key') || errStr.includes('API_KEY')) {
      msg = 'المساعد غير متاح - تحقق من إعدادات الخادم';
    } else if (isQuotaError) {
      msg = 'تم استنفاد حد الاستخدام المجاني للمساعد. يرجى المحاولة بعد 30 دقيقة أو غداً.';
    } else if (isModelNotFound) {
      msg = 'المساعد غير متاح مؤقتاً. يرجى المحاولة لاحقاً أو تحديث GEMINI_MODEL في إعدادات Vercel';
    }

    const status =
      isQuotaError || isModelNotFound
        ? 503
        : err?.status >= 400 && err?.status < 600
        ? err.status
        : 503;

    return res.status(status).json({ success: false, message: msg });
  }
}

