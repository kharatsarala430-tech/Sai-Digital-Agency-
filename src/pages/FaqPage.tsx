import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from '../components/Reveal';
import { WhatsAppButton } from '../components/WhatsAppButton';

export function FaqPage() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(t.faqPage.items[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Header */}
      <section className="sai-hero-backdrop border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#0066FF]">
                {t.faqPage.pageKicker}
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-5">
              {t.faqPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.faqPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="bg-[#F4F8FF] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3.5">
            {t.faqPage.items.map((item, idx) => {
              const isOpen = openId === item.id;
              const panelId = `panel-${item.id}`;
              const buttonId = `button-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-white border overflow-hidden transition-all duration-150 ${
                    isOpen
                      ? 'border-[#0066FF]/45 shadow-md shadow-[#091D42]/6'
                      : 'border-[#DCE9FF]'
                  }`}
                >
                  <h2>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left px-5 sm:px-7 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F4F8FF]/60 transition-colors min-h-[60px]"
                    >
                      <span className="flex items-baseline gap-3.5">
                        <span className="font-display text-xs font-bold text-[#0066FF] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-base sm:text-lg font-bold text-[#091D42]">
                          {item.question}
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#0066FF]' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h2>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-5 sm:px-7 pb-6 pt-3 pl-12 sm:pl-14 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still Have Questions CTA */}
          <Reveal delayMs={80}>
            <div className="mt-12 rounded-3xl sai-navy-gradient text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-[#091D42]/15">
              <div className="max-w-xl">
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
                  {t.faqPage.stillHaveQuestionsTitle}
                </h2>
                <p className="text-sm sm:text-base text-sky-100/85 leading-relaxed">
                  {t.faqPage.stillHaveQuestionsText}
                </p>
              </div>
              <WhatsAppButton
                label={t.faqPage.stillHaveQuestionsCta}
                message={WHATSAPP_MESSAGES.pricingQuote}
                variant="primary"
                size="lg"
                className="shrink-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
