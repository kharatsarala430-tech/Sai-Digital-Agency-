import { useEffect, useRef } from 'react';
import { ArrowUpRight, Globe, Palette, ShoppingBag, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from './BrandLogo';

export function HeroVisualComposition() {
  const { t } = useLanguage();
  const labels = t.hero.visualLabels;
  const panelRef = useRef<HTMLDivElement>(null);
  const svgLayerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;

    const updatePanelParallax = () => {
      rafId = 0;
      const panel = panelRef.current;
      const svg = svgLayerRef.current;
      if (!panel || !svg) return;

      const rect = panel.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;
      const progress = Math.max(-1, Math.min(1, (viewportH * 0.5 - (rect.top + rect.height * 0.5)) / viewportH));
      const yOffset = progress * 18;
      const xOffset = progress * -6;

      svg.style.transform = `translate3d(${xOffset.toFixed(2)}px, ${yOffset.toFixed(2)}px, 0) scale(1.06)`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updatePanelParallax);
      }
    };

    updatePanelParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="relative h-full min-h-[380px] sm:min-h-[440px] flex flex-col justify-between rounded-3xl sai-navy-gradient p-5 sm:p-7 overflow-hidden shadow-xl shadow-[#091D42]/18 border border-[#0D2A5E]"
    >
      {/* Subtle architectural growth arc & grid echoing the official SAI logo */}
      <svg
        ref={svgLayerRef}
        aria-hidden="true"
        viewBox="0 0 560 460"
        fill="none"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-90 will-change-transform"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="saiGlowTop" cx="85%" cy="15%" r="55%">
            <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#0066FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#091D42" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="saiArrowStroke" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.18" />
            <stop offset="65%" stopColor="#00A8FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect width="560" height="460" fill="url(#saiGlowTop)" className="sai-animate-sheen" />
        {/* Subtle 4-square window geometry inspired by the 'A' in the SAI logo */}
        <g opacity="0.12" stroke="#7DD3FC" strokeWidth="1">
          <rect x="430" y="34" width="20" height="20" rx="3" />
          <rect x="456" y="34" width="20" height="20" rx="3" />
          <rect x="430" y="60" width="20" height="20" rx="3" />
          <rect x="456" y="60" width="20" height="20" rx="3" />
        </g>
        {/* Upward growth curve inspired by the sweeping arrow in the SAI logo */}
        <path
          d="M-20 430 C 130 390, 290 290, 495 85"
          stroke="url(#saiArrowStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M475 86 L496 84 L493 105"
          stroke="url(#saiArrowStroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Top Crisp White Brand Card showcasing the official SAI Logo */}
      <div className="relative z-10 flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-md shadow-[#06132B]/20">
        <BrandLogo variant="hero" />
        <div className="hidden sm:block text-right">
          <p className="font-display text-xs font-bold text-[#091D42]">
            {labels.panelTitle}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {labels.panelSubtitle}
          </p>
        </div>
      </div>

      {/* Center Multi-Device Digital Craft Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3.5 my-5">
        {/* Mobile WhatsApp Catalogue Craft Card */}
        <div className="sm:col-span-5 rounded-2xl bg-white/97 p-4 shadow-lg shadow-[#06132B]/25 sai-animate-float">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#EBF3FF] text-[#0066FF]">
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            </span>
            <Smartphone className="w-4 h-4 text-slate-400" aria-hidden="true" />
          </div>
          <p className="font-display text-sm font-bold text-[#091D42] leading-snug">
            {labels.catalogueTitle}
          </p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {labels.catalogueSub}
          </p>
          {/* Clean Abstract Catalogue UI Skeleton */}
          <div className="mt-3.5 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-[#F4F8FF] border border-[#DCE9FF] p-2">
              <div className="h-8 rounded-md bg-gradient-to-br from-[#00A8FF]/25 to-[#0066FF]/15 mb-1.5" />
              <div className="h-1.5 w-10 rounded-full bg-[#091D42]/20" />
            </div>
            <div className="rounded-lg bg-[#F4F8FF] border border-[#DCE9FF] p-2">
              <div className="h-8 rounded-md bg-gradient-to-br from-[#091D42]/15 to-[#0066FF]/20 mb-1.5" />
              <div className="h-1.5 w-9 rounded-full bg-[#091D42]/20" />
            </div>
          </div>
        </div>

        {/* Right Stack: Design System + Responsive Web */}
        <div className="sm:col-span-7 flex flex-col gap-3.5">
          {/* Brand & Graphic Design Card */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 text-white sai-animate-float-delayed">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg sai-brand-gradient text-white shadow-sm">
                  <Palette className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-white leading-tight">
                    {labels.designTitle}
                  </p>
                  <p className="text-xs text-sky-100/80 mt-0.5">
                    {labels.designSub}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#00A8FF] shrink-0" aria-hidden="true" />
            </div>

            {/* Logo-Matched Brand Color Swatch Strip */}
            <div className="mt-3 flex items-center gap-2" aria-hidden="true">
              <span className="h-2.5 flex-1 rounded-full bg-[#00A8FF]" />
              <span className="h-2.5 flex-1 rounded-full bg-[#0066FF]" />
              <span className="h-2.5 flex-1 rounded-full bg-[#0044CC]" />
              <span className="h-2.5 flex-1 rounded-full bg-white/85" />
            </div>
          </div>

          {/* Responsive Web Architecture Card */}
          <div className="rounded-2xl bg-white/97 p-4 shadow-lg shadow-[#06132B]/25">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#091D42] text-[#00A8FF]">
                <Globe className="w-4 h-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-[#091D42] leading-tight">
                  {labels.webTitle}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {labels.webSub}
                </p>
              </div>
            </div>
            {/* Abstract Browser Bar + Wireframe Grid */}
            <div className="rounded-xl bg-[#F4F8FF] border border-[#DCE9FF] p-2.5 space-y-2" aria-hidden="true">
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-16 rounded-full bg-[#091D42]/25" />
                <div className="h-1.5 w-8 rounded-full bg-[#0066FF]/60" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="col-span-2 h-7 rounded-md bg-white border border-[#DCE9FF]" />
                <div className="h-7 rounded-md sai-brand-gradient opacity-85" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Brand Signature Line echoing the logo rule */}
      <div className="relative z-10 flex items-center gap-3 pt-2 text-[11px] sm:text-xs font-medium text-sky-100/85">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00A8FF]/50 to-transparent" aria-hidden="true" />
        <span className="tracking-wide whitespace-nowrap">{labels.brandLine}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00A8FF]/50 to-transparent" aria-hidden="true" />
      </div>
    </div>
  );
}
