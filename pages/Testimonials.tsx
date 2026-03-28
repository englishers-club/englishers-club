
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, Sparkles } from 'lucide-react';
import BlurText from '../components/BlurText';
import VideoWithLoader from '../components/VideoWithLoader';
import { TESTIMONIAL_GALLERY_ENTRIES } from '../data/testimonialsGallery';

/** بطاقة بارتفاع ثابت — النص الطويل يُمرَّر داخل المنطقة دون كسر التنسيق */
const TestimonialCard: React.FC<{
  quote: string;
  author: string;
}> = ({ quote, author }) => {
  const isArabic = /[\u0600-\u06FF]/.test(quote);

  return (
    <article className="group flex h-[420px] sm:h-[440px] flex-col rounded-[1.5rem] md:rounded-[2rem] border-2 border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:border-brand-coral/35 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className={`pointer-events-none mb-3 opacity-[0.12] ${isArabic ? 'text-end' : 'text-start'}`}>
        <Quote className="inline text-brand-navy dark:text-brand-coral" size={36} aria-hidden />
      </div>

      <div className="mb-3 flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={14} fill="currentColor" className="text-brand-coral" aria-hidden />
        ))}
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
        dir="auto"
      >
        <p
          className={`text-[15px] sm:text-base md:text-[17px] leading-[1.75] text-slate-700 dark:text-slate-200 ${
            isArabic ? 'text-right' : 'text-left'
          }`}
        >
          {quote}
        </p>
      </div>

      <div className="mt-4 shrink-0 border-t border-slate-200 pt-4 dark:border-slate-700">
        <p className="text-center font-bold text-brand-coral md:text-lg">— {author}</p>
      </div>
    </article>
  );
};

const Testimonials: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-brand-cream dark:bg-brand-navy py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-coral/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-brand-navy/5 blur-3xl dark:bg-white/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-coral/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-coral">
            <Sparkles size={14} />
            آراء الطلبة
          </div>
          <h1 className="mb-0 space-y-3">
            <BlurText
              as="span"
              text="آراؤكم الحلوة"
              align="center"
              className="block w-full justify-center text-3xl font-black text-brand-navy dark:text-white md:text-5xl lg:text-6xl"
            />
            <BlurText
              as="span"
              text="تعني لنا الكثير"
              align="center"
              className="block w-full justify-center text-2xl font-black text-brand-coral md:text-4xl lg:text-5xl"
              delay={90}
            />
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
            كلماتكم هي اللي تخلينا نستمر ونقدم الأفضل دائماً. شكراً لثقتكم بنادي إنجلشرز.
          </p>
        </header>

        <section aria-labelledby="written-testimonials-heading">
          <h2 id="written-testimonials-heading" className="sr-only">
            آراء مكتوبة من الطلاب
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {TESTIMONIAL_GALLERY_ENTRIES.map((t, i) => (
              <TestimonialCard key={`${t.author}-${i}`} quote={t.quote} author={t.author} />
            ))}
          </div>
        </section>
       
        <div className="mt-20 text-center md:mt-28">
          <div className="inline-flex flex-col items-center gap-4 rounded-[2rem] border-2 border-brand-coral/20 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-slate-900 sm:flex-row sm:gap-6 md:p-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-coral/10">
              <Star size={28} fill="currentColor" className="text-brand-coral" />
            </div>
            <div className="text-center sm:text-start">
              <p className="mb-2 text-lg font-bold text-brand-navy dark:text-white md:text-xl">
                تريد تكون جزء من قصص النجاح؟ انضم واكتب قصتك معنا.
              </p>
              <Link to="/contact" className="font-extrabold text-brand-coral hover:underline">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Testimonials;
