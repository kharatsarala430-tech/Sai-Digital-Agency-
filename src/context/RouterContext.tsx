import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { RoutePath } from '../config/business';
import { useLanguage } from './LanguageContext';

const VALID_ROUTES: RoutePath[] = [
  '/',
  '/about',
  '/services',
  '/creative-solutions',
  '/faq',
  '/contact',
  '/contact/success',
  '/privacy-policy',
];

function normalizePath(pathname: string): RoutePath {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/portfolio') {
    return '/creative-solutions';
  }
  if (VALID_ROUTES.includes(cleaned as RoutePath)) {
    return cleaned as RoutePath;
  }
  return '/';
}

interface RouterContextValue {
  currentPath: RoutePath;
  navigate: (to: RoutePath) => void;
}

const RouterContext = createContext<RouterContextValue | undefined>(undefined);

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname)
  );

  const navigate = useCallback((to: RoutePath) => {
    const next = normalizePath(to);
    if (window.location.pathname !== next) {
      window.history.pushState({}, '', next);
    }
    setCurrentPath(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically sync page title, meta description, robots, Open Graph, and canonical URL
  useEffect(() => {
    const seoEntry = t.seo[currentPath] ?? t.seo['/'];
    document.title = seoEntry.title;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', seoEntry.description);
    updateMeta('meta[property="og:title"]', seoEntry.title);
    updateMeta('meta[property="og:description"]', seoEntry.description);
    updateMeta('meta[name="twitter:title"]', seoEntry.title);
    updateMeta('meta[name="twitter:description"]', seoEntry.description);
    updateMeta(
      'meta[name="robots"]',
      currentPath === '/contact/success' ? 'noindex, nofollow' : 'index, follow'
    );

    const canonicalUrl = `${window.location.origin}${currentPath}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }
    updateMeta('meta[property="og:url"]', canonicalUrl);
  }, [currentPath, t]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
