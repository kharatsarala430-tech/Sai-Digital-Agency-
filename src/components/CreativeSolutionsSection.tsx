import { ArrowRight } from 'lucide-react';
import { WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Reveal } from './Reveal';
import { WhatsAppButton } from './WhatsAppButton';

interface CreativeSolutionsSectionProps {
  showServicesLink?: boolean;
  background?: 'white' | 'ice';
}

export function CreativeSolutionsSection({
  showServicesLink = true,
  background = 'white',
}: CreativeSolutionsSectionProps) {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <section
      aria-labelledby="creative-solutions-heading"
      className={
        background === 'ice'
          ? 'bg-[#F4F8FF] border-y border-[#DCE9FF]'
          : 'bg-white'
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Signature Navy Panel */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-3xl sai-navy-gradient text-white p-7 sm:p-10 flex flex-col justify-between shadow-xl shadow-[#091D42]/15">
              {/* Subtle geometric growth arrow backdrop */}
              <svg
                aria-hidden="true"
                viewBox="0 0 420 420"
                fill="none"
                className="pointer-events-none absolute -right-10 -bottom-10 w-72 h-72 opacity-20"
              >
                <path
                  d="M20 340 C 120 310, 230 220, 340 80"
                  stroke="#00A8FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M306 84 L342 78 L338 114"
                  stroke="#00A8FF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="62" y="250" width="22" height="22" rx="4" stroke="#7DD3FC" strokeWidth="1.5" />
                <rect x="92" y="250" width="22" height="22" rx="4" stroke="#7DD3FC" strokeWidth="1.5" />
                <rect x="62" y="280" width="22" height="22" rx="4" stroke="#7DD3FC" strokeWidth="1.5" />
                <rect x="92" y="280" width="22" height="22" rx="4" stroke="#7DD3FC" strokeWidth="1.5" />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-[2px] w-8 sai-brand-gradient rounded-full" aria-hidden="true" />
                  <p className="text-xs sm:text-sm font-semibold text-[#00A8FF]">
                    {t.creativeSolutions.kicker}
                  </p>
                </div>

                <h2
                  id="creative-solutions-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.14] mb-5"
                >
                  {t.creativeSolutions.title}
                </h2>

                <p className="text-base sm:text-[17px] text-sky-100/90 leading-relaxed max-w-xl mb-8">
                  {t.creativeSolutions.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <WhatsAppButton
                  label={t.creativeSolutions.ctaButton}
                  message={WHATSAPP_MESSAGES.customProject}
                  variant="primary"
                  size="lg"
                />
                {showServicesLink && (
                  <button
                    type="button"
                    onClick={() => navigate('/services')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{t.creativeSolutions.secondaryLink}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Creative Principles Stack */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-4">
              {t.creativeSolutions.pillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="flex-1 rounded-2xl bg-[#F4F8FF]/70 border border-[#DCE9FF] p-6 transition-all duration-200 hover:bg-white hover:border-[#0066FF]/40 hover:shadow-md hover:shadow-[#091D42]/6"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display text-lg font-extrabold text-[#0066FF] tabular-nums shrink-0 mt-0.5">
                      {pillar.number}.
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#091D42] mb-1.5">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
