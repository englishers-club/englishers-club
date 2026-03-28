import React from 'react';
import { Link } from 'react-router-dom';
import BlurText from '../components/BlurText';
import { Shield, Mail, ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="pb-16 md:pb-20 text-start bg-white dark:bg-brand-navy">
      {/* Header */}
      <header className="bg-brand-navy py-14 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-brand-coral opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-coral/20 text-brand-coral mb-6">
            <Shield size={32} />
          </div>
          <BlurText
            as="h1"
            text="سياسة الخصوصية – EnglishersClub"
            align="center"
            className="text-3xl md:text-5xl font-black text-white justify-center w-full"
          />
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg mt-8">
            نلتزم باحترام خصوصيتك وحماية بياناتك الشخصية.
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
            في EnglishersClub، نلتزم باحترام خصوصيتك وحماية بياناتك الشخصية.
            توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي يتم إدخالها عبر موقعنا الرسمي.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            باستخدامك لهذا الموقع وإرسالك لأي بيانات من خلال نموذج التواصل، فإنك توافق على هذه السياسة.
          </p>
        </section>

        {/* أولاً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            أولاً: المعلومات التي نقوم بجمعها
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نظرًا لعدم وجود نظام حسابات في الموقع، فإننا نجمع فقط المعلومات التي تقوم بإدخالها طوعًا عبر نموذج التواصل، وتشمل:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>الاسم الثلاثي الكامل</li>
            <li>البريد الإلكتروني (مطلوب للتواصل والرد على الاستفسارات)</li>
            <li>رقم الهاتف (للتواصل عبر واتساب)</li>
            <li>معرف التلجرام (اختياري، للتواصل عبر التلجرام)</li>
            <li>الكورس المطلوب والمستوى الحالي</li>
            <li>أي رسالة أو استفسار تقوم بإرساله</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            يُطلب منك تقديم بريدك الإلكتروني عند استخدام نموذج اتصل بنا لأغراض التواصل والرد على طلبات التسجيل والاستفسارات.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            كما قد يتم جمع بعض البيانات التقنية تلقائيًا عند زيارة الموقع، مثل:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>عنوان IP</li>
            <li>نوع المتصفح</li>
            <li>نوع الجهاز</li>
            <li>الصفحات التي تم زيارتها</li>
            <li>وقت وتاريخ الزيارة</li>
          </ul>
        </section>

        {/* ثانياً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            ثانياً: كيفية استخدام المعلومات
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نستخدم المعلومات للأغراض التالية فقط:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>الرد على استفساراتك</li>
            <li>التواصل معك بخصوص الدورات أو الأنشطة</li>
            <li>تزويدك بمعلومات حول خدمات EnglishersClub</li>
            <li>تحسين أداء الموقع وتجربة المستخدم</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            لن يتم استخدام بياناتك لأغراض غير مرتبطة بخدماتنا التعليمية.
          </p>
        </section>

        {/* ثالثاً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            ثالثاً: مشاركة المعلومات
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نحن لا نبيع أو نؤجر أو نتاجر ببياناتك الشخصية.
          </p>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            قد تتم مشاركة المعلومات فقط في الحالات التالية:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>مع مزودي الخدمات التقنية (مثل استضافة الموقع أو أدوات التحليل)</li>
            <li>إذا طُلب منا ذلك بموجب القانون</li>
            <li>لحماية حقوق EnglishersClub أو سلامة المستخدمين</li>
          </ul>
        </section>

        {/* رابعاً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            رابعاً: أمان البيانات
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نتخذ إجراءات مناسبة لحماية بياناتك، تشمل:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>استخدام اتصالات آمنة (HTTPS)</li>
            <li>تقييد الوصول إلى البيانات</li>
            <li>تخزين المعلومات بشكل آمن</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            ومع ذلك، لا يمكن ضمان أمان البيانات بنسبة 100% عبر الإنترنت.
          </p>
        </section>

        {/* خامساً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            خامساً: ملفات تعريف الارتباط (Cookies)
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            قد يستخدم الموقع ملفات تعريف الارتباط من أجل:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>تحسين تجربة التصفح</li>
            <li>تحليل استخدام الموقع</li>
            <li>قياس أداء الصفحات</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح الخاص بك.
          </p>
        </section>

        {/* سادساً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            سادساً: الروابط الخارجية
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            قد يحتوي الموقع على روابط لمنصات خارجية مثل حسابنا على Instagram.
            لا نتحمل مسؤولية سياسات الخصوصية الخاصة بتلك المواقع.
          </p>
        </section>

        {/* سابعاً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            سابعاً: الاحتفاظ بالبيانات
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            نحتفظ بالبيانات المرسلة عبر نموذج التواصل لمدة لا تتجاوز المدة اللازمة للرد على الاستفسار أو تقديم الخدمة المطلوبة، ما لم يفرض القانون مدة أطول.
          </p>
        </section>

        {/* ثامناً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            ثامناً: حقوقك
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            يحق لك:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-200 text-lg pr-4">
            <li>طلب معرفة البيانات التي نحتفظ بها عنك</li>
            <li>طلب تصحيح أي معلومات غير دقيقة</li>
            <li>طلب حذف بياناتك</li>
            <li>سحب موافقتك على استخدام بياناتك</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg pt-2">
            يمكنك ممارسة هذه الحقوق عبر التواصل معنا مباشرة.
          </p>
        </section>

        {/* تاسعاً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            تاسعاً: خصوصية الأطفال
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            لا يستهدف الموقع الأطفال دون سن 13 عاماً بشكل مباشر، ولا نقوم بجمع بيانات شخصية منهم عن قصد.
          </p>
        </section>

        {/* عاشراً */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block">
            عاشراً: التعديلات على السياسة
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg">
            قد نقوم بتحديث سياسة الخصوصية عند الحاجة، وسيتم نشر أي تعديل على هذه الصفحة مع تحديث تاريخ المراجعة.
          </p>
        </section>

        {/* معلومات التواصل */}
        <section className="bg-brand-cream dark:bg-slate-900 rounded-2xl md:rounded-3xl p-8 md:p-10 border-2 border-brand-coral/10">
          <h2 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white border-b-2 border-brand-coral/40 pb-2 inline-block mb-6">
            معلومات التواصل
          </h2>
          <p className="text-slate-600 dark:text-slate-200 leading-relaxed text-lg mb-6">
            إذا كان لديك أي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا عبر:
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
            تخضع هذه السياسة للقوانين المعمول بها في جمهورية العراق.
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

export default Privacy;
