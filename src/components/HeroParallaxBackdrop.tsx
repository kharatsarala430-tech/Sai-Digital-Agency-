import { useEffect, useRef } from 'react';

/**
 * Lightweight, GPU-composited multi-layer parallax backdrop for the Homepage Hero.
 * Updates DOM transforms directly via requestAnimationFrame (zero React re-renders
 * on scroll) and automatically disables itself when prefers-reduced-motion is active.
 */
export function HeroParallaxBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const farLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const nearArcRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let rafId = 0;

    const updateParallax = () => {
      rafId = 0;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxRange = rect.height + 160;
      const scrolled = Math.max(0, Math.min(-rect.top, maxRange));

      // Subtle, depth-differentiated translate3d offsets (strictly compositor-only)
      if (farLayerRef.current) {
        farLayerRef.current.style.transform = `translate3d(0, ${(scrolled * 0.18).toFixed(2)}px, 0)`;
      }
      if (midLayerRef.current) {
        midLayerRef.current.style.transform = `translate3d(${(scrolled * -0.04).toFixed(2)}px, ${(scrolled * 0.11).toFixed(2)}px, 0)`;
      }
      if (nearArcRef.current) {
        nearArcRef.current.style.transform = `translate3d(${(scrolled * 0.03).toFixed(2)}px, ${(scrolled * -0.07).toFixed(2)}px, 0)`;
      }
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Far Layer: Soft logo-matched sky cyan & royal blue atmospheric glows */}
      <div
        ref={farLayerRef}
        className="absolute -inset-x-10 -top-24 -bottom-24 will-change-transform"
      >
        <div
          className="absolute -top-12 right-[4%] w-[440px] h-[440px] sm:w-[620px] sm:h-[620px] rounded-full opacity-90"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 168, 255, 0.14) 0%, rgba(0, 102, 255, 0.06) 46%, rgba(255, 255, 255, 0) 74%)',
          }}
        />
        <div
          className="absolute bottom-[-80px] left-[-6%] w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full opacity-85"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 102, 255, 0.09) 0%, rgba(9, 29, 66, 0.03) 50%, rgba(255, 255, 255, 0) 75%)',
          }}
        />
      </div>

      {/* Mid Layer: Subtle architectural grid & 4-square motif echoing the SAI logo */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 will-change-transform"
      >
        <svg
          viewBox="0 0 1200 720"
          fill="none"
          className="w-full h-full opacity-[0.42]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="saiHeroGrid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="#0066FF"
                strokeOpacity="0.065"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="saiGridFade" cx="55%" cy="40%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="saiGridMask">
              <rect width="1200" height="720" fill="url(#saiGridFade)" />
            </mask>
          </defs>
          <rect width="1200" height="720" fill="url(#saiHeroGrid)" mask="url(#saiGridMask)" />

          {/* Subtle 4-square brand window accents on far left & upper center */}
          <g fill="#0066FF" fillOpacity="0.075">
            <rect x="48" y="88" width="14" height="14" rx="2.5" />
            <rect x="67" y="88" width="14" height="14" rx="2.5" />
            <rect x="48" y="107" width="14" height="14" rx="2.5" />
            <rect x="67" y="107" width="14" height="14" rx="2.5" />
          </g>
          <g fill="#00A8FF" fillOpacity="0.09">
            <rect x="520" y="54" width="12" height="12" rx="2" />
            <rect x="536" y="54" width="12" height="12" rx="2" />
            <rect x="520" y="70" width="12" height="12" rx="2" />
            <rect x="536" y="70" width="12" height="12" rx="2" />
          </g>
        </svg>
      </div>

      {/* Near Accent Layer: Sweeping subtle upward brand curve */}
      <svg
        ref={nearArcRef}
        viewBox="0 0 1440 760"
        fill="none"
        className="absolute inset-0 w-full h-full will-change-transform opacity-75"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="saiHeroArcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
            <stop offset="45%" stopColor="#0066FF" stopOpacity="0.11" />
            <stop offset="85%" stopColor="#00A8FF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00A8FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -60 640 C 320 580, 740 420, 1280 90"
          stroke="url(#saiHeroArcGrad)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 120 710 C 480 650, 900 490, 1460 150"
          stroke="url(#saiHeroArcGrad)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
