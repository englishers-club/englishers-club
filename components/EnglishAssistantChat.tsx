import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SiteLogo from './SiteLogo';

const EnglishAssistantChat: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname === '/assistant') return null;

  return (
    <Link
      to="/assistant"
      className="fixed z-40 flex h-14 w-14 touch-manipulation items-center justify-center overflow-hidden rounded-2xl bg-[#1D1D41] p-1 shadow-xl ring-2 ring-[#F28C63]/40 transition-all duration-300 hover:scale-110 hover:shadow-[0_8px_30px_rgba(242,140,99,0.4)] hover:ring-[#F28C63] focus:outline-none focus:ring-2 focus:ring-[#F28C63] focus:ring-offset-2 max-[480px]:h-[52px] max-[480px]:w-[52px] bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-[max(1.5rem,env(safe-area-inset-left,0px))] min-[481px]:bottom-6 min-[481px]:left-6"
      aria-label="فتح المساعد الذكي لتعليم الإنجليزية"
      title="المساعد الذكي - تعلم الإنجليزية"
    >
      <SiteLogo className="h-full w-full rounded-[10px] object-cover" alt="" />
    </Link>
  );
};

export default EnglishAssistantChat;
