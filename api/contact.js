import { Resend } from 'resend';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGINS?.split(',')[0] || 'https://englishers-club.vercel.app';

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
const TO_EMAIL = (process.env.TO_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL || 'englishers.co@gmail.com').trim();
const FROM_EMAIL = (process.env.FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev').trim();
const FROM_NAME = (process.env.FROM_NAME || 'Englishers Club').trim();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const sanitize = (str) => (typeof str === 'string' ? str.trim().slice(0, 1000) : '');

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

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
    const { name, email, phone, telegram, course, level, message } = req.body || {};

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
      console.log('📩 طلب تواصل:', {
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        telegram: safeTelegram || '-',
        course: courseLabel,
        level: safeLevel,
        message: safeMessage,
      });
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
      const { error } = result || {};

      if (error) {
        console.error('Resend error:', error?.message || error);
        return logAndSuccess();
      }

      return res.status(200).json({ success: true, message: 'تم إرسال رسالتك بنجاح' });
    } catch (sendErr) {
      console.error('Resend exception:', sendErr?.message || sendErr);
      return logAndSuccess();
    }
  } catch (err) {
    console.error('Contact API (Vercel) error:', err);
    return res.status(500).json({ success: false, message: 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً' });
  }
}

