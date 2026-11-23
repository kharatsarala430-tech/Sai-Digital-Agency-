import React, { useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  Send,
} from 'lucide-react';
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  BUSINESS_INFO,
  type ContactEnquiryPayload,
  encodeNetlifyFormData,
  formatEnquiryMessage,
  NETLIFY_FORM_NAME,
  WHATSAPP_MESSAGES,
} from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { LAST_ENQUIRY_SESSION_KEY } from './ContactSuccessPage';

interface FormValues {
  fullName: string;
  businessName: string;
  phone: string;
  service: string;
  message: string;
  botField: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  fullName: '',
  businessName: '',
  phone: '',
  service: '',
  message: '',
  botField: '',
};

function isValidPhone(rawPhone: string): boolean {
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 10) {
    return /^[6-9]\d{9}$/.test(digits);
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return /^[6-9]\d{9}$/.test(digits.slice(2));
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return /^[6-9]\d{9}$/.test(digits.slice(1));
  }
  return false;
}

/**
 * Verifies whether the POST response actually came from Netlify Forms rather
 * than a local Vite dev server or non-Netlify preview returning an SPA HTML shell.
 */
async function submitToNetlifyForms(payload: ContactEnquiryPayload, botField: string): Promise<boolean> {
  const body = encodeNetlifyFormData({
    'form-name': NETLIFY_FORM_NAME,
    'bot-field': botField,
    fullName: payload.fullName,
    businessName: payload.businessName,
    phone: payload.phone,
    service: payload.serviceLabel,
    message: payload.message,
  });

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    return false;
  }

  // Netlify responses include the x-nf-request-id header or server: Netlify
  const isNetlifyHeader =
    Boolean(response.headers.get('x-nf-request-id')) ||
    (response.headers.get('server') ?? '').toLowerCase().includes('netlify');

  if (isNetlifyHeader) {
    return true;
  }

  // Guard against local Vite dev/preview servers returning index.html for POST /
  const text = await response.text();
  if (text.includes('/src/main.tsx') || text.includes('id="root"')) {
    return false;
  }

  return true;
}

export function ContactPage() {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedPayload, setFailedPayload] = useState<ContactEnquiryPayload | null>(null);
  const [copied, setCopied] = useState(false);

  const serviceOptions = [
    ...t.servicesPage.items.map((item) => ({
      value: item.id,
      label: item.title,
    })),
    {
      value: 'custom-project',
      label: t.contactPage.fields.otherService,
    },
  ];

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (data.fullName.trim().length < 2) {
      nextErrors.fullName = t.contactPage.errors.fullNameRequired;
    }
    if (data.businessName.trim().length < 2) {
      nextErrors.businessName = t.contactPage.errors.businessNameRequired;
    }
    if (!data.phone.trim()) {
      nextErrors.phone = t.contactPage.errors.phoneRequired;
    } else if (!isValidPhone(data.phone)) {
      nextErrors.phone = t.contactPage.errors.phoneInvalid;
    }
    if (!data.service) {
      nextErrors.service = t.contactPage.errors.serviceRequired;
    }
    if (data.message.trim().length < 10) {
      nextErrors.message = t.contactPage.errors.messageRequired;
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (failedPayload) {
      setFailedPayload(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const selectedServiceObj = serviceOptions.find((opt) => opt.value === values.service);
    const payload: ContactEnquiryPayload = {
      fullName: values.fullName.trim(),
      businessName: values.businessName.trim(),
      phone: values.phone.trim(),
      serviceLabel: selectedServiceObj?.label ?? values.service,
      message: values.message.trim(),
    };

    setIsSubmitting(true);
    setFailedPayload(null);
    setCopied(false);

    try {
      const delivered = await submitToNetlifyForms(payload, values.botField);
      if (delivered) {
        try {
          window.sessionStorage.setItem(LAST_ENQUIRY_SESSION_KEY, JSON.stringify(payload));
        } catch {
          // Ignore storage access errors
        }
        setValues(INITIAL_VALUES);
        navigate('/contact/success');
      } else {
        // Never show a fake success message if Netlify Forms did not confirm receipt
        setFailedPayload(payload);
      }
    } catch {
      setFailedPayload(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!failedPayload) return;
    try {
      await navigator.clipboard.writeText(formatEnquiryMessage(failedPayload));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
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
                {t.contactPage.pageKicker} · {t.location}
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-5">
              {t.contactPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.contactPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F4F8FF] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Verified Direct Contact Channels */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display text-lg font-bold text-[#091D42] mb-2">
                {t.contactPage.directChannelsTitle}
              </h2>

              {/* WhatsApp Card */}
              <div className="rounded-2xl bg-white border border-[#DCE9FF] p-5 sm:p-6 transition-all duration-150 hover:border-[#0066FF]/45 hover:shadow-md hover:shadow-[#091D42]/6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl sai-brand-gradient text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-bold text-[#091D42]">
                      {t.contactPage.whatsappCardTitle}
                    </h3>
                    <p className="text-sm font-bold text-[#0066FF] mt-0.5 tabular-nums">
                      {BUSINESS_INFO.whatsappDisplay}
                    </p>
                    <p className="text-sm text-slate-600 mt-1.5 mb-4 leading-relaxed">
                      {t.contactPage.whatsappCardDesc}
                    </p>
                    <a
                      href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl sai-brand-gradient text-white text-xs sm:text-sm font-semibold hover:brightness-110 transition-all shadow-sm shadow-[#0066FF]/20"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{t.contactPage.whatsappAction}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="rounded-2xl bg-white border border-[#DCE9FF] p-5 sm:p-6 transition-all duration-150 hover:border-[#0066FF]/45 hover:shadow-md hover:shadow-[#091D42]/6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#091D42] text-[#00A8FF] flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-bold text-[#091D42]">
                      {t.contactPage.instagramCardTitle}
                    </h3>
                    <p className="text-sm font-semibold text-[#0066FF] mt-0.5">
                      {BUSINESS_INFO.instagramHandle}
                    </p>
                    <p className="text-sm text-slate-600 mt-1.5 mb-4 leading-relaxed">
                      {t.contactPage.instagramCardDesc}
                    </p>
                    <a
                      href={BUSINESS_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-[#DCE9FF] bg-[#F4F8FF]/60 text-[#091D42] text-xs sm:text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
                    >
                      <Instagram className="w-4 h-4" aria-hidden="true" />
                      <span>{t.contactPage.instagramAction}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="rounded-2xl bg-white border border-[#DCE9FF] p-5 sm:p-6 transition-all duration-150 hover:border-[#0066FF]/45 hover:shadow-md hover:shadow-[#091D42]/6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-bold text-[#091D42]">
                      {t.contactPage.emailCardTitle}
                    </h3>
                    <p className="text-sm font-semibold text-slate-700 mt-0.5 break-all">
                      {BUSINESS_INFO.email}
                    </p>
                    <p className="text-sm text-slate-600 mt-1.5 mb-4 leading-relaxed">
                      {t.contactPage.emailCardDesc}
                    </p>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-[#DCE9FF] bg-[#F4F8FF]/60 text-[#091D42] text-xs sm:text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>{t.contactPage.emailAction}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="rounded-2xl bg-white border border-[#DCE9FF] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F4F8FF] border border-[#DCE9FF] text-[#091D42] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#091D42]">
                      {t.contactPage.locationCardTitle}
                    </h3>
                    <p className="text-sm font-semibold text-[#091D42] mt-0.5">
                      {t.location}
                    </p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {t.contactPage.locationCardDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Netlify-Compatible Validated Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white border border-[#DCE9FF] p-6 sm:p-8 lg:p-9 shadow-sm">
                <div className="mb-7">
                  <h2 className="font-display text-2xl font-bold text-[#091D42] tracking-tight mb-2">
                    {t.contactPage.formTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {t.contactPage.formSubtitle}
                  </p>
                </div>

                {/* Honest Failure + Instant WhatsApp/Email Fallback Panel */}
                {failedPayload && (
                  <div
                    role="alert"
                    className="mb-7 rounded-2xl bg-amber-50/90 border border-amber-200 p-5 sm:p-6 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="w-5 h-5 text-amber-700 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-display text-base font-bold text-[#091D42]">
                          {t.contactPage.failure.title}
                        </h3>
                        <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                          {t.contactPage.failure.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href={buildWhatsAppUrl(formatEnquiryMessage(failedPayload))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl sai-brand-gradient text-white text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>{t.contactPage.failure.sendViaWhatsApp}</span>
                      </a>

                      <a
                        href={buildMailtoUrl(failedPayload)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] rounded-xl border border-slate-300 bg-white text-[#091D42] text-sm font-semibold hover:border-[#0066FF] hover:text-[#0066FF] transition-colors"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>{t.contactPage.failure.sendViaEmail}</span>
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#091D42] hover:text-[#0066FF] transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                        ) : (
                          <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span>
                          {copied
                            ? t.contactPage.failure.copiedSummary
                            : t.contactPage.failure.copySummary}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFailedPayload(null)}
                        className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#091D42] transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.contactPage.failure.retryButton}</span>
                      </button>
                    </div>
                  </div>
                )}

                <form
                  name={NETLIFY_FORM_NAME}
                  method="POST"
                  action="/contact/success"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {/* Required Netlify hidden fields */}
                  <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Do not fill this out:{' '}
                      <input
                        name="bot-field"
                        value={values.botField}
                        onChange={(e) => handleFieldChange('botField', e.target.value)}
                      />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-full-name"
                        className="block text-sm font-semibold text-[#091D42] mb-1.5"
                      >
                        {t.contactPage.fields.fullName} <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        disabled={isSubmitting}
                        value={values.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder={t.contactPage.fields.fullNamePlaceholder}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                        className={`w-full rounded-xl border px-3.5 py-3 text-sm text-[#091D42] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 disabled:opacity-60 ${
                          errors.fullName
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#0066FF]'
                        }`}
                      />
                      {errors.fullName && (
                        <p
                          id="error-fullName"
                          role="alert"
                          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label
                        htmlFor="contact-business-name"
                        className="block text-sm font-semibold text-[#091D42] mb-1.5"
                      >
                        {t.contactPage.fields.businessName}{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact-business-name"
                        name="businessName"
                        type="text"
                        required
                        autoComplete="organization"
                        disabled={isSubmitting}
                        value={values.businessName}
                        onChange={(e) => handleFieldChange('businessName', e.target.value)}
                        placeholder={t.contactPage.fields.businessNamePlaceholder}
                        aria-invalid={Boolean(errors.businessName)}
                        aria-describedby={
                          errors.businessName ? 'error-businessName' : undefined
                        }
                        className={`w-full rounded-xl border px-3.5 py-3 text-sm text-[#091D42] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 disabled:opacity-60 ${
                          errors.businessName
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#0066FF]'
                        }`}
                      />
                      {errors.businessName && (
                        <p
                          id="error-businessName"
                          role="alert"
                          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{errors.businessName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-[#091D42] mb-1.5"
                      >
                        {t.contactPage.fields.phone} <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        disabled={isSubmitting}
                        value={values.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder={t.contactPage.fields.phonePlaceholder}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`w-full rounded-xl border px-3.5 py-3 text-sm text-[#091D42] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 disabled:opacity-60 ${
                          errors.phone
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#0066FF]'
                        }`}
                      />
                      {errors.phone && (
                        <p
                          id="error-phone"
                          role="alert"
                          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Service Required */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-sm font-semibold text-[#091D42] mb-1.5"
                      >
                        {t.contactPage.fields.service} <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        required
                        disabled={isSubmitting}
                        value={values.service}
                        onChange={(e) => handleFieldChange('service', e.target.value)}
                        aria-invalid={Boolean(errors.service)}
                        aria-describedby={errors.service ? 'error-service' : undefined}
                        className={`w-full rounded-xl border px-3.5 py-3 text-sm text-[#091D42] bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 disabled:opacity-60 ${
                          errors.service
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-slate-300 focus:border-[#0066FF]'
                        }`}
                      >
                        <option value="">{t.contactPage.fields.servicePlaceholder}</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p
                          id="error-service"
                          role="alert"
                          className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{errors.service}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#091D42] mb-1.5"
                    >
                      {t.contactPage.fields.message} <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      disabled={isSubmitting}
                      value={values.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      placeholder={t.contactPage.fields.messagePlaceholder}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={`w-full rounded-xl border px-3.5 py-3 text-sm text-[#091D42] placeholder:text-slate-400 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 resize-y disabled:opacity-60 ${
                        errors.message
                          ? 'border-red-500 focus:border-red-600'
                          : 'border-slate-300 focus:border-[#0066FF]'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="error-message"
                        role="alert"
                        className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-xl sai-brand-gradient text-white text-sm sm:text-[15px] font-semibold hover:brightness-110 transition-all shadow-md shadow-[#0066FF]/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>{t.contactPage.submittingButton}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          <span>{t.contactPage.submitButton}</span>
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500">
                      {t.contactPage.privacyPrefix}{' '}
                      <a
                        href="/privacy-policy"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/privacy-policy');
                        }}
                        className="text-[#0066FF] font-medium hover:underline"
                      >
                        {t.contactPage.privacyLinkText}
                      </a>
                      .
                    </p>
                  </div>

                  {/* WhatsApp Direct Fallback */}
                  <div className="pt-5 border-t border-slate-100 text-sm text-slate-600 flex flex-wrap items-center gap-1.5">
                    <span>{t.contactPage.whatsappFallbackNote}</span>
                    <a
                      href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#0066FF] hover:underline"
                    >
                      {t.contactPage.whatsappFallbackLink}
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
