/**
 * SAI Digital Agency — Future Content Management Registry
 *
 * Keep real client work, testimonials, additional services, and business updates
 * cleanly separated from UI components.
 *
 * IMPORTANT:
 * Leave these arrays empty until real, verified client projects or testimonials exist.
 * As soon as you add an entry to PORTFOLIO_PROJECTS, the Work / Portfolio page
 * automatically upgrades to display your real client showcase with category filters
 * and project previews—no component rewrites required.
 */

import type { PortfolioCategoryId } from '../config/business';
import type { LanguageCode } from '../i18n/types';

export type LocalizedText = Record<LanguageCode, string>;

export interface RealPortfolioProject {
  id: string;
  category: Exclude<PortfolioCategoryId, 'all'>;
  title: LocalizedText;
  clientName: string;
  businessType: LocalizedText;
  summary: LocalizedText;
  details: LocalizedText;
  deliverables: Record<LanguageCode, string[]>;
  imageUrl: string;
  imageAlt: LocalizedText;
  completedDate?: string;
  liveUrl?: string;
  whatsappMessage: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  businessName: string;
  location?: string;
  quote: LocalizedText;
}

export interface BusinessUpdate {
  id: string;
  date: string;
  title: LocalizedText;
  summary: LocalizedText;
}

/**
 * Completed real customer projects.
 * Currently empty while building our client showcase—never populate with fake data.
 */
export const PORTFOLIO_PROJECTS: RealPortfolioProject[] = [];

/**
 * Verified client testimonials.
 * Currently empty—only add genuine feedback from real clients.
 */
export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [];

/**
 * Official agency updates or announcements.
 */
export const BUSINESS_UPDATES: BusinessUpdate[] = [];
