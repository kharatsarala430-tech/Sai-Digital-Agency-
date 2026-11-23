import { useLanguage } from '../context/LanguageContext';
import { Reveal } from './Reveal';

interface WhyChooseUsSectionProps {
  background?: 'white' | 'light';
}

export function WhyChooseUsSection({ background = 'white' }: WhyChooseUsSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="why-choose-us-heading"
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
                {t.whyChooseUs.kicker}
              </p>
            </div>
            <h2
              id="why-choose-us-heading"
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#091D42] tracking-tight mb-3"
            >
              {t.whyChooseUs.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {t.whyChooseUs.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {t.whyChooseUs.items.map((item, idx) => {
            const isLastWide = idx === t.whyChooseUs.items.length - 1;
            return (
              <Reveal
                key={item.title}
                delayMs={(idx % 3) * 50}
                className={isLastWide ? 'md:col-span-2 lg:col-span-3' : ''}
              >
                <div
                  className={`h-full rounded-2xl border p-6 transition-all duration-200 hover:border-[#0066FF]/40 hover:shadow-md hover:shadow-[#091D42]/6 ${
                    isLastWide
                      ? 'sai-navy-gradient text-white border-[#0D2A5E] sm:p-8'
                      : 'bg-white border-[#DCE9FF]'
                  }`}
                >
                  <div className={isLastWide ? 'max-w-3xl' : ''}>
                    <span
                      className={`font-display text-xs font-bold tabular-nums block mb-2.5 ${
                        isLastWide ? 'text-[#00A8FF]' : 'text-[#0066FF]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`font-display text-lg font-bold mb-2 ${
                        isLastWide ? 'text-white sm:text-xl' : 'text-[#091D42]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        isLastWide ? 'text-sky-100/85 sm:text-base' : 'text-slate-600'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
