
import React from 'react';
import BlurText from '../components/BlurText';
import ImageWithLoader from '../components/ImageWithLoader';
import { Camera, Coffee, Music, Map } from 'lucide-react';

const Community: React.FC = () => {
  const activities = [
    {
      icon: <Coffee size={24} />,
      title: "قهوة ودردشة",
      desc: "ممارسة غير رسمية للتحدث في أرقى المقاهي المحلية لكسر حاجز الخجل."
    },
    {
      icon: <Music size={24} />,
      title: "ليالي موسيقية",
      desc: "تعلم الإنجليزية من خلال الكلمات والإيقاعات والأغاني العالمية الشهيرة."
    },
    {
      icon: <Map size={24} />,
      title: "رحلات ثقافية",
      desc: "استكشاف المتاحف والمواقع التاريخية معاً وممارسة اللغة في مواقف حقيقية."
    },
    {
      icon: <Camera size={24} />,
      title: "فيديوهات قصيرة",
      desc: "التعاون في صنع محتوى ممتع لمنصات التواصل الاجتماعي باللغة الإنجليزية."
    }
  ];

  return (
    <div className="py-16 md:py-20 bg-slate-50 dark:bg-brand-navy text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 px-4">
          <h1 className="mb-0 space-y-3">
            <BlurText
              as="span"
              text="إنه أسلوب حياة"
              align="center"
              className="block text-3xl md:text-5xl font-black text-brand-navy dark:text-white justify-center w-full"
            />
            <BlurText
              as="span"
              text="مجتمع يتكلم الإنجليزية فعلاً"
              align="center"
              className="block text-2xl md:text-4xl font-black text-brand-coral justify-center w-full"
              delay={90}
            />
          </h1>
          <p className="text-slate-600 dark:text-slate-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mt-8">
            التعلم يحدث في كل مكان وليس فقط داخل القاعات. ينظم نادينا فعاليات تنقل اللغة الإنجليزية خارج الفصل الدراسي إلى الحياة الحقيقية الممتعة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          {activities.map((act, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex items-start gap-4 md:gap-6 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
              <div className="bg-brand-coral p-3 md:p-4 rounded-xl md:rounded-2xl text-white group-hover:rotate-6 transition-transform shrink-0">
                {act.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-brand-navy dark:text-white mb-1 md:mb-2">{act.title}</h3>
                <p className="text-slate-600 dark:text-slate-200 text-sm md:text-base leading-relaxed">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-navy rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
            <div className="text-center lg:text-start">
               <BlurText
                 as="h2"
                 text="انضم إلى فعالياتنا الاجتماعية الشهرية"
                 className="text-2xl md:text-4xl font-black text-white justify-center lg:justify-start w-full"
               />
               <p className="text-slate-300 mb-8 md:mb-10 text-base md:text-lg leading-relaxed mt-6 text-start">
                 كل شهر، نستضيف حدثاً رئيسياً لجميع الأعضاء. إنه الوقت المثالي للقاء أصدقاء جدد، وممارسة مهاراتك اللغوية في جو مليء بالمرح والضحك!
               </p>
               <button className="w-full sm:w-auto px-10 py-4 md:py-5 bg-brand-coral rounded-xl md:rounded-2xl font-black hover:scale-105 transition-all active:scale-95 shadow-xl">
                 تحقق من تقويم الفعاليات
               </button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6 items-start">
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ring-2 ring-white/10 bg-white/5 aspect-[4/3] w-full group">
                <ImageWithLoader
                  wrapperClassName="absolute inset-0"
                  src="/image/pic8.jpg"
                  alt="فعالية جماعية من نادي إنجلشرز"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ring-2 ring-white/10 bg-white/5 aspect-[4/3] w-full mt-6 md:mt-10 group">
                <ImageWithLoader
                  wrapperClassName="absolute inset-0"
                  src="/image/pic7.jpg"
                  alt="فعالية جماعية من نادي إنجلشرز"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-coral/10 blur-[100px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Community;
