import { BRAND_ASSETS, BUSINESS_INFO } from '../config/business';

interface BrandLogoProps {
  variant?: 'header' | 'drawer' | 'footer' | 'hero';
}

export function BrandLogo({ variant = 'header' }: BrandLogoProps) {
  if (variant === 'footer') {
    return (
      <span className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 shadow-sm">
        <img
          src={BRAND_ASSETS.officialLogo}
          alt={BUSINESS_INFO.name}
          className="h-14 sm:h-16 w-auto object-contain select-none"
          loading="lazy"
          decoding="async"
        />
      </span>
    );
  }

  if (variant === 'hero') {
    return (
      <img
        src={BRAND_ASSETS.officialLogo}
        alt={BUSINESS_INFO.name}
        className="h-14 sm:h-16 w-auto object-contain select-none mix-blend-multiply"
        loading="eager"
        decoding="sync"
      />
    );
  }

  if (variant === 'drawer') {
    return (
      <img
        src={BRAND_ASSETS.officialLogo}
        alt={BUSINESS_INFO.name}
        className="h-12 w-auto object-contain select-none mix-blend-multiply"
        loading="eager"
      />
    );
  }

  return (
    <span className="inline-flex items-center shrink-0">
      <img
        src={BRAND_ASSETS.officialLogo}
        alt={BUSINESS_INFO.name}
        className="h-14 sm:h-16 w-auto object-contain select-none mix-blend-multiply"
        loading="eager"
        decoding="sync"
      />
    </span>
  );
}
