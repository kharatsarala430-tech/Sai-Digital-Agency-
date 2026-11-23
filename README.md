# SAI Digital Agency — Official Business Website

**Tagline:** Your Business, Our Digital Growth.  
**Logo Signature:** Your Vision | Our Digital Solution  
**Location:** Shrirampur, Maharashtra, India  
**WhatsApp:** [+91 9529873424](https://wa.me/919529873424)  
**Instagram:** [@sai_digital_agency](https://instagram.com/sai_digital_agency)  
**Email:** contactsaiagencyy@gmail.com

---

## Brand & Visual Identity

The website's visual identity is built directly around the official **SAI Digital Agency** logo (`/public/sai-logo.png`):

- **Deep Midnight Navy:** `#091D42` / `#06132B`
- **Electric Royal Blue:** `#0066FF`
- **Vibrant Sky Cyan:** `#00A8FF`
- **Deep Cobalt:** `#0044CC`
- **Soft Ice Canvas:** `#F4F8FF` / `#DCE9FF`

The original, unmodified brand logo is used across the sticky navigation bar, mobile drawer, hero showcase, footer, and website favicon.

---

## Pages & Features

- **Complete Business Pages**:
  1. Home (`/`) — Hero with subtle GPU-composited parallax backdrop, target business highlights, services overview, Creative Solutions, How It Works, Why Choose Us, FAQ preview, and final WhatsApp CTA
  2. About Us (`/about`)
  3. Services (`/services`) — WhatsApp Business Catalogue, Social Media Management, Graphic Design, Business Branding, Digital Marketing, and Website Development (no public pricing)
  4. Creative Solutions (`/creative-solutions`, alias `/portfolio`)
  5. How It Works (homepage & Creative Solutions workflow section)
  6. Why Choose Us (homepage & About Us trust pillars)
  7. FAQ (`/faq`)
  8. Contact Us (`/contact`) & Enquiry Confirmation (`/contact/success`)
  9. Privacy Policy (`/privacy-policy`)
- **Zero Fake or Sample Data**: No sample portfolio projects, fake clients, fake testimonials, fake reviews, fake ratings, or invented metrics.
- **Future-Ready Content Registry**: `src/data/contentRegistry.ts` holds typed arrays (`PORTFOLIO_PROJECTS`, `CLIENT_TESTIMONIALS`, `BUSINESS_UPDATES`) ready for real future work without rebuilding UI components.
- **Trilingual Support (English, हिंदी, मराठी)**: Persistent `localStorage` language switcher translating all pages, navigation, contact form validation, privacy policy, and dynamic SEO metadata.
- **Direct WhatsApp Integration**: Centralized WhatsApp helper (`src/config/business.ts`) using `https://wa.me/919529873424?text=...` with tailored pre-filled enquiry messages for every service and CTA, plus a floating WhatsApp button.
- **Netlify Forms Contact Enquiry System**: Built with native Netlify Forms detection (`name="contact-enquiry"`, spam honeypot `bot-field`, loading indicator, `/contact/success` confirmation page, and honest failure fallback with one-tap WhatsApp / Email / Copy dispatch—never displays a fake success state if delivery fails).
- **SEO & Production Assets**: Dynamic per-route titles/meta/OG tags, verified `LocalBusiness` JSON-LD, `public/sitemap.xml`, `public/robots.txt`, `public/_redirects`, and `netlify.toml`.

---

## Local Development

```bash
npm install
npm run dev
```

To type-check and build for production:

```bash
npm run lint
npm run build
```

> **Note on local Contact Form testing:** Netlify Forms (`POST /` with `form-name=contact-enquiry`) only processes submissions when hosted on Netlify. During local Vite development, submitting the contact form will honestly detect that Netlify Forms is unavailable and offer instant **Send on WhatsApp**, **Send via Email**, or **Copy Message** buttons instead of showing a fake confirmation.

---

## Deploying to Netlify

### Option A: Deploy via GitHub / GitLab / Bitbucket (Recommended)
1. Push the contents of this project (or extract `SAI-Digital-Agency-Website.zip`) to a Git repository.
2. In [Netlify](https://app.netlify.com/), click **Add new site → Import an existing project** and select your repository.
3. Confirm the build settings (auto-detected from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy site**.

### Option B: Manual Build & Drag-and-Drop
1. Extract `SAI-Digital-Agency-Website.zip` on your computer.
2. Run `npm install && npm run build` inside the project folder.
3. Upload the generated `dist/` folder in Netlify under **Add new site → Deploy manually**.

---

## Viewing Customer Enquiries in Netlify Forms

Once deployed to Netlify, the static hidden form blueprint in `index.html` allows Netlify to detect the `contact-enquiry` form automatically during build:

1. Open your site in the **Netlify Dashboard**.
2. Go to **Forms** in the left sidebar (if Forms detection is disabled on your team plan, enable it under **Site configuration → Forms → Form detection** and trigger a fresh deploy).
3. Click **`contact-enquiry`** to view all submitted customer enquiries (`fullName`, `businessName`, `phone`, `service`, `message`).
4. To receive instant alerts on every new enquiry, go to **Site configuration → Notifications → Emails and webhooks → Add notification → Email notification**, select **New form submission**, choose **`contact-enquiry`**, and enter `contactsaiagencyy@gmail.com`.

---

## Post-Deployment Checklist

1. Replace the placeholder canonical URL `https://saidigitalagency.netlify.app` with your live custom domain or Netlify URL in:
   - `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`)
   - `public/sitemap.xml`
   - `public/robots.txt`
   - `src/context/RouterContext.tsx` (`DEFAULT_SITE_ORIGIN`)
2. Submit one test enquiry on the live Netlify URL to confirm it appears under **Netlify Dashboard → Forms → `contact-enquiry`** and redirects to `/contact/success`.
3. Test WhatsApp links on mobile (Android/iOS) to verify `+91 9529873424` opens directly with each pre-filled service message.

---

## Adding Real Future Projects & Testimonials

All future business content is isolated in **`src/data/contentRegistry.ts`**:

- **Real Client Projects:** Add project entries to `PORTFOLIO_PROJECTS` (store real images in `public/projects/`). As soon as one or more projects are added, `/creative-solutions` (and `/portfolio`) automatically renders the filterable showcase gallery and detail modal.
- **Client Testimonials:** Add verified reviews to `CLIENT_TESTIMONIALS`.
- **Business Updates:** Add announcements to `BUSINESS_UPDATES`.

---

© 2026 SAI Digital Agency. All Rights Reserved.
