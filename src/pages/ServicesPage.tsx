import { WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { Reveal } from '../components/Reveal';
import { ServiceCard } from '../components/ServiceCard';
import { WhatsAppButton } from '../components/WhatsAppButton';

export function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* Page Header */}
      <section className="sai-hero-backdrop border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#0066FF]">
                {t.servicesPage.pageKicker} · {t.location}
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-5">
              {t.servicesPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.servicesPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#F4F8FF] border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.servicesPage.items.map((service, idx) => (
              <Reveal key={service.id} delayMs={(idx % 3) * 60}>
                <ServiceCard service={service} featured />
              </Reveal>
            ))}
          </div>

          {/* Transparent Requirement-Based Pricing Card */}
          <Reveal delayMs={100}>
            <div className="mt-12 rounded-2xl bg-white border border-[#DCE9FF] p-6 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
              <div className="max-w-2xl">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#091D42] mb-2.5">
                  {t.servicesPage.pricingHeading}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {t.servicesPage.pricingText}
                </p>
              </div>
              <WhatsAppButton
                label={t.servicesPage.pricingCta}
                message={WHATSAPP_MESSAGES.pricingQuote}
                variant="primary"
                size="lg"
                className="shrink-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection background="white" />
    </div>
  );
}
