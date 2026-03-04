import { GoogleGenAI } from '@google/genai';
import { ENGLISH_ASSISTANT_SYSTEM } from '../server/prompts/english-assistant-system.js';

const rawGeminiKey = (process.env.GEMINI_API_KEY || '').trim();
const GEMINI_API_KEY = rawGeminiKey.replace(/^["']|["']$/g, '');
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const genAI = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.status(405).json({ success: false, message: 'استخدم POST لإرسال الرسائل' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    if (!genAI) {
      return res.status(503).json({
        success: false,
        message: 'المساعد الذكي غير متاح حالياً. تأكد من إعداد GEMINI_API_KEY في إعدادات Vercel',
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

    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-20)) {
        const role = h?.role === 'assistant' ? 'model' : 'user';
        const text = typeof h?.content === 'string' ? h.content.slice(0, 2000) : '';
        if (text) {
          contents.push({ role, parts: [{ text }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: safeMessage }] });

    let systemInstruction = ENGLISH_ASSISTANT_SYSTEM;
    if (studentLevel) {
      systemInstruction += `\n\n[Student level for this session: ${studentLevel}. Adapt your explanations and style accordingly.]`;
    }

    const response = await genAI.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const text = response?.text?.trim() || '';
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

    let msg = 'حدث خطأ أثناء الاتصال بالمساعد الذكي';
    if (errStr.includes('API key') || errStr.includes('API_KEY')) {
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

