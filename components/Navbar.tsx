
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import SiteLogo from './SiteLogo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navItems = [
    { path: '/', label: "الرئيسية" },
    { path: '/about', label: "من نحن" },
    { path: '/courses', label: "الدورات" },
    { path: '/testimonials', label: "آراء الطلاب" },
    { path: '/contact', label: "اتصل بنا" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-brand-navy/80 backdrop-blur-xl border-b border-slate-100/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse group shrink-0">
            <SiteLogo className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white shadow-sm ring-1 ring-slate-200/90 dark:bg-slate-900 dark:ring-white/15 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col leading-tight text-right">
              <span className="text-xl font-extrabold tracking-tight text-brand-navy dark:text-white">
                إنجلشرز
              </span>
              <span className="text-xs font-bold text-brand-coral uppercase tracking-[0.22em]">
                CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/70 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800 shadow-sm">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 ${
                      active
                        ? 'bg-brand-navy text-white dark:bg-white dark:text-brand-navy shadow-md'
                        : 'text-slate-700 dark:text-slate-200 hover:text-brand-coral hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="pointer-events-none absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-brand-coral" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'تبديل إلى الوضع الفاتح' : 'تبديل إلى الوضع الليلي'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-brand-navy dark:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full text-sm font-black bg-brand-coral text-white hover:bg-brand-navy transition-all shadow-md active:scale-95"
            >
              انضم الآن
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center space-x-2 space-x-reverse">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'تبديل إلى الوضع الفاتح' : 'تبديل إلى الوضع الليلي'}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 text-brand-navy dark:text-amber-300"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full border border-transparent text-brand-navy dark:text-slate-100 hover:text-brand-coral hover:border-brand-coral/40 transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-brand-navy/95 border-b border-slate-100 dark:border-slate-800 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 text-right">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 rounded-2xl text-lg font-bold ${
                    active
                      ? 'bg-brand-cream text-brand-coral dark:bg-slate-900 dark:text-brand-coral'
                      : 'text-brand-navy dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 bg-brand-coral text-white font-bold rounded-2xl mt-4"
            >
              انضم الآن
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
