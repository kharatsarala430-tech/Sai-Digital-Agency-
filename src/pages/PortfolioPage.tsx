import { useState } from 'react';
import { Eye } from 'lucide-react';
import {
  type PortfolioCategoryId,
  WHATSAPP_MESSAGES,
} from '../config/business';
import { useLanguage } from '../context/LanguageContext';
import {
  PORTFOLIO_PROJECTS,
  type RealPortfolioProject,
} from '../data/contentRegistry';
import { CreativeSolutionsSection } from '../components/CreativeSolutionsSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { MediaFrame } from '../components/MediaFrame';
import { PortfolioModal } from '../components/PortfolioModal';
import { Reveal } from '../components/Reveal';
import { WhatsAppButton } from '../components/WhatsAppButton';

const CATEGORY_ORDER: PortfolioCategoryId[] = [
  'all',
  'whatsapp-catalogues',
  'promotional-posters',
  'social-media-designs',
  'branding',
  'website-designs',
];

export function PortfolioPage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategoryId>('all');
  const [selectedProject, setSelectedProject] = useState<RealPortfolioProject | null>(null);

  // Until real completed client projects are added in src/data/contentRegistry.ts,
  // present the stylish Creative Solutions section without fake/sample projects.
  if (PORTFOLIO_PROJECTS.length === 0) {
    return (
      <div>
        <section className="sai-hero-backdrop border-b border-[#DCE9FF]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4 sm:pt-20 sm:pb-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
                <p className="text-sm font-semibold text-[#0066FF]">
                  {t.portfolioPage.pageKicker} · {t.location}
                </p>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-4">
                {t.creativeSolutions.title}
              </h1>
            </div>
          </div>
        </section>

        <CreativeSolutionsSection showServicesLink background="white" />
        <HowItWorksSection background="light" />
      </div>
    );
  }

  // Real Client Work Gallery (automatically active once projects are added to contentRegistry.ts)
  const availableCategories = CATEGORY_ORDER.filter(
    (cat) => cat === 'all' || PORTFOLIO_PROJECTS.some((p) => p.category === cat)
  );

  const filteredProjects =
    activeCategory === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((item) => item.category === activeCategory);

  return (
    <div>
      <section className="sai-hero-backdrop border-b border-[#DCE9FF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-7 sai-brand-gradient rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-[#0066FF]">
                {t.portfolioPage.pageKicker} · {t.location}
              </p>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#091D42] tracking-tight leading-[1.12] mb-5">
              {t.portfolioPage.realWorkTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.portfolioPage.realWorkSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F8FF] py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label={t.portfolioPage.pageKicker}
            className="flex flex-wrap items-center gap-2 mb-10"
          >
            {availableCategories.map((categoryId) => {
              const isSelected = activeCategory === categoryId;
              return (
                <button
                  key={categoryId}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(categoryId)}
                  className={`px-4 py-2.5 min-h-[42px] rounded-xl text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#091D42] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-[#DCE9FF] hover:border-[#0066FF] hover:text-[#0066FF]'
                  }`}
                >
                  {t.portfolioPage.categories[categoryId]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delayMs={(idx % 3) * 60}>
                <article className="group h-full rounded-2xl bg-white border border-[#DCE9FF] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0066FF]/45 hover:shadow-lg hover:shadow-[#091D42]/8">
                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`${t.portfolioPage.previewButton}: ${project.title[language]}`}
                      className="block w-full text-left overflow-hidden border-b border-slate-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0066FF]"
                    >
                      <MediaFrame
                        src={project.imageUrl}
                        alt={project.imageAlt[language]}
                        aspectClass="aspect-[4/3]"
                        imgClassName="transition-transform duration-300 group-hover:scale-[1.04]"
                        fallbackTitle={project.title[language]}
                      />
                    </button>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                        <span className="font-semibold text-[#0066FF]">
                          {t.portfolioPage.categories[project.category]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{project.businessType[language]}</span>
                      </div>

                      <h2 className="font-display text-lg font-bold text-[#091D42] mb-2">
                        {project.title[language]}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {project.summary[language]}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:text-[#0044CC] transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      <span>{t.portfolioPage.previewButton}</span>
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-3xl sai-navy-gradient text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
                {t.about.ctaHeading}
              </h2>
              <p className="text-sm sm:text-base text-sky-100/85 leading-relaxed">
                {t.about.ctaText}
              </p>
            </div>
            <WhatsAppButton
              label={t.creativeSolutions.ctaButton}
              message={WHATSAPP_MESSAGES.customProject}
              variant="primary"
              size="lg"
              className="shrink-0"
            />
          </div>
        </div>
      </section>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
