
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';
import CourseModal from '../components/CourseModal';
import { Clock, Users, BookOpen, GraduationCap, Info, ChevronLeft } from 'lucide-react';

export interface CourseItem {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
  tag: string;
  description: string;
  prices: string[];
  duration?: string;
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'adult-inperson',
    title: 'كورس اللغة الإنجليزية الحضوري (Adult Course – حضوري)',
    shortTitle: 'كورس الإنجليزية الحضوري',
    icon: '📘',
    color: 'from-blue-600 to-indigo-600',
    tag: 'الأكثر طلباً',
    description: 'كورس شامل لجميع المستويات، مدته 6 أشهر بواقع 3 جلسات أسبوعياً. نعتمد الطريقة التفاعلية بالكامل، بدون حفظ تقليدي للقواعد أو المفردات، وإنما تعلّم من خلال بيئة إنكليزية حقيقية داخل الصف، فعاليات، محادثة مستمرة، وتطبيق عملي.',
    duration: '6 أشهر',
    prices: [
      'كاش: 700,000 دينار',
      'دفعتين: 750,000 دينار',
      'أقساط شهرية: 720,000 دينار (120,000 شهرياً لمدة 6 أشهر)',
    ],
  },
  {
    id: 'adult-online',
    title: 'كورس اللغة الإنجليزية الأونلاين (Adult Online Course)',
    shortTitle: 'كورس الإنجليزية الأونلاين',
    icon: '💻',
    color: 'from-emerald-600 to-teal-600',
    tag: 'مرن',
    description: 'مدته 6 أشهر، 3 محاضرات أسبوعياً، مدة كل محاضرة ساعة ونصف. يتم الاتفاق على الوقت المناسب للطالب، مع متابعة يومية بعد كل محاضرة لضمان التطور المستمر.',
    duration: '6 أشهر',
    prices: [
      'كاش: 500,000 دينار',
      'أقساط: 600,000 دينار',
      'شهر واحد: 80,000 دينار',
      'ثلاثة أشهر: 240,000 دينار',
    ],
  },
  {
    id: 'kids',
    title: 'كورس الأطفال (Kids Course)',
    shortTitle: 'كورس الأطفال',
    icon: '👧',
    color: 'from-amber-500 to-orange-600',
    tag: 'للأطفال',
    description: 'مدته 3 أشهر، 4 محاضرات أسبوعياً. نعتمد منهج Family and Friends بأسلوب ممتع وتفاعلي، بإشراف أساتذة مختصين بالتعامل مع الأطفال، ضمن أجواء تعليمية مشوقة تحبب الطفل باللغة.',
    duration: '3 أشهر',
    prices: ['الكورس الكامل: 300,000 دينار'],
  },
  {
    id: 'ielts',
    title: 'كورس IELTS',
    shortTitle: 'كورس IELTS',
    icon: '🎯',
    color: 'from-violet-600 to-purple-700',
    tag: 'تخصصي',
    description: 'مدة الكورس تعتمد على مستوى الطالب (من شهر إلى 3 أشهر) بعد اختبار تحديد المستوى. 12 محاضرة شهرياً (3 أسبوعياً)، مدة كل محاضرة ساعة ونصف. يشمل متابعة يومية واختبارات تدريبية على التليگرام خاصة بامتحان الآيلتس.',
    duration: '1–3 أشهر',
    prices: [
      'شهر واحد: 300,000 دينار',
      'شهرين: 500,000 دينار',
      '3 أشهر: 650,000 دينار',
    ],
  },
  {
    id: 'private-inperson',
    title: 'كورس البرايفت الحضوري',
    shortTitle: 'البرايفت الحضوري',
    icon: '👤',
    color: 'from-rose-500 to-pink-600',
    tag: 'فردي',
    description: 'محاضرات فردية مخصصة حسب مستوى وهدف الطالب، مدة المحاضرة ساعة واحدة، جدول ثابت. متوفر لطالب واحد، طالبين، أو ثلاثة طلاب. يتوفر أيضاً برايفت مرن بجدول قابل للتغيير بالاتفاق مع الأستاذ.',
    duration: 'حسب الاختيار',
    prices: [
      'طالب واحد: شهر 200,000 | شهرين 360,000 | 3 أشهر 520,000 | كامل 72 محاضرة 960,000',
      'طالبين: شهر 160,000 | شهرين 320,000 | 3 أشهر 480,000',
      'ثلاثة طلاب: شهر 144,000 | شهرين 280,000 | 3 أشهر 400,000',
      'برايفت مرن (طالب واحد): شهر 280,000 | شهرين 520,000 | 3 أشهر 720,000',
    ],
  },
  {
    id: 'private-online',
    title: 'كورس البرايفت الأونلاين',
    shortTitle: 'البرايفت الأونلاين',
    icon: '🌐',
    color: 'from-cyan-500 to-blue-600',
    tag: 'أونلاين',
    description: 'محاضرات خاصة أونلاين بمدة ساعة واحدة، جدول ثابت، تركيز كامل على احتياج الطالب وأهدافه. متوفر لطالب واحد أو طالبين.',
    duration: 'حسب الاختيار',
    prices: [
      'طالب واحد: شهر 160,000 | شهرين 280,000 | 3 أشهر 400,000',
      'طالبين: شهر 144,000 | شهرين 264,000 | 3 أشهر 360,000',
    ],
  },
];

const Courses: React.FC = () => {
  const [modalCourse, setModalCourse] = useState<CourseItem | null>(null);

  const openModal = (course: CourseItem) => setModalCourse(course);
  const closeModal = () => setModalCourse(null);

  return (
    <div className="py-16 md:py-24 bg-white dark:bg-brand-navy text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20 px-4">
          <h1 className="mb-0 space-y-3">
            <BlurText
              as="span"
              text="اختر كورسك التعليمي"
              align="center"
              className="block text-3xl md:text-5xl font-black text-brand-navy dark:text-white justify-center w-full"
            />
            <BlurText
              as="span"
              text="وابنِ مستقبلك بثقة"
              align="center"
              className="block text-2xl md:text-4xl font-black text-brand-coral justify-center w-full"
              delay={90}
            />
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mt-8">
            نقدم دورات لجميع المستويات. سواء كنت تبدأ من الصفر أو تتطلع إلى إتقان طلاقتك والوصول لمستوى الاحتراف، لدينا مكان مخصص لك.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {COURSES_DATA.map((course, idx) => (
            <article
              key={course.id}
              className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-brand-coral/30 transition-all duration-300 group flex flex-col h-full"
            >
              <div
                className={`h-2 md:h-3 bg-gradient-to-l ${course.color} opacity-90`}
              />
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-2xl md:text-3xl">{course.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-coral bg-brand-coral/10 px-3 py-1.5 rounded-full">
                    {course.tag}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-extrabold text-brand-navy dark:text-white mb-3 leading-tight">
                  {course.shortTitle}
                </h3>

                {course.duration && (
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-4">
                    المدة: {course.duration}
                  </p>
                )}

                <div className="mb-6 flex-1">
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => openModal(course)}
                    className="w-full py-3 flex items-center justify-center gap-2 rounded-xl md:rounded-2xl border-2 border-brand-coral/40 text-brand-coral font-bold hover:bg-brand-coral/10 transition-colors"
                  >
                    <Info size={18} />
                    عرض التفاصيل والأسعار
                  </button>

                  <Link
                    to="/contact#form"
                    state={{ selectedCourse: course.id, courseTitle: course.shortTitle }}
                    className="block w-full py-4 bg-brand-navy text-white font-bold rounded-xl md:rounded-2xl hover:bg-brand-coral transition-colors active:scale-[0.98] shadow-lg text-center flex items-center justify-center gap-2 group/link"
                  >
                    <span>اختر الخطة</span>
                    <ChevronLeft size={20} className="group-hover/link:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Benefits Section */}
        <section className="mt-20 md:mt-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: <Clock size={28} />, label: 'ساعات مرنة' },
              { icon: <Users size={28} />, label: 'مجموعات صغيرة' },
              { icon: <BookOpen size={28} />, label: 'محتوى مختار بعناية' },
              { icon: <GraduationCap size={28} />, label: 'شهادات معتمدة' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-5 md:p-8 bg-brand-cream dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-brand-coral/5 hover:border-brand-coral/20 transition-all group"
              >
                <div className="text-brand-coral mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold text-brand-navy dark:text-white text-sm md:text-base">
                  {item.label}
                </h4>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Description Modal */}
      {modalCourse && (
        <CourseModal
          isOpen={!!modalCourse}
          onClose={closeModal}
          title={modalCourse.title}
          description={modalCourse.description}
          prices={modalCourse.prices}
        />
      )}
    </div>
  );
};

export default Courses;
