
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Users, MessageCircle, Sparkles, Zap, ChevronDown, Heart } from 'lucide-react';
import './Home.css';
import LightRays from '../components/LightRays';
import ImageWithLoader from '../components/ImageWithLoader';
import VideoWithLoader from '../components/VideoWithLoader';
import BlurText from '../components/BlurText';

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white dark:bg-brand-navy">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-32 md:pb-40 bg-brand-cream dark:bg-brand-navy overflow-hidden">
        {/* Light rays — خلفية WebGL (React Bits / ogl) */}
        <div
          className="absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 opacity-[0.5] dark:opacity-[0.38]">
            <LightRays
              raysOrigin="top-center"
              raysColor="#F28C63"
              raysSpeed={0.85}
              lightSpread={1.15}
              rayLength={2.1}
              fadeDistance={1.15}
              saturation={0.88}
              followMouse
              mouseInfluence={0.12}
              noiseAmount={0.04}
              distortion={0.02}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-cream/80 via-transparent to-brand-cream/95 dark:from-brand-navy/75 dark:via-brand-navy/40 dark:to-brand-navy" />
        </div>

        {/* Animated Background Graphics */}
        <div className="absolute top-20 right-[-5%] w-48 h-48 md:w-64 md:h-64 bg-brand-coral opacity-10 rounded-full blur-3xl animate-pulse pulse-slow"></div>
        <div className="absolute bottom-10 left-[-5%] w-64 h-64 md:w-96 md:h-96 bg-brand-navy opacity-5 rounded-full blur-3xl float-animation"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-start space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-brand-navy text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-xl">
                <Sparkles size={16} className="text-brand-coral md:w-[18px]" />
                <span>التسجيل متاح الآن !</span>
              </div>
              
            <h1 className="leading-[1.3] md:leading-[1.25] tracking-normal text-balance space-y-4">
              <div className="flex flex-wrap justify-start gap-x-2 md:gap-x-3">
                <BlurText
                  as="span"
                  text="تعلم"
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-brand-navy dark:text-white justify-start"
                  delay={90}
                />
                <BlurText
                  as="span"
                  text="الإنجليزية"
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-brand-coral justify-start"
                  delay={110}
                />
              </div>
              <BlurText
                as="span"
                text="تحدث بثقة. وابنِ ثقتك معنا."
                className="block w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy dark:text-white justify-start mt-2"
                delay={70}
              />
            </h1>

              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-200 leading-relaxed max-w-xl w-full text-start me-auto">
                في إنجلشرز نخلق لك بيئة تجمع بين المتعة والتعلم الحقيقي. انضم لأكبر مجتمع تعليمي في كربلاء وابدأ رحلتك اليوم.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-start">
                <Link to="/contact" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-brand-coral text-white font-black rounded-2xl hover:bg-brand-navy transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 space-x-reverse active:scale-95 group">
                  <span>انضم إلينا الآن</span>
                  <ArrowLeft size={20} className="md:w-6 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <a href="#about-preview" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white dark:bg-slate-900 text-brand-navy dark:text-white font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border-2 border-brand-navy dark:border-slate-700 flex items-center justify-center">
                  اكتشف من نحن
                </a>
              </div>

              <div className="flex items-center space-x-4 md:space-x-6 space-x-reverse justify-start pt-4 md:pt-8">
                <div className="flex -space-x-2 md:-space-x-3 space-x-reverse">
                </div>
              </div>
            </div>

            {/* Hero Video / Intro Reel */}
            <div className="relative">
               <div className="absolute inset-0 bg-brand-coral/20 rounded-[3rem] rotate-3 translate-x-4 translate-y-4 hidden lg:block"></div>
               <div className="relative bg-brand-navy rounded-[2.5rem] lg:rounded-[3rem] p-3 sm:p-4 overflow-hidden shadow-2xl max-w-md mx-auto">
                 {/* Reels Frame */}
                 <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white dark:bg-slate-900 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.35)]">
                   <div className="pointer-events-none absolute -inset-24 bg-gradient-to-tr from-brand-coral/15 via-transparent to-brand-navy/10 blur-2xl" />

                   {/* 9:16 area */}
                   <div className="relative p-2 sm:p-3">
                     <div className="relative overflow-hidden rounded-[1.6rem] sm:rounded-[1.8rem] bg-black">
                       <div className="aspect-[9/16] w-full">
                         <VideoWithLoader
                           src="/video/video-to-homepage.mp4"
                           wrapperClassName="h-full w-full min-h-0"
                           className="h-full w-full object-cover"
                           autoPlay
                           muted
                           loop
                           playsInline
                           controls
                           preload="metadata"
                           aria-label="فيديو ريلز تعريفي عن المعهد"
                         />
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Floating badge */}
                 <div className="absolute -bottom-4 left-6 sm:left-10 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl shadow-2xl border-2 border-brand-coral">
                   <p className="text-brand-navy dark:text-white font-black text-sm sm:text-base">أفضل بيئة تعليمية</p>
                   <p className="text-brand-coral font-bold text-xs sm:text-sm">شاهد نبذة سريعة</p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <a href="#about-preview" className="text-brand-navy/30 dark:text-slate-400 hover:text-brand-coral transition-colors">
            <ChevronDown size={32} />
          </a>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about-preview" className="py-20 md:py-32 bg-white dark:bg-brand-navy scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-2 relative">
              <div className="absolute -inset-4 bg-brand-cream dark:bg-slate-900 rounded-[3rem] -rotate-2"></div>
              <ImageWithLoader
                src="/image/pic4.jpg"
                alt="About Englishers Club"
                className="relative rounded-[2.5rem] shadow-xl border-4 border-white w-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-1 text-start space-y-6">
              <BlurText
                as="h2"
                text="أكثر من مجرد نادي"
                className="text-3xl md:text-5xl font-black text-brand-navy dark:text-white justify-start"
              />
              <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed text-start">
                يهدف نادي انكليشرز إلى جعل تعلّم اللغة الإنجليزية تجربة ممتعة، تفاعلية، وخالية من التوتر. نحن نركز على التواصل الحقيقي وبناء الثقة بالنفس أكثر من الحفظ التقليدي.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 rounded-full bg-brand-coral/10 dark:bg-brand-coral/20 flex items-center justify-center text-brand-coral">
                    <Heart size={20} />
                  </div>
                  <span className="font-bold text-brand-navy dark:text-white">بيئة تعليمية إيجابية ومحفزة</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 rounded-full bg-brand-navy/10 dark:bg-white/10 flex items-center justify-center text-brand-navy dark:text-brand-coral">
                    <Users size={20} />
                  </div>
                  <span className="font-bold text-brand-navy dark:text-white">مجتمع حيوي من المتعلمين الطموحين</span>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-block px-8 py-4 bg-brand-navy dark:bg-brand-coral text-white font-bold rounded-2xl hover:bg-brand-coral dark:hover:bg-white dark:hover:text-brand-navy transition-all shadow-lg dark:shadow-brand-coral/20"
              >
                اقرأ قصتنا كاملة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section / Why EnglishersClub */}
      <section id="why-us" className="py-16 md:py-24 bg-brand-cream dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BlurText
              as="h2"
              text="لماذا تختارنا؟"
              align="center"
              className="text-3xl md:text-5xl font-black text-brand-navy dark:text-white justify-center w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 text-start">
            {[
              {
                icon: <Users className="text-brand-navy" size={40} />,
                title: "مجتمع تفاعلي",
                desc: "نحن لسنا مجرد فصل دراسي، نحن عائلة تدعم بعضها البعض في كل خطوة."
              },
              {
                icon: <MessageCircle className="text-brand-coral" size={40} />,
                title: "تركيز على التحدث",
                desc: "مارس اللغة يومياً من خلال مواقف حقيقية وجلسات محادثة مكثفة."
              },
              {
                icon: <Zap className="text-yellow-500" size={40} />,
                title: "نتائج ملموسة",
                desc: "منهجنا الحديث يضمن لك التقدم السريع والطلاقة في أقل وقت ممكن."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-900 hover:bg-brand-navy transition-all duration-500 border-2 border-transparent hover:border-brand-coral shadow-sm">
                <div className="bg-brand-cream dark:bg-slate-800 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-brand-navy dark:text-white group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-300 leading-relaxed text-base md:text-lg transition-colors">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Callout */}
      <section id="featured-courses" className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-coral"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-8">
            <div className="text-start w-full lg:w-auto">
              <BlurText
                as="h2"
                text="جاهز تكتشف مهاراتك؟"
                className="text-3xl sm:text-4xl md:text-6xl font-black text-white justify-start"
              />
              <p className="text-slate-400 text-lg md:text-xl mt-6">دوراتنا مصممة خصيصاً لتناسب احتياجاتك ومستواك الحالي.</p>
            </div>
            <Link to="/courses" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-brand-coral text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl text-center shrink-0">
              تصفح جميع الدورات
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { level: "Beginner", name: "مستوى المبتدئين", color: "bg-white/10" },
              { level: "Intermediate", name: "المستوى المتوسط", color: "bg-brand-coral" },
              { level: "Advanced", name: "المستوى المتقدم", color: "bg-white/10" }
            ].map((c, i) => (
              <div key={i} className={`${c.color} p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-2 border-white/10 hover:border-white transition-all group`}>
                <div className="text-5xl md:text-6xl font-black opacity-10 mb-6 md:mb-8 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                <h4 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">{c.name}</h4>
                <p className="text-base md:text-lg opacity-80 mb-6 md:mb-8">جلسات تفاعلية، ألعاب لغوية، وتركيز كامل على النطق الصحيح.</p>
                <div className="flex items-center space-x-2 space-x-reverse text-sm font-bold">
                  <CheckCircle2 className="text-white" size={18} />
                  <span>شهادة معتمدة عند الإتمام</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Highlights Preview */}
      <section
        id="community-highlights"
        className="pt-16 md:pt-20 pb-6 md:pb-8 bg-white dark:bg-brand-navy scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurText
            as="h2"
            text="لمحات من فعالياتنا"
            align="center"
            className="text-3xl md:text-5xl font-black text-brand-navy dark:text-white justify-center w-full"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <ImageWithLoader src="/image/pic6.jpg" className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition-transform shadow-lg" alt="Community 1" />
            <ImageWithLoader src="/image/pic3.jpg" className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition-transform shadow-lg" alt="Community 2" />
            <ImageWithLoader src="/image/pic2.jpg" className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition-transform shadow-lg" alt="Community 3" />
            <ImageWithLoader src="/image/pic5.jpg" className="rounded-3xl h-64 w-full object-cover hover:scale-105 transition-transform shadow-lg" alt="Community 4" />
          </div>
          <Link to="/community" className="inline-block mt-8 px-10 py-5 bg-brand-navy text-white font-black rounded-2xl hover:bg-brand-coral transition-all shadow-xl">
             استكشف مجتمعنا بالكامل
          </Link>
        </div>
      </section>

      {/* Big Social Callout */}
      <section id="join-the-club" className="pt-12 md:pt-16 pb-20 md:pb-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-coral rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center text-white relative shadow-2xl overflow-hidden">
             <div className="relative z-10 flex flex-col items-center">
                <BlurText
                  as="h2"
                  text="صرنا عائلة، ناقصنا بس أنت!"
                  align="center"
                  className="text-4xl sm:text-5xl md:text-8xl font-black mb-4 md:mb-6 leading-tight text-white max-w-4xl justify-center"
                />
                <p className="text-lg md:text-2xl font-bold text-white/95 mb-8 md:mb-10 max-w-2xl">
                  انضم وكن جزءاً من القصة
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                  <a href="https://instagram.com/englishers.club" target="_blank" rel="noopener noreferrer" className="bg-brand-navy px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:bg-white hover:text-brand-navy transition-all shadow-2xl flex items-center justify-center space-x-3 space-x-reverse">
                    <Instagram size={24} />
                    <span>تابعنا على إنستجرام</span>
                  </a>
                  <Link to="/contact" className="bg-white text-brand-coral px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-lg md:text-xl hover:scale-105 transition-all shadow-2xl">
                    ابدأ رحلتك الان
                  </Link>
                </div>
             </div>
             {/* Large Logo Watermark */}
             <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 opacity-10 rotate-12">
                <div className="w-64 h-64 md:w-96 md:h-96 border-[20px] md:border-[40px] border-white rounded-full"></div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Instagram = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export default Home;
