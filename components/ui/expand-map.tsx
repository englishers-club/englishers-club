import React, { useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from 'motion/react';

/** تضمين خرائط Google بدون مفتاح API — موقع نادي إنجلشرز (محدَّث) */
export const ENGLISHERS_MAP_EMBED =
  'https://www.google.com/maps?q=32.6031334,44.019727&z=17&hl=ar&output=embed';

/** رابط المكان الرسمي على Google Maps */
export const ENGLISHERS_MAP_LINK =
  'https://www.google.com/maps/place/Englishers+Club/@32.6028079,44.0194004,654m/data=!3m1!1e3!4m6!3m5!1s0x1559690a627071b7:0x7596969b7395fe7e!8m2!3d32.6031334!4d44.019727!16s%2Fg%2F11sv4zknq4?hl=ar&entry=ttu';

export interface LocationMapProps {
  location?: string;
  coordinates?: string;
  embedUrl?: string;
  externalMapUrl?: string;
  className?: string;
}

export function LocationMap({
  location = 'كربلاء، العراق',
  coordinates = '32.6031° N, 44.0197° E',
  embedUrl = ENGLISHERS_MAP_EMBED,
  externalMapUrl = ENGLISHERS_MAP_LINK,
  className = '',
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-80, 80], [7, -7]);
  const rotateY = useTransform(mouseX, [-80, 80], [-7, 7]);

  const springRotateX = useSpring(rotateX, { stiffness: 280, damping: 32 });
  const springRotateY = useSpring(rotateY, { stiffness: 280, damping: 32 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div className={`relative w-full ${className}`} dir="rtl">
      <motion.div
        ref={containerRef}
        className="relative mx-auto w-full max-w-lg cursor-pointer select-none"
        style={{ perspective: 1100 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded((v) => !v);
          }
        }}
        aria-expanded={isExpanded}
        aria-label="خريطة الموقع — اضغط للتوسيع أو التصغير"
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            height: isExpanded ? 340 : 200,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 34,
          }}
        >
          {/* خريطة Google حقيقية */}
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800">
            <iframe
              title="موقع إنجلشرز على خرائط Google"
              src={embedUrl}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* تدرج علوي للقراءة + شارة الحالة */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/55 via-transparent to-slate-900/65 dark:from-slate-950/60 dark:to-slate-950/75" />

          <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-between p-4 sm:p-5">
            <div className="pointer-events-auto flex items-start justify-between gap-2">
              <motion.span
                className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-navy shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-white"
                animate={{ scale: isHovered ? 1.03 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="me-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live
              </motion.span>
              <a
                href={externalMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto rounded-xl bg-brand-coral/95 px-3 py-1.5 text-xs font-black text-white shadow-lg transition hover:bg-brand-navy"
                onClick={(e) => e.stopPropagation()}
              >
                فتح في Google Maps
              </a>
            </div>

            <div className="pointer-events-none space-y-1 text-start">
              <motion.h3
                className="text-sm font-black tracking-tight text-white drop-shadow-md sm:text-base"
                animate={{ x: isHovered ? -3 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                {location}
              </motion.h3>
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    className="font-mono text-[11px] text-white/90 drop-shadow-sm"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.25 }}
                    dir="ltr"
                  >
                    {coordinates}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.div
                className="h-px origin-right bg-gradient-to-l from-brand-coral/80 via-brand-coral/40 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: isHovered || isExpanded ? 1 : 0.35,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered && !isExpanded ? 1 : 0.55 }}
      >
        {isExpanded ? 'اضغط لتصغير الخريطة' : 'اضغط لتوسيع العرض وإظهار الإحداثيات'}
      </motion.p>
    </div>
  );
}
