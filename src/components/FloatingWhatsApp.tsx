import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';

export function FloatingWhatsApp() {
  const { t } = useLanguage();
  const href = buildWhatsAppUrl(WHATSAPP_MESSAGES.general);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatingWhatsApp.ariaLabel}
        title={t.floatingWhatsApp.tooltip}
        className="group flex items-center gap-2.5 rounded-full bg-[#15803D] text-white shadow-lg shadow-[#091D42]/25 hover:bg-[#166534] transition-all duration-150 ease-out hover:-translate-y-0.5 active:scale-95 h-12 px-3.5 sm:px-4.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15803D]"
      >
        <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
          WhatsApp
        </span>
      </a>
    </div>
  );
}
