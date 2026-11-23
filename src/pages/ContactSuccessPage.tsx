import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import {
  buildWhatsAppUrl,
  type ContactEnquiryPayload,
  formatEnquiryMessage,
  WHATSAPP_MESSAGES,
} from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';

export const LAST_ENQUIRY_SESSION_KEY = 'sai_last_submitted_enquiry';

export function ContactSuccessPage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [enquiry, setEnquiry] = useState<ContactEnquiryPayload | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(LAST_ENQUIRY_SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ContactEnquiryPayload;
        if (parsed && parsed.fullName && parsed.phone) {
          setEnquiry(parsed);
        }
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  const whatsAppHref = enquiry
    ? buildWhatsAppUrl(formatEnquiryMessage(enquiry))
    : buildWhatsAppUrl(WHATSAPP_MESSAGES.general);

  return (
    <section className="sai-hero-backdrop py-16 sm:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#DCE9FF] p-7 sm:p-10 shadow-xl shadow-[#091D42]/8">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-emerald-700 mb-2">
            {t.contactSuccess.kicker}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#091D42] tracking-tight mb-3">
            {t.contactSuccess.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7">
            {t.contactSuccess.description}
          </p>

          {enquiry && (
            <dl className="rounded-2xl bg-[#F4F8FF] border border-[#DCE9FF] p-5 space-y-2.5 text-sm mb-7">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold text-slate-500 sm:w-32 shrink-0">
                  {t.contactPage.summaryLabels.name}
                </dt>
                <dd className="text-[#091D42] font-medium">{enquiry.fullName}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold text-slate-500 sm:w-32 shrink-0">
                  {t.contactPage.summaryLabels.business}
                </dt>
                <dd className="text-[#091D42] font-medium">{enquiry.businessName}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold text-slate-500 sm:w-32 shrink-0">
                  {t.contactPage.summaryLabels.phone}
                </dt>
                <dd className="text-[#091D42] font-medium tabular-nums">{enquiry.phone}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold text-slate-500 sm:w-32 shrink-0">
                  {t.contactPage.summaryLabels.service}
                </dt>
                <dd className="text-[#0066FF] font-semibold">{enquiry.serviceLabel}</dd>
              </div>
            </dl>
          )}

          <div className="rounded-2xl bg-[#F4F8FF] border border-[#DCE9FF] p-5 mb-7">
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {t.contactSuccess.whatsAppPrompt}
            </p>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl sai-brand-gradient text-white text-sm font-semibold hover:brightness-110 transition-all shadow-md shadow-[#0066FF]/20"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>{t.contactSuccess.whatsAppButton}</span>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl border border-[#DCE9FF] bg-white text-[#091D42] text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{t.contactSuccess.backHome}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-xl text-sm font-semibold text-slate-600 hover:text-[#091D42] transition-colors cursor-pointer"
            >
              <span>{t.contactSuccess.sendAnother}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
