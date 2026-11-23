import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from '../config/business';

export type WhatsAppButtonVariant = 'primary' | 'navy' | 'outline' | 'subtle' | 'light';

interface WhatsAppButtonProps {
  label: string;
  message?: string;
  variant?: WhatsAppButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const VARIANT_CLASSES: Record<WhatsAppButtonVariant, string> = {
  primary:
    'sai-brand-gradient text-white hover:brightness-110 shadow-md shadow-[#0066FF]/25',
  navy:
    'bg-[#091D42] text-white hover:bg-[#0D2A5E] shadow-sm shadow-[#091D42]/20',
  outline:
    'bg-white text-[#091D42] border border-[#091D42]/20 hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-[#F4F8FF]',
  subtle:
    'bg-[#F4F8FF] text-[#091D42] border border-[#DCE9FF] hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF]',
  light:
    'bg-white text-[#091D42] hover:bg-[#F4F8FF] shadow-md shadow-[#06132B]/20',
};

const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-4 py-2 text-xs font-semibold gap-1.5 min-h-[40px]',
  md: 'px-5 py-2.5 text-sm font-semibold gap-2 min-h-[44px]',
  lg: 'px-6 py-3.5 text-sm sm:text-[15px] font-semibold gap-2.5 min-h-[48px]',
};

export function WhatsAppButton({
  label,
  message = WHATSAPP_MESSAGES.general,
  variant = 'primary',
  size = 'md',
  className = '',
  fullWidth = false,
  icon,
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-xl transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] ${
        VARIANT_CLASSES[variant]
      } ${SIZE_CLASSES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {icon ?? <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{label}</span>
    </a>
  );
}
