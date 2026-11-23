import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  buildWhatsAppUrl,
  BUSINESS_INFO,
  WHATSAPP_MESSAGES,
} from '../config/business';
import { useLanguage } from '../context/LanguageContext';

export function PrivacyPolicyPage() {
  const { t } = useLanguage();
  const policy = t.privacyPolicy;

  return (
    <div>
      {/* Header */}
      <section className="sai-hero-backdrop border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#0066FF]">
                {policy.pageKicker}
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-4">
              {policy.title}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mb-5">
              {policy.lastUpdated}
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {policy.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="bg-[#F4F8FF] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {policy.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl bg-white border border-[#DCE9FF] p-6 sm:p-8"
            >
              <h2 className="font-display text-lg sm:text-xl font-bold text-[#091D42] mb-3">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {section.body}
              </p>
            </article>
          ))}

          {/* Privacy Contact Box */}
          <div className="rounded-3xl sai-navy-gradient text-white p-7 sm:p-9 shadow-lg shadow-[#091D42]/12">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl sai-brand-gradient flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="font-display text-xl font-bold mb-1.5">
                    {policy.contactHeading}
                  </h2>
                  <p className="text-sm sm:text-base text-sky-100/85 leading-relaxed">
                    {policy.contactText}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl bg-white text-[#091D42] text-sm font-semibold hover:bg-[#F4F8FF] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#0066FF]" aria-hidden="true" />
                    <span>{BUSINESS_INFO.email}</span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00A8FF]" aria-hidden="true" />
                    <span>{BUSINESS_INFO.whatsappDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
