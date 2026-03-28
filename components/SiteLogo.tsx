import React from 'react';

/** مسار الشعار الرسمي (ملف في `public/image/`) */
export const SITE_LOGO_SRC = '/image/Logo.png';

export const SITE_LOGO_ALT = 'شعار نادي إنجلشرز — Englishers Club';

type SiteLogoProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  alt?: string;
};

/**
 * الشعار الرسمي للموقع — يُستورد من `public/image/Logo.jpg`.
 */
const SiteLogo: React.FC<SiteLogoProps> = ({ className = '', alt = SITE_LOGO_ALT, loading = 'eager', ...props }) => (
  <img
    src={SITE_LOGO_SRC}
    alt={alt}
    loading={loading}
    decoding="async"
    className={`object-contain object-center select-none ${className}`}
    {...props}
  />
);

export default SiteLogo;
