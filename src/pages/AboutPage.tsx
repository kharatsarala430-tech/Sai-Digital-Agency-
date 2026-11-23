import { Compass, Eye, Target } from 'lucide-react';
import { WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { Reveal } from '../components/Reveal';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';

export function AboutPage() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Target,
      title: t.about.missionTitle,
      body: t.about.missionBody,
    },
    {
      icon: Eye,
      title: t.about.visionTitle,
      body: t.about.visionBody,
    },
    {
      icon: Compass,
      title: t.about.approachTitle,
      body: t.about.approachBody,
    },
  ];

  return (
    <div>
      {/* About Hero Intro */}
      <section className="sai-hero-backdrop border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#0066FF]">
                {t.about.pageKicker} · {t.location}
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-6">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              {t.about.leadParagraph1}
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.about.leadParagraph2}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Approach */}
      <section className="bg-[#F4F8FF] border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delayMs={idx * 70}>
                  <article className="h-full rounded-2xl bg-white border border-[#DCE9FF] p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF]/45 hover:shadow-lg hover:shadow-[#091D42]/6">
                    <div className="w-11 h-11 rounded-xl bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-xl font-bold text-[#091D42] mb-3">
                      {pillar.title}
                    </h2>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600">
                      {pillar.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-white border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#091D42] tracking-tight mb-3">
                  {t.about.serveTitle}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  {t.about.serveSubtitle}
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.hero.targetBusinesses.map((biz, idx) => (
                  <div
                    key={biz}
                    className="rounded-xl border border-[#DCE9FF] bg-[#F4F8FF]/70 px-5 py-4 flex items-center gap-3.5 transition-colors hover:bg-white hover:border-[#0066FF]/40"
                  >
                    <span className="font-display text-xs font-bold text-[#0066FF] tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-sm sm:text-base font-semibold text-[#091D42]">
                      {biz}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection background="light" />

      {/* Bottom CTA */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl sai-navy-gradient text-white px-6 py-10 sm:px-10 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-[#091D42]/15">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2.5">
                  {t.about.ctaHeading}
                </h2>
                <p className="text-sm sm:text-base text-sky-100/85 leading-relaxed">
                  {t.about.ctaText}
                </p>
              </div>
              <WhatsAppButton
                label={t.about.ctaButton}
                message={WHATSAPP_MESSAGES.general}
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
