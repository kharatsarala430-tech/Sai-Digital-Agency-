import { lazy, Suspense } from 'react';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { HomePage } from './pages/HomePage';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
);
const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
);
const FaqPage = lazy(() =>
  import('./pages/FaqPage').then((m) => ({ default: m.FaqPage })),
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const ContactSuccessPage = lazy(() =>
  import('./pages/ContactSuccessPage').then((m) => ({ default: m.ContactSuccessPage })),
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })),
);

function RouteFallback() {
  return (
    <div className="min-h-[55vh] flex items-center justify-center bg-white">
      <div
        className="w-8 h-8 rounded-full border-2 border-[#DCE9FF] border-t-[#0066FF] animate-spin"
        aria-label="Loading page"
      />
    </div>
  );
}

function AppShell() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    switch (currentPath) {
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/creative-solutions':
        return <PortfolioPage />;
      case '/faq':
        return <FaqPage />;
      case '/contact':
        return <ContactPage />;
      case '/contact/success':
        return <ContactSuccessPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#091D42]">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<RouteFallback />}>{renderPage()}</Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppShell />
      </RouterProvider>
    </LanguageProvider>
  );
}
