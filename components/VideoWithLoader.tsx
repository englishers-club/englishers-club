import React, { useState } from 'react';

type VideoWithLoaderProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  wrapperClassName?: string;
};

/**
 * يعرض طبقة تحميل حتى يصبح الفيديو جاهزاً للعرض (مثل صور ImageWithLoader).
 */
const VideoWithLoader: React.FC<VideoWithLoaderProps> = ({
  className = '',
  wrapperClassName = '',
  onLoadedData,
  onError,
  ...props
}) => {
  const [ready, setReady] = useState(false);

  const finish = () => setReady(true);

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      {!ready && (
        <span
          className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900"
          aria-busy="true"
          aria-label="جاري تحميل الفيديو"
        >
          <span
            className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-brand-navy animate-pulse"
            aria-hidden
          />
          <span className="relative w-12 h-12 rounded-full border-2 border-brand-coral/30 border-t-brand-coral animate-spin" />
        </span>
      )}
      <video
        {...props}
        className={`transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoadedData={(e) => {
          finish();
          onLoadedData?.(e);
        }}
        onError={(e) => {
          finish();
          onError?.(e);
        }}
      />
    </span>
  );
};

export default VideoWithLoader;
