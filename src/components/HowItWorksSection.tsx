import { WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';
import { WhatsAppButton } from './WhatsAppButton';

interface HowItWorksSectionProps {
  background?: 'white' | 'light';
}

export function HowItWorksSection({ background = 'light' }: HowItWorksSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className={
        background === 'light'
          ? 'bg-[#F4F8FF] border-y border-[#DCE9FF]'
          : 'bg-white'
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22">
        <Reveal>
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#0066FF]">
                {t.howItWorks.kicker}
              </p>
            </div>
            <h2
              id="how-it-works-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#091D42] tracking-tight mb-3"
            >
              {t.howItWorks.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </Reveal>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {t.howItWorks.steps.map((step, index) => (
            <li key={step.number}>
              <Reveal delayMs={index * 60} className="h-full">
                <div className="h-full rounded-2xl bg-white border border-[#DCE9FF] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF]/45 hover:shadow-lg hover:shadow-[#091D42]/6">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl sai-brand-gradient font-display text-sm font-bold text-white tabular-nums shadow-sm shadow-[#0066FF]/20">
                        {step.number}
                      </span>
                      <span className="h-px flex-1 ml-3 bg-[#DCE9FF]" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#091D42] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delayMs={120}>
          <div className="mt-10 pt-8 border-t border-[#DCE9FF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-display text-base sm:text-lg font-bold text-[#091D42]">
              {t.howItWorks.ctaText}
            </p>
            <WhatsAppButton
              label={t.howItWorks.ctaButton}
              message={WHATSAPP_MESSAGES.general}
              variant="primary"
              size="md"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
