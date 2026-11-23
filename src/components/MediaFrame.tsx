import { useState } from 'react';
import { Layers } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  aspectClass?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function MediaFrame({
  src,
  alt,
  aspectClass = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  priority = false,
  fallbackTitle = 'SAI Digital Agency',
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#F4F8FF] ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4F8FF] via-[#EBF3FF] to-white text-[#091D42]"
          role="img"
          aria-label={alt}
        >
          <div className="w-11 h-11 rounded-xl sai-brand-gradient text-white flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" aria-hidden="true" />
          </div>
          <p className="font-display text-sm font-semibold text-[#091D42]">
            {fallbackTitle}
          </p>
        </div>
      )}
    </div>
  );
}
