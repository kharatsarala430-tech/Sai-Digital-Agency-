import { ArrowRight } from 'lucide-react';
import { WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { CreativeSolutionsSection } from '../components/CreativeSolutionsSection';
import { HeroParallaxBackdrop } from '../components/HeroParallaxBackdrop';
import { HeroVisualComposition } from '../components/HeroVisualComposition';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { Reveal } from '../components/Reveal';
import { ServiceCard } from '../components/ServiceCard';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';

export function HomePage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden sai-hero-backdrop border-b border-[#DCE9FF]">
        <HeroParallaxBackdrop />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-8 sai-brand-gradient rounded-full shrink-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm font-semibold text-[#0066FF]">
                  {t.hero.locationLine}
                </p>
              </div>

              <h1 className="font-display text-[clamp(2.15rem,4.1vw,3.5rem)] font-extrabold text-[#091D42] tracking-tight leading-[1.09] mb-5">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                {t.hero.subheadline}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <WhatsAppButton
                  label={t.hero.primaryCta}
                  message={WHATSAPP_MESSAGES.general}
                  variant="primary"
                  size="lg"
                />
                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl border border-[#091D42]/20 bg-white text-[#091D42] text-sm sm:text-[15px] font-semibold hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-[#F4F8FF] transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>{t.hero.secondaryCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-6 text-xs sm:text-sm text-slate-500">
                {t.hero.trustCaption}
              </p>
            </div>

            {/* Brand-Matched Visual Composition */}
            <div className="lg:col-span-6 flex flex-col">
              <HeroVisualComposition />
            </div>
          </div>

          {/* Target Local Businesses Strip */}
          <div className="mt-12 pt-8 border-t border-[#DCE9FF]">
            <p className="text-xs font-semibold text-[#0066FF] mb-3">
              {t.hero.serveHeading}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-[#091D42]">
              {t.hero.targetBusinesses.map((business, idx) => (
                <span key={business} className="inline-flex items-center gap-3">
                  <span>{business}</span>
                  {idx < t.hero.targetBusinesses.length - 1 && (
                    <span className="text-[#0066FF]/35" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section aria-labelledby="home-services-heading" className="bg-[#F4F8FF] border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
                  <p className="text-sm font-semibold text-[#0066FF]">
                    {t.homeSections.servicesKicker}
                  </p>
                </div>
                <h2
                  id="home-services-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#091D42] tracking-tight mb-3"
                >
                  {t.homeSections.servicesHeading}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {t.homeSections.servicesSubheading}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:text-[#0044CC] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
              >
                <span>{t.homeSections.viewAllServices}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.servicesPage.items.map((service, idx) => (
              <Reveal key={service.id} delayMs={(idx % 3) * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Solutions Section (Honest, Zero Sample Data) */}
      <CreativeSolutionsSection showServicesLink background="white" />

      {/* How It Works Section */}
      <HowItWorksSection background="light" />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection background="white" />

      {/* Quick FAQ Callout */}
      <section className="bg-[#F4F8FF] border-t border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#091D42] mb-2">
              {t.homeSections.faqBannerHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.homeSections.faqBannerText}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/faq')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl border border-[#DCE9FF] bg-white text-sm font-semibold text-[#091D42] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{t.homeSections.faqBannerCta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Final Conversion CTA Section */}
      <section className="bg-white py-16 sm:py-22">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl sai-navy-gradient text-white px-6 py-12 sm:px-12 sm:py-16 shadow-xl shadow-[#091D42]/18">
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#00A8FF]/18 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative z-10 max-w-3xl">
                <p className="text-xs sm:text-sm font-semibold text-[#00A8FF] mb-3">
                  {t.tagline}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                  {t.homeSections.finalCtaHeading}
                </h2>
                <p className="text-base text-sky-100/85 leading-relaxed mb-8 max-w-2xl">
                  {t.homeSections.finalCtaText}
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <WhatsAppButton
                    label={t.homeSections.finalCtaPrimary}
                    message={WHATSAPP_MESSAGES.general}
                    variant="primary"
                    size="lg"
                  />
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl border border-white/25 text-white text-sm sm:text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>{t.homeSections.finalCtaSecondary}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
