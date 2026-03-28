
import React from 'react';
import BlurText from '../components/BlurText';
import ImageWithLoader from '../components/ImageWithLoader';
import { ShieldCheck, Heart, UserPlus, Lightbulb, GraduationCap, Presentation, Users, Trophy } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pb-16 md:pb-20 text-start bg-white dark:bg-brand-navy">
      {/* Header */}
      <header className="bg-brand-navy py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-brand-coral opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 px-4">
          <BlurText
            as="h1"
            text="من هو إنجلشرز؟"
            align="center"
            className="text-3xl md:text-6xl font-black text-white justify-center w-full"
          />
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg mt-8 text-center">
            نحن نؤمن بأن اللغة جسر وليست عائقاً. مهمتنا هي جعل اللغة الإنجليزية سهلة المنال وممتعة وممكنة لكل طموح.
          </p>
        </div>
      </header>

      {/* Goal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative order-2 lg:order-2">
             <div className="absolute inset-0 bg-brand-coral/10 rounded-[2rem] md:rounded-[3rem] -rotate-3 translate-x-3 md:translate-x-4 translate-y-3 md:translate-y-4"></div>
             <ImageWithLoader
              src="/image/pic9.jpg"
              alt="Englishers Club Environment"
              className="relative rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl z-10 border-4 border-white w-full object-cover aspect-video sm:aspect-auto"
            />
          </div>
          <div className="space-y-6 md:space-y-8 order-1 lg:order-1 text-start">
            <div className="inline-block px-4 py-1 bg-brand-coral/10 text-brand-coral rounded-full text-xs md:text-sm font-black mb-2">
              رسالتنا وأهدافنا
            </div>
            <BlurText
              as="h2"
              text="رسالتنا وأهدافنا"
              className="text-3xl md:text-4xl font-black text-brand-navy dark:text-white justify-start"
            />
            <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg md:text-xl mt-6 text-start">
              يهدف نادي انكليشرز إلى جعل تعلّم اللغة الإنجليزية تجربة ممتعة، تفاعلية، وخالية من التوتر، حيث نركّز على التواصل الحقيقي وبناء الثقة بالنفس أكثر من الحفظ والقواعد الجافة. 
            </p>
            <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-base md:text-lg text-start">
              نوفر بيئة تعليمية إيجابية تشجّع على المشاركة، الخطأ، والتعلّم بروح مريحة، من خلال أنشطة حديثة، نقاشات، وألعاب تعليمية. في نادي انكليشرز، لا تتعلّم الإنجليزية فقط، بل تنضم إلى مجتمع حيوي يساعدك على تطوير مهاراتك، توسيع علاقاتك، واستخدام اللغة بثقة في الدراسة، العمل، والسفر.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4">
              {[
                { icon: <Heart className="text-brand-coral" size={20} />, label: "الطالب أولاً" },
                { icon: <UserPlus className="text-brand-navy" size={20} />, label: "مجتمع شامل" },
                { icon: <ShieldCheck className="text-emerald-500" size={20} />, label: "جودة موثوقة" },
                { icon: <Lightbulb className="text-amber-500" size={20} />, label: "أسلوب مبتكر" },
              ].map((val, i) => (
                <div key={i} className="flex items-center space-x-3 space-x-reverse bg-brand-cream dark:bg-slate-900 p-3 md:p-4 rounded-xl md:rounded-2xl border border-brand-coral/10">
                  <div className="shrink-0">{val.icon}</div>
                  <span className="font-bold text-brand-navy dark:text-white text-sm md:text-base">{val.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-brand-navy mt-12 md:mt-18 py-14 md:py-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-coral"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="text-center mb-12 md:mb-20">
            <BlurText
              as="h2"
              text="إنجازاتنا"
              align="center"
              className="text-3xl md:text-5xl font-black text-white justify-center w-full"
            />
            <p className="text-slate-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-2 mt-8">
              نفخر في نادي انكليشرز ان بإنجازاتنا التي تعكس ثقة طلابنا بنا، حيث قمنا ببناء مجتمع تعليمي إيجابي يجمع بين المتعة والانضباط.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <Users size={32} />, count: "1000+", label: "طالب وطالبة", color: "text-brand-coral" },
              { icon: <Presentation size={32} />, count: "4096+", label: "محاضرة تفاعلية", color: "text-white" },
              { icon: <GraduationCap size={32} />, count: "100%", label: "بيئة عصرية", color: "text-brand-coral" },
              { icon: <Trophy size={32} />, count: "1", label: "المساحة المفضلة للتعلّم", color: "text-white" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <div className={`${stat.color} mb-4 md:mb-6 flex justify-center group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black mb-1 md:mb-2">{stat.count}</div>
                <div className="text-slate-400 font-bold text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-20 bg-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border-r-4 md:border-r-8 border-brand-coral">
             <p className="text-lg md:text-2xl leading-relaxed italic opacity-90">
               "لم نكتفِ بالأرقام فقط، بل نجحنا في بناء مجتمع تعليمي إيجابي يعتمد أساليب حديثة تركز على التواصل الحقيقي، تطوير الشخصية، وبناء الثقة بالنفس، مما جعل نادي انكليشرز مساحة مفضلة للتعلّم، تكوين الصداقات، وصناعة تجارب تعليمية مؤثرة ومستمرة."
             </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-brand-cream dark:bg-slate-950 py-14 md:py-18">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
               <BlurText
                 as="h2"
                 text="فلسفة التدريس"
                 align="center"
                 className="text-3xl md:text-5xl font-black text-brand-navy dark:text-white justify-center w-full"
               />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
               {[
                 { title: "التحدث النشط", desc: "نحن نعطي الأولوية للتحدث من اليوم الأول. التواصل الفعال هو هدفنا الأساسي." },
                 { title: "أدوات ديناميكية", desc: "الألعاب والمنصات الحديثة تبقيك مشاركاً ومتحمساً طوال رحلة التعلم." },
                 { title: "بيئة آمنة", desc: "ارتكب الأخطاء بحرية تامة؛ فهذا هو الطريق الوحيد لنمو مهاراتك اللغوية." }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-brand-coral transition-all duration-300">
                    <h3 className="text-xl md:text-2xl font-black text-brand-navy dark:text-white mb-3 md:mb-4">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-200 text-base md:text-lg leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
