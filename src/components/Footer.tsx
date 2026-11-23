import React from 'react';
import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react';
import {
  BUSINESS_INFO,
  buildWhatsAppUrl,
  type RoutePath,
  WHATSAPP_MESSAGES,
} from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const quickLinks: { path: RoutePath; label: string }[] = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/creative-solutions', label: t.nav.portfolio },
    { path: '/faq', label: t.nav.faq },
    { path: '/contact', label: t.nav.contact },
    { path: '/privacy-policy', label: t.footer.privacyPolicy },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: RoutePath) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="relative sai-navy-gradient text-slate-300 border-t border-[#0D2A5E]">
      {/* Crisp brand sky-to-blue top accent rule */}
      <div className="h-1 w-full sai-brand-gradient" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column with Original Official Logo */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00A8FF]"
              aria-label="SAI Digital Agency Home"
            >
              <BrandLogo variant="footer" />
            </a>
            <p className="font-display text-sm font-semibold text-white tracking-wide">
              {t.tagline}
            </p>
            <p className="text-sm leading-relaxed text-slate-300/85 max-w-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="text-slate-300/80 hover:text-[#00A8FF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {t.servicesPage.items.map((service) => (
                <li key={service.id}>
                  <a
                    href="/services"
                    onClick={(e) => handleLinkClick(e, '/services')}
                    className="text-slate-300/80 hover:text-[#00A8FF] transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#00A8FF] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#00A8FF] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{BUSINESS_INFO.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#00A8FF] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#00A8FF] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="inline-flex items-center gap-2.5 text-slate-200 hover:text-[#00A8FF] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#00A8FF] shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-slate-300/80">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy"
              onClick={(e) => handleLinkClick(e, '/privacy-policy')}
              className="hover:text-[#00A8FF] transition-colors"
            >
              {t.footer.privacyPolicy}
            </a>
            <span aria-hidden="true">·</span>
            <span>{t.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
