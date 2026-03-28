
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowLeft, MessageCircle } from 'lucide-react';
import SiteLogo from './SiteLogo';

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-10 border-t-8 border-brand-coral relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-coral opacity-5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-start">
          {/* Brand & Socials */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse justify-start group">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white p-1 shadow-xl ring-2 ring-white/10 group-hover:ring-brand-coral/50 group-hover:scale-[1.02] transition-all duration-300">
                <img src="/image/Logo-copy.png" alt="Englishers Club" className="h-full w-full rounded-[10px]" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white italic group-hover:text-brand-coral transition-colors">
                ENGLISHERS CLUB
              </span>
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-400 font-medium max-w-xs ms-0 me-auto md:me-0">
              أكبر مجتمع لتعلم اللغة الإنجليزية في كربلاء. نغير حياة المتعلمين من خلال تجربة تعليمية ممتعة وحديثة.
            </p>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest opacity-60">تابعنا على منصاتنا</h4>
              <div className="flex space-x-4 space-x-reverse justify-start">
                {[
                  { icon: <Instagram size={24} />, href: "https://www.instagram.com/englishers.club", color: "hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-purple-600" },
                  { icon: <Facebook size={24} />, href: "https://www.facebook.com/share/17ugL1xEmb/", color: "hover:bg-blue-600" },
                  { icon: <TikTokIcon size={24} />, href: "https://www.tiktok.com/@englishers.club", color: "hover:bg-black" },
                  { icon: <Youtube size={24} />, href: "https://www.youtube.com/@englishersclub", color: "hover:bg-red-600" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_-5px_rgba(242,140,99,0.3)] hover:rotate-6 active:scale-95 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black mb-8 text-xl border-b-2 border-brand-coral/30 pb-2 inline-block italic">روابط سريعة</h3>
            <ul className="space-y-4 text-sm font-bold">
              {[
                { to: "/about", label: "من نحن" },
                { to: "/courses", label: "الدورات التعليمية" },
                { to: "/community", label: "مجتمع النادي" },
                { to: "/testimonials", label: "آراء الطلاب" }
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="group flex items-center space-x-2 space-x-reverse hover:text-brand-coral transition-colors">
                    <ArrowLeft size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-coral" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-black mb-8 text-xl border-b-2 border-brand-coral/30 pb-2 inline-block italic">الدعم والمساعدة</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/contact" className="hover:text-brand-coral transition-colors">اتصل بنا</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-coral transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-brand-coral transition-colors">شروط الخدمة</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-white font-black mb-2 text-xl border-b-2 border-brand-coral/30 pb-2 inline-block italic">تواصل معنا</h3>
            <div className="space-y-5">
              <a href="mailto:englishers.co@gmail.com" className="flex items-center space-x-4 space-x-reverse group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors">englishers.co@gmail.com</span>
              </a>
              
              <a href="tel:+9647750007476" className="flex items-center space-x-4 space-x-reverse group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors" dir="ltr">0775 000 7476</span>
              </a>

              <a href="tel:+9647850007476" className="flex items-center space-x-4 space-x-reverse group">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-coral group-hover:bg-brand-coral group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors" dir="ltr">0785 000 7476</span>
              </a>
             
              <div className="flex items-start space-x-4 space-x-reverse group bg-slate-800/30 p-4 rounded-2xl border-r-4 border-brand-coral shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-coral shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-sm">
                  <p className="font-black text-white mb-1">موقعنا في كربلاء</p>
                  <p className="leading-relaxed text-slate-400 font-medium">تقاطع جسر الضريبة ، ركن حي النقيب ، بناية نادي انكلشرز</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs text-slate-500 font-bold">© {new Date().getFullYear()} إنجلشرز. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6 space-x-reverse text-[10px] font-black uppercase tracking-widest text-slate-600">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

