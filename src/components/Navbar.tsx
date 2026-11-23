import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { type RoutePath, WHATSAPP_MESSAGES } from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import type { LanguageCode } from '../i18n/types';
import { BrandLogo } from './BrandLogo';
import { WhatsAppButton } from './WhatsAppButton';

const LANGUAGE_OPTIONS: { code: LanguageCode; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिंदी', short: 'हिं' },
  { code: 'mr', label: 'मराठी', short: 'मरा' },
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const navItems: { path: RoutePath; label: string }[] = [
    { path: '/', label: t.nav.home },
    { path: '/about', label: t.nav.about },
    { path: '/services', label: t.nav.services },
    { path: '/creative-solutions', label: t.nav.portfolio },
    { path: '/faq', label: t.nav.faq },
    { path: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, path: RoutePath) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    navigate(path);
  };

  const currentLangObj =
    LANGUAGE_OPTIONS.find((item) => item.code === language) ?? LANGUAGE_OPTIONS[0];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/96 backdrop-blur-md border-b transition-shadow duration-200 ${
        scrolled
          ? 'border-[#DCE9FF] shadow-sm shadow-[#091D42]/6'
          : 'border-slate-200/75'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Official SAI Digital Agency Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] rounded-lg"
          aria-label="SAI Digital Agency Home"
        >
          <BrandLogo variant="header" />
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#091D42] font-semibold'
                    : 'text-slate-600 hover:text-[#0066FF]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-[24px] h-[2.5px] sai-brand-gradient rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Language Selector + Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              aria-label={t.nav.languageLabel}
              aria-expanded={langMenuOpen}
              aria-haspopup="listbox"
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-[#DCE9FF] bg-[#F4F8FF]/70 text-xs sm:text-sm font-semibold text-[#091D42] hover:border-[#0066FF]/50 hover:bg-[#F4F8FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#0066FF] shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{currentLangObj.label}</span>
              <span className="sm:hidden">{currentLangObj.short}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langMenuOpen && (
              <div
                role="listbox"
                aria-label={t.nav.languageLabel}
                className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-[#DCE9FF] shadow-lg shadow-[#091D42]/10 py-1.5 z-50"
              >
                {LANGUAGE_OPTIONS.map((opt) => {
                  const selected = opt.code === language;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#F4F8FF] text-[#0066FF] font-semibold'
                          : 'text-[#091D42] hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="text-xs text-slate-400">{opt.short}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Primary CTA (Desktop) */}
          <div className="hidden md:block">
            <WhatsAppButton
              label={t.nav.getStarted}
              message={WHATSAPP_MESSAGES.general}
              variant="primary"
              size="sm"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#DCE9FF] bg-white text-[#091D42] hover:bg-[#F4F8FF] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCE9FF] bg-white shadow-lg shadow-[#091D42]/10">
          <nav
            aria-label="Mobile navigation"
            className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <BrandLogo variant="drawer" />
              <span className="text-xs font-medium text-slate-500">{t.location}</span>
            </div>

            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors min-h-[46px] flex items-center ${
                    isActive
                      ? 'bg-[#F4F8FF] text-[#0066FF] font-semibold'
                      : 'text-[#091D42] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="pt-3.5 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <div className="flex items-center gap-1.5 p-1 bg-[#F4F8FF] border border-[#DCE9FF] rounded-xl">
                {LANGUAGE_OPTIONS.map((opt) => {
                  const active = opt.code === language;
                  return (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => setLanguage(opt.code)}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer min-h-[40px] ${
                        active
                          ? 'bg-white text-[#0066FF] shadow-xs border border-[#DCE9FF]'
                          : 'text-slate-600 hover:text-[#091D42]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <WhatsAppButton
                label={t.hero.primaryCta}
                message={WHATSAPP_MESSAGES.general}
                variant="primary"
                size="lg"
                fullWidth
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
