import React, { useEffect, useState } from 'react';
import SiteLogo from './SiteLogo';

const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 480;
    const interval = 16;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(98, (elapsed / duration) * 95);
      setProgress(p);
      if (p >= 95) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/90 dark:bg-brand-navy/95 backdrop-blur-md transition-opacity duration-300"
      role="status"
      aria-live="polite"
      aria-label="جاري تحميل الصفحة"
    >
      {/* Logo mark + spinner */}
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-[3px] border-brand-coral/20 border-t-brand-coral animate-spin"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <SiteLogo className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-white shadow-lg ring-2 ring-brand-coral/25 dark:bg-slate-900" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-56 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-coral to-orange-400 transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide">
          جاري التحميل...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
