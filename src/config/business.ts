export type ServiceId =
  | 'whatsapp-catalogue'
  | 'social-media'
  | 'graphic-design'
  | 'business-branding'
  | 'digital-marketing'
  | 'website-development';

export type PortfolioCategoryId =
  | 'all'
  | 'whatsapp-catalogues'
  | 'promotional-posters'
  | 'social-media-designs'
  | 'branding'
  | 'website-designs';

export type RoutePath =
  | '/'
  | '/about'
  | '/services'
  | '/creative-solutions'
  | '/faq'
  | '/contact'
  | '/contact/success'
  | '/privacy-policy';

export const BRAND_ASSETS = {
  /** Official unmodified SAI Digital Agency logo */
  officialLogo: '/sai-logo.png',
} as const;

export const WHATSAPP_NUMBER = '919529873424';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const NETLIFY_FORM_NAME = 'contact-enquiry';

export const BUSINESS_INFO = {
  name: 'SAI Digital Agency',
  taglineEn: 'Your Business, Our Digital Growth.',
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDisplay: '+91 9529873424',
  instagramHandle: '@sai_digital_agency',
  instagramUrl: 'https://instagram.com/sai_digital_agency',
  email: 'contactsaiagencyy@gmail.com',
  locationEn: 'Shrirampur, Maharashtra, India',
} as const;

export const WHATSAPP_MESSAGES = {
  general: 'Hello SAI Digital Agency! I would like to know more about your services.',
  whatsappCatalogue:
    'Hello! I am interested in creating a WhatsApp Business Catalogue for my business.',
  socialMedia: 'Hello! I am interested in social media management services.',
  graphicDesign: 'Hello! I need graphic design services for my business.',
  branding: 'Hello! I am interested in branding services.',
  digitalMarketing: 'Hello! I am interested in digital marketing services for my business.',
  website: 'Hello! I want to create a professional website for my business.',
  customProject: 'Hello SAI Digital Agency! I would like to discuss a custom project.',
  pricingQuote:
    'Hello SAI Digital Agency! I would like to discuss my project requirements and request a quotation.',
} as const;

export const SERVICE_WHATSAPP_MESSAGE_MAP: Record<ServiceId, string> = {
  'whatsapp-catalogue': WHATSAPP_MESSAGES.whatsappCatalogue,
  'social-media': WHATSAPP_MESSAGES.socialMedia,
  'graphic-design': WHATSAPP_MESSAGES.graphicDesign,
  'business-branding': WHATSAPP_MESSAGES.branding,
  'digital-marketing': WHATSAPP_MESSAGES.digitalMarketing,
  'website-development': WHATSAPP_MESSAGES.website,
};

/**
 * Single centralized WhatsApp HTTPS deep-link builder.
 * Opens the native WhatsApp app on Android/iPhone and WhatsApp Web/Desktop on computers.
 */
export function buildWhatsAppUrl(message: string): string {
  const cleanedMessage = message.trim();
  if (!cleanedMessage) {
    return WHATSAPP_BASE_URL;
  }
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(cleanedMessage)}`;
}

export interface ContactEnquiryPayload {
  fullName: string;
  businessName: string;
  phone: string;
  serviceLabel: string;
  message: string;
}

export function formatEnquiryMessage(payload: ContactEnquiryPayload): string {
  const lines = [
    'Hello SAI Digital Agency!',
    '',
    'New Business Enquiry:',
    `Name: ${payload.fullName}`,
    `Business Name: ${payload.businessName}`,
    `Phone: ${payload.phone}`,
    `Service Required: ${payload.serviceLabel}`,
    `Message: ${payload.message}`,
  ];
  return lines.join('\n');
}

export function buildMailtoUrl(payload: ContactEnquiryPayload): string {
  const subject = `Website Enquiry – ${payload.serviceLabel} (${payload.businessName})`;
  const body = formatEnquiryMessage(payload);
  return `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function encodeNetlifyFormData(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}
