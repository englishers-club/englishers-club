import React from 'react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';
import { FileText, ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="pb-16 md:pb-20 text-start bg-white dark:bg-brand-navy">
      {/* Header */}
      <header className="bg-brand-navy py-14 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-brand-coral opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-coral/20 text-brand-coral mb-6">
            <FileText size={32} />
          </div>
          <BlurText
            as="h1"
            text="شروط الاستخدام – EnglishersClub"
            align="center"
            className="text-3xl md:text-5xl font-black text-white justify-center w-full"
          />
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg mt-8">
            من خلال استخدامك للموقع فإنك توافق على الالتزام بهذه الشروط والأحكام.
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12 md:space-y-16">
        {/* مقدمة */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            مقدمة
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            مرحبًا بك في موقع EnglishersClub.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            من خلال الوصول إلى هذا الموقع أو استخدامه، فإنك توافق على الالتزام بهذه الشروط والأحكام.
            إذا كنت لا توافق على أي جزء من هذه الشروط، يُرجى عدم استخدام الموقع.
          </p>
        </section>

        {/* التعريفات */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            التعريفات
          </h2>
          <ul className="space-y-3 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>
              <strong className="text-brand-navy dark:text-white">&quot;الموقع&quot;:</strong> الموقع الرسمي لـ EnglishersClub وجميع صفحاته.
            </li>
            <li>
              <strong className="text-brand-navy dark:text-white">&quot;المستخدم&quot;:</strong> أي شخص يقوم بزيارة الموقع أو استخدامه.
            </li>
            <li>
              <strong className="text-brand-navy dark:text-white">&quot;الخدمات&quot;:</strong> المعلومات والدورات والأنشطة التي يتم عرضها أو الترويج لها عبر الموقع.
            </li>
          </ul>
        </section>

        {/* استخدام الموقع */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            استخدام الموقع
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            يُسمح لك باستخدام الموقع لأغراض:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>الاطلاع على خدمات EnglishersClub</li>
            <li>التواصل معنا</li>
            <li>الاستفسار عن الدورات والأنشطة</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-4">
            ويُحظر عليك:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>استخدام الموقع لأي غرض غير قانوني</li>
            <li>محاولة اختراق الموقع أو تعطيله</li>
            <li>إرسال محتوى ضار أو مزعج عبر نموذج التواصل</li>
            <li>إساءة استخدام أي جزء من الموقع</li>
          </ul>
        </section>

        {/* نموذج التواصل */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            نموذج التواصل
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            عند استخدامك لنموذج التواصل:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>يُطلب منك تقديم بريدك الإلكتروني ورقم هاتفك واسمك الكامل للتواصل والرد على طلباتك؛ ويمكنك إضافة معرف التلجرام (اختياري) للتواصل عبر التلجرام</li>
            <li>يجب تقديم معلومات صحيحة ودقيقة</li>
            <li>تتحمل المسؤولية الكاملة عن البيانات التي ترسلها</li>
            <li>يُمنع إرسال محتوى مسيء أو غير قانوني</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            نحتفظ بالحق في تجاهل أو حذف أي رسائل غير مناسبة. لمعرفة كيفية استخدام بياناتك، راجع سياسة الخصوصية.
          </p>
        </section>

        {/* الخدمات التعليمية */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            الخدمات التعليمية
          </h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>يعرض الموقع معلومات عن دورات وخدمات تعليم اللغة الإنجليزية</li>
            <li>هذه المعلومات تهدف إلى التعريف بالخدمات فقط</li>
            <li>الاشتراك الفعلي في الدورات يتم خارج الموقع (عبر التواصل المباشر)</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            ⚠️ لا نضمن نتائج محددة، حيث تعتمد النتائج على التزام الطالب وممارسته.
          </p>
        </section>

        {/* الملكية الفكرية */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            الملكية الفكرية
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            جميع المحتويات الموجودة في الموقع، بما في ذلك:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>النصوص</li>
            <li>التصميم</li>
            <li>الهوية البصرية</li>
            <li>الصور</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            هي ملك لـ EnglishersClub، ولا يجوز:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>نسخها</li>
            <li>إعادة نشرها</li>
            <li>استخدامها تجاريًا</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            دون إذن مسبق.
          </p>
        </section>

        {/* الروابط الخارجية */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            الروابط الخارجية
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            قد يحتوي الموقع على روابط لمنصات خارجية مثل Instagram.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نحن غير مسؤولين عن محتوى أو سياسات هذه المواقع.
          </p>
        </section>

        {/* إخلاء المسؤولية */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            إخلاء المسؤولية
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            يتم تقديم الموقع &quot;كما هو&quot; دون أي ضمانات، وننفي المسؤولية عن:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>دقة أو اكتمال جميع المعلومات بشكل دائم</li>
            <li>أي انقطاع في الموقع</li>
            <li>أي أخطاء تقنية</li>
          </ul>
        </section>

        {/* حدود المسؤولية */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            حدود المسؤولية
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            لن يكون EnglishersClub مسؤولاً عن أي أضرار مباشرة أو غير مباشرة ناتجة عن:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>استخدام الموقع</li>
            <li>الاعتماد على المعلومات المعروضة</li>
            <li>عدم القدرة على الوصول إلى الموقع</li>
          </ul>
        </section>

        {/* الخصوصية */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            الخصوصية
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نحن نحترم خصوصيتك.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            يرجى مراجعة سياسة الخصوصية الخاصة بنا لمعرفة كيفية جمع واستخدام بياناتك.
          </p>
          <Link
            to="/privacy"
            className="inline-flex items-center gap-2 flex-row-reverse mt-4 px-5 py-2.5 rounded-xl bg-brand-coral/10 text-brand-coral dark:bg-brand-coral/20 font-bold hover:bg-brand-coral hover:text-white dark:hover:bg-brand-coral dark:hover:text-white transition-all"
          >
            <ArrowLeft size={18} />
            سياسة الخصوصية
          </Link>
        </section>

        {/* التعديلات على الشروط */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            التعديلات على الشروط
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. ستُحدّث هذه الصفحة مع تاريخ آخر مراجعة عند كل تعديل.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            استمرارك في استخدام الموقع بعد التحديث يعني موافقتك على الشروط الجديدة.
          </p>
        </section>

        {/* معلومات التواصل */}
        <section className="bg-brand-cream dark:bg-slate-900 rounded-2xl md:rounded-3xl p-8 md:p-10 border-2 border-brand-coral/10">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block mb-6">
            معلومات التواصل
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg mb-6">
            لأي استفسارات تتعلق بهذه الشروط، يمكنك التواصل معنا عبر:
          </p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-200 text-lg">
            <li className="flex items-center gap-3 flex-row-reverse">
              <span className="w-2 h-2 rounded-full bg-brand-coral shrink-0" />
              صفحة &quot;اتصل بنا&quot; في الموقع
            </li>
            <li className="flex items-center gap-3 flex-row-reverse">
              <span className="w-2 h-2 rounded-full bg-brand-coral shrink-0" />
              البريد الإلكتروني الرسمي الخاص بـ EnglishersClub
            </li>
          </ul>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 flex-row-reverse mt-6 px-6 py-3 bg-brand-coral text-white font-bold rounded-xl hover:bg-brand-navy dark:hover:bg-white dark:hover:text-brand-navy transition-all"
          >
            <ArrowLeft size={18} />
            انتقل إلى اتصل بنا
          </Link>
        </section>

        {/* القانون المطبق */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            القانون المطبق
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            تخضع هذه الشروط للقوانين المعمول بها في جمهورية العراق،
            وأي نزاع يخضع لاختصاص المحاكم العراقية.
          </p>
        </section>

        {/* آخر تحديث + حقوق */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-700 text-center space-y-4">
          <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">
            آخر تحديث: 28 / 02 / 2026
          </p>
          <p className="text-slate-600 dark:text-slate-300 font-bold">
            جميع الحقوق محفوظة © EnglishersClub
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
