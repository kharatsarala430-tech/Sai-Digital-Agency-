import React from 'react';
import {
  Check,
  Globe,
  Megaphone,
  Palette,
  PenTool,
  Share2,
  ShoppingBag,
} from 'lucide-react';
import { SERVICE_WHATSAPP_MESSAGE_MAP, type ServiceId } from '../config/business';
import type { ServiceItemContent } from '../i18n/types';
import { WhatsAppButton } from './WhatsAppButton';

interface ServiceVisualSpec {
  icon: typeof ShoppingBag;
  iconBg: string;
  accentBar: string;
  pattern: React.ReactNode;
}

const SERVICE_VISUALS: Record<ServiceId, ServiceVisualSpec> = {
  'whatsapp-catalogue': {
    icon: ShoppingBag,
    iconBg: 'bg-[#EBF3FF] text-[#0066FF] border-[#DCE9FF]',
    accentBar: 'from-[#00A8FF] to-[#0066FF]',
    pattern: (
      <svg aria-hidden="true" viewBox="0 0 120 120" className="w-24 h-24 text-[#0066FF]">
        <rect x="24" y="16" width="32" height="32" rx="6" fill="currentColor" opacity="0.06" />
        <rect x="64" y="16" width="32" height="32" rx="6" fill="currentColor" opacity="0.1" />
        <rect x="24" y="56" width="32" height="32" rx="6" fill="currentColor" opacity="0.1" />
        <rect x="64" y="56" width="32" height="32" rx="6" fill="currentColor" opacity="0.05" />
      </svg>
    ),
  },
  'social-media': {
    icon: Share2,
    iconBg: 'bg-[#091D42] text-[#00A8FF] border-[#091D42]',
    accentBar: 'from-[#091D42] to-[#0066FF]',
    pattern: (
      <svg aria-hidden="true" viewBox="0 0 120 120" className="w-24 h-24 text-[#00A8FF]">
        <circle cx="88" cy="32" r="44" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.14" />
        <circle cx="88" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.18" />
        <circle cx="88" cy="32" r="12" fill="currentColor" opacity="0.12" />
      </svg>
    ),
  },
  'graphic-design': {
    icon: PenTool,
    iconBg: 'bg-[#EBF6FF] text-[#0055DD] border-[#CFE5FF]',
    accentBar: 'from-[#00A8FF] to-[#0044CC]',
    pattern: (
      <svg aria-hidden="true" viewBox="0 0 120 120" className="w-24 h-24 text-[#0066FF]">
        <path d="M20 96 L96 20" stroke="currentColor" strokeWidth="1.5" opacity="0.14" />
        <path d="M44 104 L104 44" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
        <polygon points="74,16 106,16 106,48" fill="currentColor" opacity="0.08" />
      </svg>
    ),
  },
  'business-branding': {
    icon: Palette,
    iconBg: 'sai-brand-gradient text-white border-transparent',
    accentBar: 'from-[#0066FF] to-[#091D42]',
    pattern: (
      <svg aria-hidden="true" viewBox="0 0 120 120" className="w-24 h-24 text-[#091D42]">
        <rect x="52" y="18" width="22" height="22" rx="3" fill="currentColor" opacity="0.07" />
        <rect x="80" y="18" width="22" height="22" rx="3" fill="currentColor" opacity="0.11" />
        <rect x="52" y="46" width="22" height="22" rx="3" fill="currentColor" opacity="0.11" />
        <rect x="80" y="46" width="22" height="22" rx="3" fill="currentColor" opacity="0.06" />
      </svg>
    ),
  },
  'digital-marketing': {
    icon: Megaphone,
    iconBg: 'bg-[#0D2A5E] text-white border-[#0D2A5E]',
    accentBar: 'from-[#00A8FF] via-[#0066FF] to-[#091D42]',
    pattern: (
      <svg aria-hidden="true" viewBox="0 0 120 120" className="w-24 h-24 text-[#0066FF]">
        <path
          d="M18 92 C 44 82, 72 60, 98 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.18"
        />
        <path
          d="M82 24 L99 21 L96 38"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.22"
        />
      </svg>
    ),
  },
  'website-development': {
    icon: Globe,
    iconBg: 'bg-[#F4F8FF] text-[#091D42] border-[#CFE0FF]',
    accentBar: 'from-[#0044CC] to-[#00A8FF]',
    pattern: (
      <svg aria-hidden="true" viewBox="0 0 120 120" className="w-24 h-24 text-[#0066FF]">
        <rect x="26" y="20" width="76" height="56" rx="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.14" />
        <line x1="26" y1="36" x2="102" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.14" />
        <rect x="36" y="46" width="26" height="20" rx="3" fill="currentColor" opacity="0.08" />
        <rect x="68" y="46" width="24" height="20" rx="3" fill="currentColor" opacity="0.06" />
      </svg>
    ),
  },
};

interface ServiceCardProps {
  service: ServiceItemContent;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  const spec = SERVICE_VISUALS[service.id];
  const Icon = spec.icon;
  const whatsappMessage = SERVICE_WHATSAPP_MESSAGE_MAP[service.id];

  return (
    <article
      className={`group relative overflow-hidden flex flex-col justify-between rounded-2xl border bg-white p-6 sm:p-7 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#0066FF]/45 hover:shadow-xl hover:shadow-[#091D42]/8 ${
        featured ? 'border-[#DCE9FF]' : 'border-slate-200/90'
      }`}
    >
      {/* Subtle top hairline brand accent */}
      <div
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${spec.accentBar} opacity-75 group-hover:opacity-100 transition-opacity`}
        aria-hidden="true"
      />

      {/* Bespoke geometric brand corner motif */}
      <div
        className="pointer-events-none absolute -top-2 -right-2 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {spec.pattern}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${spec.iconBg}`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="font-display text-xs font-bold text-[#0066FF]/70 tabular-nums">
            {service.number}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-[#091D42] tracking-tight mb-2.5">
          {service.title}
        </h3>

        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 mb-5">
          {service.description}
        </p>

        <ul className="space-y-2.5 mb-7 pt-4 border-t border-slate-100">
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
              <Check
                className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10">
        <WhatsAppButton
          label={service.ctaLabel}
          message={whatsappMessage}
          variant="subtle"
          size="md"
          fullWidth
        />
      </div>
    </article>
  );
}
