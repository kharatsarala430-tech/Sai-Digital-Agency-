import { useEffect } from 'react';
import { Check, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { RealPortfolioProject } from '../data/contentRegistry';
import { MediaFrame } from './MediaFrame';
import { WhatsAppButton } from './WhatsAppButton';

interface PortfolioModalProps {
  project: RealPortfolioProject | null;
  onClose: () => void;
}

export function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = project.title[language];
  const businessType = project.businessType[language];
  const details = project.details[language];
  const deliverables = project.deliverables[language];
  const imageAlt = project.imageAlt[language];
  const categoryLabel = t.portfolioPage.categories[project.category];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#091D42]/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#DCE9FF] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#DCE9FF]">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
            <span className="text-[#0066FF] font-semibold">{categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{businessType}</span>
            {project.completedDate && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.completedDate}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.portfolioPage.modalClose}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-[#F4F8FF] hover:text-[#091D42] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          <MediaFrame
            src={project.imageUrl}
            alt={imageAlt}
            aspectClass="aspect-[4/3]"
            className="rounded-xl border border-[#DCE9FF]"
            fallbackTitle={title}
          />

          <div>
            <p className="text-xs font-semibold text-[#0066FF] mb-1">
              {project.clientName}
            </p>
            <h3
              id="portfolio-modal-title"
              className="font-display text-2xl font-bold text-[#091D42] tracking-tight mb-2.5"
            >
              {title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {details}
            </p>
          </div>

          {deliverables.length > 0 && (
            <div className="rounded-xl bg-[#F4F8FF] border border-[#DCE9FF] p-5">
              <h4 className="font-display text-sm font-bold text-[#091D42] mb-3">
                {t.portfolioPage.modalDeliverablesTitle}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <Check
                      className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#DCE9FF] text-sm font-semibold text-[#091D42] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors min-h-[44px]"
              >
                <span>{t.portfolioPage.visitLiveLink}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            <WhatsAppButton
              label={t.portfolioPage.modalWhatsAppCta}
              message={project.whatsappMessage}
              variant="primary"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
