import type { PortfolioCategoryId, RoutePath, ServiceId } from '../config/business';

export type LanguageCode = 'en' | 'hi' | 'mr';

export interface ServiceItemContent {
  id: ServiceId;
  number: string;
  title: string;
  shortDesc: string;
  description: string;
  points: [string, string, string, string];
  ctaLabel: string;
}

export interface ProcessStepContent {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseItemContent {
  title: string;
  description: string;
}

export interface FaqItemContent {
  id: string;
  question: string;
  answer: string;
}

export interface CreativePillarContent {
  number: string;
  title: string;
  description: string;
}

export interface PrivacySectionContent {
  title: string;
  body: string;
}

export interface TranslationContent {
  langName: string;
  langShort: string;
  tagline: string;
  logoTagline: string;
  location: string;
  seo: Record<RoutePath, { title: string; description: string }>;
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    faq: string;
    contact: string;
    getStarted: string;
    languageLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    locationLine: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustCaption: string;
    serveHeading: string;
    targetBusinesses: string[];
    visualLabels: {
      panelTitle: string;
      panelSubtitle: string;
      catalogueTitle: string;
      catalogueSub: string;
      designTitle: string;
      designSub: string;
      webTitle: string;
      webSub: string;
      brandLine: string;
    };
  };
  creativeSolutions: {
    kicker: string;
    title: string;
    description: string;
    ctaButton: string;
    secondaryLink: string;
    pillars: [CreativePillarContent, CreativePillarContent, CreativePillarContent];
  };
  homeSections: {
    servicesKicker: string;
    servicesHeading: string;
    servicesSubheading: string;
    viewAllServices: string;
    faqBannerHeading: string;
    faqBannerText: string;
    faqBannerCta: string;
    finalCtaHeading: string;
    finalCtaText: string;
    finalCtaPrimary: string;
    finalCtaSecondary: string;
  };
  about: {
    pageKicker: string;
    title: string;
    leadParagraph1: string;
    leadParagraph2: string;
    missionTitle: string;
    missionBody: string;
    visionTitle: string;
    visionBody: string;
    approachTitle: string;
    approachBody: string;
    serveTitle: string;
    serveSubtitle: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  servicesPage: {
    pageKicker: string;
    title: string;
    subtitle: string;
    pricingHeading: string;
    pricingText: string;
    pricingCta: string;
    items: ServiceItemContent[];
  };
  portfolioPage: {
    pageKicker: string;
    realWorkTitle: string;
    realWorkSubtitle: string;
    previewButton: string;
    modalDeliverablesTitle: string;
    modalWhatsAppCta: string;
    modalClose: string;
    visitLiveLink: string;
    categories: Record<PortfolioCategoryId, string>;
  };
  howItWorks: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: ProcessStepContent[];
    ctaText: string;
    ctaButton: string;
  };
  whyChooseUs: {
    kicker: string;
    title: string;
    subtitle: string;
    items: WhyChooseItemContent[];
  };
  faqPage: {
    pageKicker: string;
    title: string;
    subtitle: string;
    items: FaqItemContent[];
    stillHaveQuestionsTitle: string;
    stillHaveQuestionsText: string;
    stillHaveQuestionsCta: string;
  };
  contactPage: {
    pageKicker: string;
    title: string;
    subtitle: string;
    directChannelsTitle: string;
    whatsappCardTitle: string;
    whatsappCardDesc: string;
    whatsappAction: string;
    instagramCardTitle: string;
    instagramCardDesc: string;
    instagramAction: string;
    emailCardTitle: string;
    emailCardDesc: string;
    emailAction: string;
    locationCardTitle: string;
    locationCardDesc: string;
    formTitle: string;
    formSubtitle: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      businessName: string;
      businessNamePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      service: string;
      servicePlaceholder: string;
      otherService: string;
      message: string;
      messagePlaceholder: string;
    };
    submitButton: string;
    submittingButton: string;
    privacyPrefix: string;
    privacyLinkText: string;
    whatsappFallbackNote: string;
    whatsappFallbackLink: string;
    errors: {
      fullNameRequired: string;
      businessNameRequired: string;
      phoneRequired: string;
      phoneInvalid: string;
      serviceRequired: string;
      messageRequired: string;
    };
    failure: {
      title: string;
      description: string;
      retryButton: string;
      sendViaWhatsApp: string;
      sendViaEmail: string;
      copySummary: string;
      copiedSummary: string;
    };
    summaryLabels: {
      name: string;
      business: string;
      phone: string;
      service: string;
      message: string;
    };
  };
  contactSuccess: {
    kicker: string;
    title: string;
    description: string;
    whatsAppPrompt: string;
    whatsAppButton: string;
    backHome: string;
    sendAnother: string;
  };
  privacyPolicy: {
    pageKicker: string;
    title: string;
    lastUpdated: string;
    intro: string;
    sections: PrivacySectionContent[];
    contactHeading: string;
    contactText: string;
  };
  floatingWhatsApp: {
    ariaLabel: string;
    tooltip: string;
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    privacyPolicy: string;
    copyright: string;
  };
}
