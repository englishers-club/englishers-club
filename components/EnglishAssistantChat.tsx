import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Home } from 'lucide-react';
import SiteLogo from './SiteLogo';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const formatTime = (ts: number) => {
  const d = new Date(ts);
  const h = d.getHours();
  const m = d.getMinutes();
  const am = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${am}`;
};

const formatContent = (content: string) => {
  const lines = content.split('\n');
  const parts: React.ReactNode[] = [];
  let key = 0;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      parts.push(<br key={key++} />);
      return;
    }
    const numbered = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numbered) {
      parts.push(
        <div key={key++} className="flex gap-2 mt-1.5 first:mt-0">
          <span className="text-[#F28C63] font-bold shrink-0">{numbered[1]}.</span>
          <span>{formatInlineText(numbered[2])}</span>
        </div>
      );
    } else if (trimmed.startsWith('**') || trimmed.startsWith('#')) {
      const text = trimmed.replace(/^#+\s*|\*\*/g, ' ').replace(/\s+/g, ' ').trim();
      parts.push(
        <div key={key++} className="mt-2 first:mt-0">
          <span className="text-[#F28C63] font-bold text-[1.05em]">{text}</span>
        </div>
      );
    } else {
      parts.push(
        <p key={key++} className="mt-1.5 first:mt-0">
          {formatInlineText(trimmed)}
        </p>
      );
    }
  });

  return <div className="space-y-0.5">{parts}</div>;
};

const formatInlineText = (text: string): React.ReactNode => {
  const boldRegex = /\*\*(.+?)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    parts.push(<strong key={key++} className="text-[#F28C63] font-semibold">{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return parts.length > 0 ? <>{parts}</> : text;
};

const EnglishAssistantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sendingRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const resetChat = () => {
    setMessages([]);
    setError(null);
    setInput('');
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading || sendingRef.current) return;

    sendingRef.current = true;
    setInput('');
    setError(null);

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const apiBase = import.meta.env.VITE_API_URL || '';
      const chatUrl = apiBase ? `${apiBase.replace(/\/$/, '')}/api/chat` : '/api/chat';
      const res = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('المساعد غير متصل. تأكد من تشغيل الخادم: npm run dev:all');
        }
        throw new Error(data.message || 'حدث خطأ أثناء الاتصال بالمساعد');
      }

      if (data.success && data.text) {
        const assistantMsg: Message = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: data.text,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.message || 'لم يتم استلام رد من المساعد');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ، يرجى المحاولة لاحقاً';
      setError(msg);
    } finally {
      setIsLoading(false);
      sendingRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Watermark / Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-2xl bg-[#1D1D41] p-1 shadow-xl ring-2 ring-[#F28C63]/40 hover:ring-[#F28C63] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(242,140,99,0.4)] focus:outline-none focus:ring-2 focus:ring-[#F28C63] focus:ring-offset-2 overflow-hidden"
        aria-label="فتح المساعد الذكي لتعليم الإنجليزية"
        title="المساعد الذكي - تعلم الإنجليزية"
      >
        <SiteLogo className="h-full w-full rounded-[10px] object-cover" alt="" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end sm:items-center sm:justify-center p-0 sm:p-4"
          aria-modal="true"
          role="dialog"
          aria-label="نافذة المساعد الذكي"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel - Dark theme matching the reference image */}
          <div
            className="relative w-full sm:max-w-[420px] h-[88vh] sm:h-[640px] sm:rounded-[28px] shadow-2xl flex flex-col overflow-hidden border-t-4 sm:border-4 sm:border-[#F28C63]/50 border-[#F28C63] bg-[#1D1D41]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-4 py-4 bg-[#1D1D41] border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#F28C63]/35 bg-white/5 shrink-0">
                  <SiteLogo className="h-full w-full object-cover" alt="" />
                </div>
                <div>
                  <h2 className="font-bold text-base text-white">المساعد الذكي</h2>
                  <p className="text-xs text-white/60">تعلم الإنجليزية - نادي إنجلشرز</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F28C63]/30 flex items-center justify-center text-white/80 hover:text-[#F28C63] transition-colors"
                  aria-label="بدء محادثة جديدة"
                  title="بدء محادثة جديدة"
                >
                  <Home size={20} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  aria-label="إغلاق"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages - Dark chat area */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 scroll-smooth bg-[#252550]/40">
              {messages.length === 0 && (
                <div className="text-center py-14 px-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-[#F28C63]/30 mx-auto mb-4 shadow-lg">
                    <SiteLogo className="h-full w-full object-cover" alt="" />
                  </div>
                  <p className="text-xl font-bold text-white mb-2">مرحباً! 👋</p>
                  <p className="text-[15px] leading-relaxed text-white/70 max-w-[280px] mx-auto mb-6">
                    أنا مساعدك لتعلم اللغة الإنجليزية. اسأل عن القواعد، المفردات، النطق، أو اطلب تصحيحاً لكتابتك.
                  </p>
                  <p className="text-sm text-white/50">
                    أو اطلب "اختبار مستوى" لتحديد مستواك والبدء
                  </p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[92%] sm:max-w-[88%] px-4 py-3.5 rounded-2xl relative ${
                      msg.role === 'user'
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-[#F28C63]/15 text-white/95 border border-[#F28C63]/40'
                    }`}
                  >
                    <div
                      className="text-[15px] leading-[1.85]"
                      style={{
                        fontFamily: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif",
                        letterSpacing: '0.02em',
                        wordSpacing: '0.06em',
                      }}
                    >
                      {msg.role === 'assistant' ? formatContent(msg.content) : msg.content}
                    </div>
                    <div className={`text-[11px] mt-2 ${msg.role === 'user' ? 'text-white/50' : 'text-[#F28C63]/70'}`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-[#F28C63]/15 border border-[#F28C63]/40">
                    <Loader2 size={22} className="animate-spin text-[#F28C63]" />
                  </div>
                </div>
              )}
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/20 text-red-200 text-sm border border-red-500/30">
                  {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Dark themed */}
            <div className="shrink-0 p-4 bg-[#1D1D41] border-t border-white/10">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب رسالتك..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder:text-white/40 px-4 py-3.5 text-[15px] focus:outline-none focus:border-[#F28C63] focus:ring-1 focus:ring-[#F28C63]/50 disabled:opacity-60"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-12 h-12 rounded-xl bg-[#F28C63] hover:bg-[#F28C63]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-lg shadow-[#F28C63]/25"
                  aria-label="إرسال"
                >
                  <Send size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnglishAssistantChat;
