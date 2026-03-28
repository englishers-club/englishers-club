
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import BlurText from '../components/BlurText';
import { LocationMap } from '../components/ui/expand-map';
import { COURSES_DATA } from './Courses';

const COURSE_OPTIONS = [
  { value: '', label: 'اختر الكورس المطلوب' },
  ...COURSES_DATA.map((c) => ({ value: c.id, label: c.shortTitle })),
];

const MAX_MESSAGE_WORDS = 300;

const LEVEL_OPTIONS = [
  { value: '', label: 'اختر المستوى' },
  { value: 'beginner', label: 'مبتدئ' },
  { value: 'intermediate', label: 'متوسط' },
  { value: 'advanced', label: 'متقدم' },
  { value: 'ielts-prep', label: 'تحضير امتحانات دولية' },
];

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    message: '',
  });
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { selectedCourse?: string } | null;
    if (state?.selectedCourse) {
      setSelectedCourse(state.selectedCourse);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.hash === '#form') {
      const el = document.getElementById('form');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash, location.pathname]);

  const countWords = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;
  const messageWordCount = countWords(formData.message);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message') {
      const words = value.trim() ? value.trim().split(/\s+/) : [];
      const limited = words.length > MAX_MESSAGE_WORDS
        ? words.slice(0, MAX_MESSAGE_WORDS).join(' ')
        : value;
      setFormData((prev) => ({ ...prev, [name]: limited }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (messageWordCount > MAX_MESSAGE_WORDS) {
      setError(`الحد الأقصى للرسالة ${MAX_MESSAGE_WORDS} كلمة`);
      return;
    }
    setIsLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      telegram: formData.telegram.trim(),
      course: selectedCourse,
      level: selectedLevel,
      message: formData.message,
    };

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const contactUrl = apiBase
        ? `${apiBase.replace(/\/$/, '')}/api/contact`
        : '/api/contact';

      const res = await fetch(contactUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || 'حدث خطأ، يرجى المحاولة لاحقاً');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', telegram: '', message: '' });
      setSelectedCourse('');
      setSelectedLevel('');
      setTimeout(() => setSubmitted(false), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ، يرجى المحاولة لاحقاً');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-cream dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-navy to-brand-navy/90"></div>
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-[-10%] w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="mb-0 space-y-4">
              <BlurText
                as="span"
                text="تواصل معنا"
                align="center"
                className="block text-5xl md:text-7xl font-black leading-tight text-white justify-center w-full"
              />
              <BlurText
                as="span"
                text="وخلّنا نبدأ رحلتك اليوم"
                align="center"
                className="block text-3xl md:text-5xl font-black text-brand-coral justify-center w-full"
                delay={100}
              />
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mt-8">
              نحن هنا لمساعدتك في رحلتك التعليمية. تواصل معنا وابدأ تعلم الإنجليزية اليوم!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Mail className="text-brand-coral" size={32} />,
                title: "البريد الإلكتروني",
                content: (
                  <a href="mailto:englishers.co@gmail.com" className="text-slate-600 dark:text-slate-200 leading-relaxed text-sm hover:text-brand-coral transition-colors break-all">
                    englishers.co@gmail.com
                  </a>
                ),
                bgColor: "bg-white dark:bg-slate-900",
                shadowColor: "shadow-brand-coral/10"
              },
              {
                icon: <Phone className="text-brand-navy" size={32} />,
                title: "الهاتف",
                content: (
                  <div className="space-y-3 text-start">
                    <a href="tel:+9647750007476" dir="ltr" className="block text-brand-navy dark:text-white font-bold text-lg tracking-wide hover:text-brand-coral transition-colors">
                      0775 000 7476
                    </a>
                    <a href="tel:+9647850007476" dir="ltr" className="block text-brand-navy dark:text-white font-bold text-lg tracking-wide hover:text-brand-coral transition-colors">
                      0785 000 7476
                    </a>
                  </div>
                ),
                bgColor: "bg-white dark:bg-slate-900",
                shadowColor: "shadow-brand-navy/10"
              },
              {
                icon: <MessageCircle className="text-green-500" size={32} />,
                title: "واتساب",
                content: (
                  <div className="space-y-3 text-start">
                    <a href="https://wa.me/9647750007476" target="_blank" rel="noopener noreferrer" dir="ltr" className="block text-green-600 dark:text-green-400 font-bold text-lg tracking-wide hover:text-green-500 dark:hover:text-green-300 transition-colors">
                      0775 000 7476
                    </a>
                    <a href="https://wa.me/9647850007476" target="_blank" rel="noopener noreferrer" dir="ltr" className="block text-green-600 dark:text-green-400 font-bold text-lg tracking-wide hover:text-green-500 dark:hover:text-green-300 transition-colors">
                      0785 000 7476
                    </a>
                  </div>
                ),
                bgColor: "bg-white dark:bg-slate-900",
                shadowColor: "shadow-green-500/10"
              },
              {
                icon: <MapPin className="text-brand-coral" size={32} />,
                title: "الموقع",
                content: (
                  <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-sm">
                    كربلاء، تقاطع جسر الضريبة، ركن حي النقيب، بناية نادي إنجلشرز
                  </p>
                ),
                bgColor: "bg-white dark:bg-slate-900",
                shadowColor: "shadow-brand-coral/10"
              }
            ].map((item, i) => (
              <div key={i} className={`${item.bgColor} p-8 rounded-3xl shadow-xl ${item.shadowColor} hover:shadow-2xl transition-all duration-300 group border border-slate-100 dark:border-slate-800`}>
                <div className="bg-brand-cream w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-brand-navy dark:text-white mb-3">{item.title}</h3>
                <div>{item.content}</div>
              </div>
            ))}
          </div>

          {/* Business Hours & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Business Hours */}
            <div className="bg-brand-navy p-10 rounded-[3rem] text-white shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="bg-brand-coral p-3 rounded-2xl mr-4">
                  <Clock size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black">ساعات العمل</h3>
              </div>
              <div className="space-y-4">
                {[
                  { days: "الأحد - الخميس", hours: "9:00 م 2:00 - م" },
                  { days: "الجمعة", hours: "مغلق" },
                  { days: "السبت", hours: "9:00 م 2:00 - م" }
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                    <span className="font-bold text-lg">{schedule.days}</span>
                    <span className="text-brand-cream font-medium" dir="ltr">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location — خريطة Google مع تأثير تفاعلي */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center mb-6">
                <div className="bg-brand-coral p-3 rounded-2xl mr-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-brand-navy dark:text-white">موقعنا على الخريطة</h3>
              </div>
              <LocationMap
                location="كربلاء — تقاطع جسر الضريبة، ركن حي النقيب"
                coordinates="32.6031° N, 44.0197° E"
              />
              <p className="mt-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-start">
                بناية نادي إنجلشرز. يمكنك فتح الموقع مباشرة في تطبيق خرائط Google من الزر داخل الإطار.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div id="form" className="bg-white dark:bg-slate-900 p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">
                <span className="text-[#F28C63]">أرسل رسالة</span>
                <span className="text-brand-navy dark:text-white"> ونرد عليك بأسرع وقت</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-200 text-lg">نحن نتطلع للرد عليك في أقرب وقت ممكن</p>
            </div>

            {/* تنبيه قبل ملء النموذج */}
            <div className="mb-10 p-5 md:p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800/50 text-start">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-100 dark:bg-amber-800/40 flex items-center justify-center">
                  <AlertCircle size={22} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-200 text-base md:text-lg mb-2">تنبيه هام قبل الإرسال</h4>
                  <p className="text-amber-800/90 dark:text-amber-200/90 text-sm md:text-base leading-relaxed">
                    يُرسل البريد الإلكتروني الذي تدخله <strong>مرة واحدة فقط</strong>، ولا يمكن إعادة استخدام نفس البريد للإرسال مرة أخرى. لذلك يرجى التأكد من صحة جميع المعلومات (الاسم، البريد، رقم الهاتف، الكورس المطلوب) قبل الضغط على إرسال الرسالة.
                  </p>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-16 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-black text-brand-navy dark:text-white mb-4">
                  تم إرسال رسالتك بنجاح!
                </h3>
                <p className="text-slate-600 dark:text-slate-200 text-lg">
                  شكراً لتواصلك معنا. سنرد عليك خلال 24 ساعة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">الاسم الثلاثي الكامل *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start placeholder:text-slate-400"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">البريد الإلكتروني *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start placeholder:text-slate-400"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">رقم الهاتف *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start placeholder:text-slate-400"
                      placeholder="07xxxxxxxx"
                      dir="ltr"
                    />
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">للتواصل عبر واتساب (أحد أرقام النادي أعلاه)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">معرف التلجرام</label>
                    <input
                      type="text"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start placeholder:text-slate-400"
                      placeholder="@username"
                      dir="ltr"
                      autoComplete="off"
                    />
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">اختياري - للتواصل عبر التلجرام</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">الكورس المطلوب</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => { setSelectedCourse(e.target.value); setError(null); }}
                    className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start"
                  >
                    {COURSE_OPTIONS.map((opt) => (
                      <option key={opt.value || 'default'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">المستوى الحالي</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => { setSelectedLevel(e.target.value); setError(null); }}
                    className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start"
                  >
                    {LEVEL_OPTIONS.map((opt) => (
                      <option key={opt.value || 'default'} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-brand-navy dark:text-white mb-3">رسالتك (حد أقصى {MAX_MESSAGE_WORDS} كلمة)</label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={2000}
                    className="w-full bg-brand-cream dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 focus:border-brand-coral focus:ring-0 transition-all outline-none text-start placeholder:text-slate-400 resize-none"
                    placeholder="أخبرنا عن أهدافك التعليمية أو أي أسئلة لديك..."
                  />
                  <p className={`mt-2 text-sm font-medium ${messageWordCount > MAX_MESSAGE_WORDS ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    {messageWordCount} / {MAX_MESSAGE_WORDS} كلمة
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-gradient-to-r from-brand-coral to-orange-400 text-white font-black text-lg rounded-2xl hover:shadow-xl hover:shadow-brand-coral/30 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <span>إرسال الرسالة</span>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
