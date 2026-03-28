import React, { useState } from 'react';

type ImageWithLoaderProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Optional: custom wrapper className (e.g. for aspect ratio container) */
  wrapperClassName?: string;
};

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  loading,
  onLoad,
  onError,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={`relative block overflow-hidden w-full h-full ${wrapperClassName}`}
      aria-busy={!loaded}
    >
      {!loaded && (
        <>
          <span
            className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-pulse"
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
            <span className="w-10 h-10 rounded-full border-2 border-brand-coral/30 border-t-brand-coral animate-spin" />
          </span>
        </>
      )}
      <img
        {...props}
        src={src}
        alt={alt}
        loading={loading ?? 'lazy'}
        decoding="async"
        className={`block w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </span>
  );
};

export default ImageWithLoader;
