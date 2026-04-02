/// <reference path="../vite-env.d.ts" />
import React, { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ArrowUp,
  Bot,
  Copy,
  Download,
  FileText,
  Loader2,
  Mic,
  Printer,
  Sparkles,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewMode = 'empty' | 'chat' | 'loading';

const MODEL_RESPONSE_MARKDOWN =
  '## شرح سريع: Present Perfect\n\nزمن **المضارع التام** (Present Perfect) نستخدمه لما حصل في الماضي لكن له علاقة بالآن.\n\n### متى نستخدمه؟\n- تجربة حصلت في حياتك: *I have visited London.*\n- شيء بدأ في الماضي ومستمر: *I have lived here for 3 years.*\n- شيء حصل للتو: *She has just arrived.*\n\n### الصيغة\n- **have/has + past participle**\n\nإذا أحببت، اكتب لي 3 جمل عن نفسك وسأصححها لك.';

const USER_MSG =
  'اشرح لي الفرق بين Present Perfect و Past Simple مع أمثلة بسيطة';

const SUGGESTIONS = [
  'اختبر مستواي في اللغة الإنجليزية بأسئلة قصيرة',
  'صحح هذه الجملة وفسّر الخطأ: I have went to school yesterday',
  'اعطني 10 كلمات مفيدة للمحادثة اليومية مع أمثلة',
];

type SpeechInputMode = 'both' | 'ar' | 'en';

const SPEECH_MODE_STORAGE_KEY = 'englishers-speech-input-mode';

/** Chromium يقبل عدة وسوم مفصولة بفاصلة فيفضّل العربية للنطق العربي مع بقاء الإنجليزية ممكنة. */
function getRecognitionLang(mode: SpeechInputMode): string {
  switch (mode) {
    case 'ar':
      return 'ar-SA';
    case 'en':
      return 'en-US';
    default:
      return 'ar-SA,en-US';
  }
}

interface MockMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  isStreaming: boolean;
}

interface ChatPageDesignProps {
  initialView?: ViewMode;
}

function buildMessages(view: ViewMode): MockMessage[] {
  if (view === 'empty') return [];
  if (view === 'chat') {
    return [
      { id: 'mock-u', role: 'user', content: USER_MSG, isStreaming: false },
      { id: 'mock-m1', role: 'model', content: MODEL_RESPONSE_MARKDOWN, isStreaming: false },
      { id: 'mock-m2', role: 'model', content: 'تمام! خلّينا نبدأ بخطوة بسيطة...', isStreaming: true },
    ];
  }
  return [
    { id: 'mock-u', role: 'user', content: USER_MSG, isStreaming: false },
    { id: 'mock-m1', role: 'model', content: MODEL_RESPONSE_MARKDOWN, isStreaming: false },
    { id: 'mock-m2', role: 'model', content: '', isStreaming: true },
  ];
}

export default function ChatPageDesign({ initialView = 'empty' }: ChatPageDesignProps) {
  const [view, setView] = useState<ViewMode>(initialView);
  const [isHowOpen, setIsHowOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveMessages, setLiveMessages] = useState<MockMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechBaseRef = useRef('');
  const finalTranscriptRef = useRef('');
  const speechUserStoppedRef = useRef(false);

  const speechSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  const [speechInputMode, setSpeechInputMode] = useState<SpeechInputMode>(() => {
    if (typeof window === 'undefined') return 'both';
    try {
      const v = localStorage.getItem(SPEECH_MODE_STORAGE_KEY);
      if (v === 'ar' || v === 'en' || v === 'both') return v;
    } catch {
      /* noop */
    }
    return 'both';
  });

  const persistSpeechInputMode = (mode: SpeechInputMode) => {
    setSpeechInputMode(mode);
    try {
      localStorage.setItem(SPEECH_MODE_STORAGE_KEY, mode);
    } catch {
      /* noop */
    }
  };

  const [isNarrowComposer, setIsNarrowComposer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches,
  );
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 480px)');
    const apply = () => setIsNarrowComposer(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    // Optional preview states for development ONLY
    if (!import.meta.env.DEV) return;
    if (view === 'chat') {
      setLiveMessages([
        {
          id: 'demo-u',
          role: 'user',
          content: 'اشرح لي الفرق بين Present Perfect و Past Simple مع أمثلة بسيطة',
          isStreaming: false,
        },
        {
          id: 'demo-m1',
          role: 'model',
          content:
            '## الفرق باختصار\n\n**Past Simple**: حدث انتهى في وقت محدد بالماضي.\n- *I visited London **last year**.*\n\n**Present Perfect**: تجربة/حدث في الماضي لكن نتيجته أو علاقته بالآن، أو بدون وقت محدد.\n- *I have visited London.*\n\n### جرّب أنت\nاكتب جملتين: واحدة بـ Past Simple وواحدة بـ Present Perfect، وسأصححها.',
          isStreaming: false,
        },
      ]);
      setError(null);
    } else if (view === 'loading') {
      setLiveMessages([
        { id: 'demo-u', role: 'user', content: 'اختبر مستواي في اللغة الإنجليزية', isStreaming: false },
        { id: 'demo-m1', role: 'model', content: '', isStreaming: true },
      ]);
      setError(null);
    } else if (view === 'empty') {
      // keep whatever user has typed; just clear conversation
      setLiveMessages([]);
      setError(null);
    }
  }, [view]);

  useEffect(() => {
    const root = scrollAreaRef.current;
    if (!root) return;
    const id = window.setTimeout(() => {
      try {
        root.scrollTop = root.scrollHeight;
      } catch {
        /* noop */
      }
    }, 0);
    return () => clearTimeout(id);
  }, [liveMessages]);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        /* noop */
      }
      recognitionRef.current = null;
    };
  }, []);

  const hasConversation = liveMessages.length > 0;
  const messages = liveMessages;
  const derivedView: 'empty' | 'chat' = hasConversation ? 'chat' : 'empty';

  const historyForApi = useMemo(() => {
    const items: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (const m of liveMessages) {
      if (!m.content || m.isStreaming) continue;
      items.push({ role: m.role === 'model' ? 'assistant' : 'user', content: m.content });
    }
    return items;
  }, [liveMessages]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const composerHintTitle =
    'اختصارات لوحة المفاتيح: Enter لإرسال الرسالة، Shift+Enter لإضافة سطر جديد داخل النص.';

  const placeholder = isNarrowComposer
    ? 'اكتب رسالتك…'
    : derivedView === 'empty'
      ? 'اكتب رسالتك هنا — Enter إرسال · Shift+Enter سطر'
      : 'اكتب رسالتك — Enter إرسال · Shift+Enter سطر';

  const sendMessage = async (forcedText?: string) => {
    const text = (forcedText ?? input).trim();
    if (!text || isSending) return;

    if (recognitionRef.current) {
      speechUserStoppedRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch {
        /* noop */
      }
      recognitionRef.current = null;
      setIsListening(false);
    }

    setError(null);
    setIsSending(true);
    setInput('');

    const userMsg: MockMessage = { id: `u-${Date.now()}`, role: 'user', content: text, isStreaming: false };
    const loadingMsg: MockMessage = { id: `m-${Date.now()}`, role: 'model', content: '', isStreaming: true };

    setLiveMessages((prev) => [...prev, userMsg, loadingMsg]);

    const doRequest = async () => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyForApi }),
      });
      const data = await res.json().catch(() => ({}));
      return { res, data };
    };

    try {
      let { res, data } = await doRequest();
      // One quick retry for transient 503
      if (res.status === 503) {
        await new Promise((r) => window.setTimeout(r, 900));
        ({ res, data } = await doRequest());
      }
      if (!res.ok || !data?.success) throw new Error(data?.message || 'تعذر الاتصال بالمساعد');

      const assistantText = String(data.text || '').trim();
      if (!assistantText) throw new Error('لم يتم استلام رد');

      startTransition(() => {
        setLiveMessages((prev) =>
          prev.map((m) => (m.id === loadingMsg.id ? { ...m, isStreaming: false, content: assistantText } : m)),
        );
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'حدث خطأ، حاول مرة أخرى';
      setError(msg);
      setLiveMessages((prev) => prev.filter((m) => m.id !== loadingMsg.id));
    } finally {
      setIsSending(false);
    }
  };

  const handleSuggestion = (text: string) => {
    void sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const clearSpeechErrorSoon = () => {
    window.setTimeout(() => setSpeechError(null), 4500);
  };

  const stopSpeechRecognition = () => {
    speechUserStoppedRef.current = true;
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
    recognitionRef.current = null;
    setIsListening(false);
  };

  const toggleSpeechRecognition = () => {
    if (!speechSupported || isSending) return;
    if (isListening) {
      stopSpeechRecognition();
      return;
    }
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      setSpeechError('المتصفح لا يدعم التحويل من صوت إلى نص. جرّب Chrome أو Edge.');
      clearSpeechErrorSoon();
      return;
    }

    setSpeechError(null);
    speechUserStoppedRef.current = false;
    finalTranscriptRef.current = '';
    speechBaseRef.current = input + (input && !/\s$/.test(input) ? ' ' : '');

    const rec = new Ctor();
    recognitionRef.current = rec;
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = getRecognitionLang(speechInputMode);
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const piece = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscriptRef.current += piece;
        else interim += piece;
      }
      setInput(speechBaseRef.current + finalTranscriptRef.current + interim);
    };

    rec.onerror = (event) => {
      if (event.error === 'aborted') return;
      if (event.error === 'no-speech' && speechUserStoppedRef.current) return;
      let msg = 'تعذر التعرف على الصوت';
      if (event.error === 'not-allowed') msg = 'يُرجى السماح باستخدام الميكروفون من شريط العنوان أو إعدادات المتصفح';
      else if (event.error === 'no-speech') msg = 'لم يُلتقط صوت. تحقق من الميكروفون وحاول مجدداً';
      else if (event.error === 'audio-capture') msg = 'لم يُعثر على ميكروفون أو الوصول إليه';
      setSpeechError(msg);
      clearSpeechErrorSoon();
      setIsListening(false);
      recognitionRef.current = null;
    };

    rec.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    try {
      rec.start();
      setIsListening(true);
    } catch {
      setSpeechError('تعذر تشغيل الميكروفون');
      clearSpeechErrorSoon();
      recognitionRef.current = null;
      setIsListening(false);
    }
  };

  const openHowItWorks = () => {
    setIsHowOpen(true);
  };

  useEffect(() => {
    if (!isHowOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsHowOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isHowOpen]);

  return (
    <>
      <div
        dir="rtl"
        className="isolate flex min-h-0 min-w-0 w-full max-w-full flex-1 flex-col overflow-x-hidden bg-background"
      >
        <div
          ref={scrollAreaRef}
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3 pt-3 max-[480px]:px-2.5 max-[480px]:pt-4 min-[481px]:max-[1024px]:px-4 min-[1025px]:px-6"
        >
          {derivedView === 'empty' ? (
            <div
              className="duration-300 animate-in fade-in slide-in-from-right-4 mx-auto flex w-full max-w-[880px] justify-center"
            >
              <div
                className="flex w-full flex-col items-center justify-center px-2 pb-2 pt-3 text-center max-[480px]:pt-2 min-[481px]:max-[1024px]:max-w-[760px] min-[1025px]:max-w-[880px]"
              >
                <button
                  type="button"
                  onClick={openHowItWorks}
                  className="mb-4 inline-flex max-w-full items-center justify-center rounded-full border border-border bg-card/60 px-3 py-2.5 text-center text-sm font-medium text-foreground/90 shadow-sm backdrop-blur transition-colors hover:bg-card min-[400px]:px-4 touch-manipulation"
                >
                  كيف تستخدم مساعد إنجلشرز لتتعلم بسرعة؟
                </button>

                <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/20">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>

                <h2
                  className="mb-3 text-[1.35rem] font-bold text-foreground min-[481px]:text-[1.55rem] min-[1025px]:text-[1.85rem]"
                >
                  مرحباً بك في مساعد إنجلشرز
                </h2>

                <p
                  className="mb-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground min-[481px]:text-[1rem] min-[1025px]:text-[1.05rem]"
                >
                  أنا هنا لمساعدتك في تعلم اللغة الإنجليزية بشكل عملي: شرح قواعد، كلمات ومحادثة، تصحيح
                  أخطاء، وتمارين قصيرة تناسب مستواك. كيف أساعدك اليوم؟
                </p>

                <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-2.5 min-[481px]:grid-cols-2">
                  {SUGGESTIONS.map((text, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSuggestion(text)}
                      className={cn(
                        'w-full rounded-xl border border-border/70 bg-card/70 p-3 text-right text-[0.86rem] leading-relaxed text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 max-[360px]:p-2.5 max-[360px]:text-[0.82rem] touch-manipulation min-h-[44px] min-[481px]:min-h-0',
                        i === 2 &&
                          'min-[481px]:col-span-2 min-[481px]:max-w-xl min-[481px]:justify-self-center',
                      )}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="mx-auto w-full min-w-0 max-w-[880px] space-y-4 pb-1 pt-1 min-[481px]:max-w-[760px] min-[1025px]:max-w-[880px] min-[1025px]:space-y-5"
            >
              <div className="flex flex-col gap-2 px-1 min-[540px]:flex-row min-[540px]:items-center min-[540px]:justify-between min-[540px]:gap-3">
                <p className="min-w-0 text-xs leading-relaxed text-muted-foreground min-[540px]:flex-1">
                  نصيحة: افتح آلية العمل للحصول على طريقة استخدام واضحة.
                </p>
                <button
                  type="button"
                  onClick={openHowItWorks}
                  className="shrink-0 self-start text-xs font-semibold text-primary hover:underline min-[540px]:self-auto touch-manipulation min-h-[44px] px-1 py-2 min-[540px]:min-h-0 min-[540px]:px-0 min-[540px]:py-0"
                >
                  آلية العمل
                </button>
              </div>
              {messages.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  className={cn(
                    'flex min-w-0 gap-2.5 min-[481px]:gap-3.5',
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
                  )}
                >
                  <div className="mt-1 flex-shrink-0">
                    {msg.role === 'user' ? (
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm min-[481px]:h-10 min-[481px]:w-10"
                      >
                        <User className="h-[18px] w-[18px]" />
                      </div>
                    ) : (
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm min-[481px]:h-10 min-[481px]:w-10"
                      >
                        <Bot className="h-[18px] w-[18px]" />
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      'flex min-w-0 flex-1 flex-col gap-1.5',
                      /* عرض الفقاعة: نخصم الأفاتار والفجوة حتى لا يتجاوز الصف عرض الشاشة (كان يسبب قص النص على الموبايل) */
                      'max-w-[calc(100%-2.75rem)] min-[481px]:max-w-[min(80%,calc(100%-3.25rem))] min-[1025px]:max-w-[min(76%,calc(100%-3.5rem))]',
                      msg.role === 'user' ? 'items-end' : 'items-start',
                    )}
                  >
                    {msg.role === 'user' ? (
                      <div className="min-w-0 max-w-full break-words rounded-2xl rounded-tr-sm bg-primary p-3.5 text-primary-foreground shadow-sm min-[481px]:p-4">
                        <p className="whitespace-pre-wrap break-words text-[0.92rem] leading-relaxed [overflow-wrap:anywhere] min-[481px]:text-[0.97rem]">
                          {msg.content}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div
                          dir="auto"
                          className="min-w-0 max-w-full break-words rounded-2xl rounded-tl-sm border border-border bg-card p-3 shadow-sm max-[480px]:px-3.5 max-[480px]:py-3 min-[481px]:p-4"
                        >
                          {!msg.content && msg.isStreaming ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                              <span className="text-sm">جاري التفكير...</span>
                            </div>
                          ) : (
                            <div
                              className={cn(
                                'assistant-md prose prose-zinc dark:prose-invert max-w-full min-w-0 break-words [overflow-wrap:anywhere]',
                                'prose-p:mt-0 prose-p:mb-3 prose-p:text-[0.9375rem] prose-p:leading-[1.65]',
                                'max-[480px]:prose-p:mb-2.5 max-[480px]:prose-p:text-[0.9rem] max-[480px]:prose-p:leading-[1.62]',
                                'prose-headings:scroll-mt-4 prose-headings:font-bold prose-headings:text-foreground',
                                'prose-h2:mb-2 prose-h2:mt-5 prose-h2:text-[1.15rem] prose-h2:leading-snug first:prose-h2:mt-0',
                                'prose-h3:mb-1.5 prose-h3:mt-4 prose-h3:text-[1.05rem] prose-h3:leading-snug',
                                'prose-strong:text-foreground prose-strong:font-semibold',
                                'prose-a:break-words prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
                                'prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-li:leading-[1.65]',
                                'prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground',
                                'prose-pre:my-3 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:border prose-pre:border-border/60 prose-pre:bg-zinc-950/40 prose-pre:p-3 prose-pre:text-[0.82rem] prose-pre:leading-relaxed dark:prose-pre:bg-zinc-950/50',
                                '[&_th]:text-start [&_td]:text-start',
                              )}
                            >
                              <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h2: ({ children, ...props }) => (
                                    <h2 {...props} className={cn('mb-2 mt-5 scroll-mt-4 text-[1.15rem] font-bold leading-snug text-foreground first:mt-0', (props as any)?.className)}>
                                      {children}
                                    </h2>
                                  ),
                                  h3: ({ children, ...props }) => (
                                    <h3 {...props} className={cn('mb-1.5 mt-4 text-[1.05rem] font-bold leading-snug text-foreground', (props as any)?.className)}>
                                      {children}
                                    </h3>
                                  ),
                                  ul: ({ children, ...props }) => (
                                    <ul {...props} className={cn('my-2 list-disc ps-5 [unicode-bidi:plaintext]', (props as any)?.className)}>
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children, ...props }) => (
                                    <ol {...props} className={cn('my-2 list-decimal ps-5 [unicode-bidi:plaintext]', (props as any)?.className)}>
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children, ...props }) => (
                                    <li {...props} className={cn('my-0.5 leading-[1.65]', (props as any)?.className)}>
                                      {children}
                                    </li>
                                  ),
                                  blockquote: ({ children, ...props }) => (
                                    <blockquote
                                      {...props}
                                      className={cn('my-3 border-s-4 border-primary/35 ps-3 text-[0.9em] text-muted-foreground [unicode-bidi:plaintext]', (props as any)?.className)}
                                    >
                                      {children}
                                    </blockquote>
                                  ),
                                  table: ({ children, ...props }) => (
                                    <div className="my-3 w-full overflow-x-auto rounded-xl border border-border/70">
                                      <table
                                        {...props}
                                        className="assistant-md w-full border-collapse text-[0.875rem] [unicode-bidi:plaintext] [&_th]:bg-background/60 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold [&_td]:px-3 [&_td]:py-2 [&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-border/50"
                                      >
                                        {children}
                                      </table>
                                    </div>
                                  ),
                                  th: ({ children, ...props }) => (
                                    <th {...props} className={cn('align-top text-start', (props as any)?.className)}>
                                      {children}
                                    </th>
                                  ),
                                  td: ({ children, ...props }) => (
                                    <td {...props} className={cn('align-top text-start text-muted-foreground', (props as any)?.className)}>
                                      {children}
                                    </td>
                                  ),
                                  p: ({ children, ...props }) => (
                                    <p {...props} className={cn('mb-3 mt-0 text-[0.9375rem] leading-[1.65] max-[480px]:mb-2.5 max-[480px]:text-[0.9rem]', (props as any)?.className)}>
                                      {children}
                                    </p>
                                  ),
                                  pre: ({ children, ...props }) => (
                                    <pre {...props} dir="ltr" className={cn('my-3 overflow-x-auto rounded-lg border border-border/60 bg-zinc-950/40 p-3 text-left text-[0.82rem] leading-relaxed dark:bg-zinc-950/50', (props as any)?.className)}>
                                      {children}
                                    </pre>
                                  ),
                                  code: ({ children, className, ...props }: { children?: React.ReactNode; className?: string }) => {
                                    const cls = typeof className === 'string' ? className : '';
                                    const raw = typeof children === 'string' ? children : '';
                                    const isBlock =
                                      cls.includes('language-') || (raw.length > 0 && /\n/.test(raw));
                                    if (!isBlock) {
                                      return (
                                        <code
                                          {...props}
                                          className={cn('rounded-md bg-background/70 px-1.5 py-0.5 font-mono text-[0.88em] text-foreground', className)}
                                          dir="ltr"
                                        >
                                          {children}
                                        </code>
                                      );
                                    }
                                    return (
                                      <code
                                        {...props}
                                        className={cn('block w-full font-mono text-[0.82rem] leading-relaxed text-zinc-100', className)}
                                      >
                                        {children}
                                      </code>
                                    );
                                  },
                                }}
                              >
                                {msg.content}
                              </Markdown>
                              {msg.isStreaming && (
                                <span
                                  aria-hidden
                                  className="ms-1 inline-block h-5 w-1 translate-y-[2px] animate-pulse rounded-full bg-foreground/70"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {error ? (
                <div className="rounded-xl border border-border bg-card p-3 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">تعذر تشغيل المساعد الآن</p>
                  <p className="mt-1 leading-relaxed">{error}</p>
                  {error.includes('GROQ_API_KEY') ? (
                    <p className="mt-2 text-xs">
                      الحل: ضع مفتاح Groq الصحيح في ملف <span className="font-mono">.env.local</span> ثم أعد تشغيل{' '}
                      <span className="font-mono">npm run dev:all</span>.
                    </p>
                  ) : null}
                </div>
              ) : null}

            </div>
          )}
        </div>

        <div
          className={cn(
            'relative z-10 shrink-0 border-t border-border/40 bg-background px-2.5 pt-2 pb-chat-safe min-[481px]:px-4 min-[1025px]:px-6',
            hasConversation && 'shadow-[0_-12px_24px_-16px_rgba(0,0,0,0.25)] dark:shadow-[0_-12px_24px_-16px_rgba(0,0,0,0.45)]',
          )}
        >
          <div className="mx-auto w-full min-w-0 max-w-[880px] min-[481px]:max-w-[760px] min-[1025px]:max-w-[880px]">
            <div className="flex min-w-0 items-end gap-2 rounded-2xl border border-border bg-card px-3 py-3 shadow-sm min-[400px]:gap-2 min-[481px]:gap-3 min-[481px]:px-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                title={composerHintTitle}
                rows={1}
                enterKeyHint="send"
                inputMode="text"
                className="min-h-[44px] max-h-[200px] min-w-0 flex-1 resize-none bg-transparent py-2.5 text-right text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground placeholder:text-[0.8125rem] max-[480px]:py-2 max-[480px]:placeholder:leading-normal min-[481px]:min-h-[40px] min-[481px]:py-2 min-[481px]:placeholder:text-sm"
                disabled={isSending}
              />
              <button
                type="button"
                disabled={isSending || !speechSupported}
                onClick={toggleSpeechRecognition}
                aria-pressed={isListening}
                aria-label={isListening ? 'إيقاف التحدث' : 'التحدث لتحويل الصوت إلى نص'}
                title={
                  !speechSupported
                    ? 'التعرف على الصوت غير متاح في هذا المتصفح (جرّب Chrome أو Edge)'
                    : isListening
                      ? 'إيقاف الاستماع'
                      : speechInputMode === 'both'
                        ? 'تحدّث بالعربية أو الإنجليزية — يُكتب النص بنفس اللغة قدر الإمكان'
                        : speechInputMode === 'ar'
                          ? 'تحدّث بالعربية ليظهر النص بالعربية'
                          : 'Speak in English for Latin text'
                }
                className={cn(
                  'flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-40 min-[481px]:h-9 min-[481px]:w-9',
                  isListening
                    ? 'border-primary/60 bg-primary/20 text-primary ring-2 ring-primary/30 max-[480px]:ring-1'
                    : 'border-border/80 bg-background/50 hover:bg-accent/30 active:bg-accent/40',
                )}
              >
                <Mic className={cn('h-[18px] w-[18px] min-[481px]:h-4 min-[481px]:w-4', isListening && 'text-primary')} />
              </button>
              <button
                type="button"
                disabled={!input.trim() || isSending}
                onClick={() => void sendMessage()}
                className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 active:opacity-90 min-[481px]:h-9 min-[481px]:w-9"
                aria-label="إرسال"
              >
                {isSending ? (
                  <Loader2 className="h-[18px] w-[18px] animate-spin min-[481px]:h-4 min-[481px]:w-4" />
                ) : (
                  <ArrowUp className="h-[18px] w-[18px] min-[481px]:h-4 min-[481px]:w-4" />
                )}
              </button>
            </div>

            {speechError ? (
              <p className="mt-1.5 text-center text-[0.72rem] leading-relaxed text-destructive min-[481px]:text-[0.75rem]">
                {speechError}
              </p>
            ) : null}

            {speechSupported ? (
              <div
                className="mx-auto mt-1.5 flex max-w-[840px] flex-wrap items-stretch justify-center gap-x-1 gap-y-2 px-1 text-[0.62rem] leading-relaxed text-muted-foreground min-[400px]:items-center min-[481px]:gap-x-1.5 min-[481px]:text-[0.66rem]"
                role="group"
                aria-label="لغة التعرف على الكلام"
              >
                <span className="flex w-full shrink-0 basis-full items-center justify-center text-center text-muted-foreground/85 min-[400px]:w-auto min-[400px]:basis-auto">
                  لغة الميكروفون:
                </span>
                {(
                  [
                    { mode: 'both' as const, label: 'عربي + إنجليزي' },
                    { mode: 'ar' as const, label: 'عربي فقط' },
                    { mode: 'en' as const, label: 'English فقط' },
                  ] as const
                ).map(({ mode, label }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => persistSpeechInputMode(mode)}
                    className={cn(
                      'min-h-[44px] touch-manipulation rounded-full border px-3 py-2 transition-colors min-[481px]:min-h-0 min-[481px]:px-2.5 min-[481px]:py-1',
                      speechInputMode === mode
                        ? 'border-primary/50 bg-primary/15 text-primary'
                        : 'border-transparent bg-background/50 hover:border-border/80 hover:bg-accent/25 active:bg-accent/35',
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}

            <div
              className="mx-auto mt-1.5 max-w-[840px] space-y-1 px-1 text-center text-[0.63rem] leading-relaxed text-muted-foreground/70 min-[481px]:text-[0.67rem]"
              aria-live="polite"
            >
              <p>قد يرتكب المساعد أخطاء؛ راجع المعلومات المهمة قبل الاعتماد عليها.</p>
              <p>
                المحادثة مؤقتة ولا تُحفظ — مغادرة القسم قد تمسحها. انسخ ما تحتاجه قبل الانتقال إذا أردت
                الاحتفاظ به.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (optional) - same content as section, for focused reading */}
      {isHowOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-2 max-[480px]:p-2 max-[480px]:pb-[max(0.5rem,env(safe-area-inset-bottom))] min-[481px]:items-center min-[481px]:p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsHowOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-h-[min(90dvh,calc(100svh-1rem))] overflow-y-auto overscroll-y-contain rounded-2xl border border-border bg-card p-3 pb-[max(1rem,env(safe-area-inset-bottom,12px))] shadow-2xl max-[480px]:max-w-full max-[480px]:rounded-b-2xl min-[481px]:max-h-[90vh] min-[481px]:max-w-[760px] min-[481px]:rounded-2xl min-[481px]:p-4 min-[481px]:pb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-foreground">كيف تستخدم مساعد إنجلشرز لتتعلم بسرعة؟</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  خطوات بسيطة + أمثلة جاهزة لتبدأ فوراً.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHowOpen(false)}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                إغلاق
              </button>
            </div>

            <div className="mt-4 grid gap-3 max-[480px]:grid-cols-1 min-[481px]:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <p className="text-sm font-semibold text-foreground">1) اطلب شيئاً محدداً</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  مثال: “اشرح الفرق بين Past Simple و Present Perfect مع 3 أمثلة”.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <p className="text-sm font-semibold text-foreground">2) جرّب أنت</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  اطلب تمرينين قصيرين، ثم اكتب إجابتك ليصححها ويشرح السبب.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <p className="text-sm font-semibold text-foreground">3) تصحيح الكتابة</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  الصق فقرة قصيرة، واطلب: “صحح الأخطاء ووضح القاعدة مع بدائل أفضل”.
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4">
                <p className="text-sm font-semibold text-foreground">4) محادثة (Role‑play)</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  مثال: “سوي محادثة في المطار (A2) وخلّيني أنا أجاوب”.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/70 bg-primary/5 p-4">
              <p className="text-sm font-semibold text-foreground">مهم</p>
              <p className="mt-1 text-sm text-muted-foreground">
                المساعد مخصص لتعلم الإنجليزية فقط. إذا كان طلبك خارج النطاق، سيقترح لك نشاطاً لغوياً مناسباً بدلاً من الإجابة المباشرة.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
