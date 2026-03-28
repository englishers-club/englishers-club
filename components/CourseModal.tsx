
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import SiteLogo from './SiteLogo';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  prices: string[];
}

const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  prices,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden="true"
      />
      <div
        className="relative bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 border-brand-coral/20 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 overflow-y-auto max-h-[90vh]">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="shrink-0 h-11 w-11 rounded-xl overflow-hidden ring-2 ring-brand-coral/20 bg-white dark:bg-slate-800">
                <SiteLogo className="h-full w-full object-cover" alt="" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-brand-navy dark:text-white pt-0.5">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-brand-cream dark:bg-slate-800 text-brand-navy dark:text-slate-200 hover:bg-brand-coral hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>{description}</p>
            {prices.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-brand-navy dark:text-white mb-3">الأسعار:</h4>
                <ul className="space-y-2">
                  {prices.map((price, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-coral shrink-0"></span>
                      {price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
