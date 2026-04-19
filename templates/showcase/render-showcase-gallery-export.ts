import type { AppLanguage } from "@/lib/i18n/dict";
import type { GalleryProject } from "@/types/gallery";

import {
  getShowcaseGalleryTemplateData,
  type ShowcaseTemplatePhoto,
} from "@/templates/showcase/get-showcase-gallery-template-data";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getSlotClass(slot: ShowcaseTemplatePhoto["slot"]): string {
  switch (slot) {
    case "wide-feature":
      return "feature-slot feature-slot--wide-feature";
    case "secondary-feature":
      return "feature-slot feature-slot--secondary-feature";
    case "mobile-feature":
      return "feature-slot feature-slot--mobile-feature";
    case "supporting-utility":
    default:
      return "feature-slot feature-slot--supporting-utility";
  }
}

function renderMockup(
  photo: Pick<ShowcaseTemplatePhoto, "alt" | "device" | "exportSrc">,
): string {
  if (photo.device === "mobile") {
    return `            <div class="phone-frame">
              <div class="phone-notch"></div>
              <img src="${escapeHtml(photo.exportSrc)}" alt="${escapeHtml(photo.alt)}" />
            </div>`;
  }

  return `            <div class="desktop-frame">
              <div class="desktop-bar">
                <span class="desktop-dot desktop-dot--red"></span>
                <span class="desktop-dot desktop-dot--amber"></span>
                <span class="desktop-dot desktop-dot--green"></span>
              </div>
              <img src="${escapeHtml(photo.exportSrc)}" alt="${escapeHtml(photo.alt)}" />
            </div>`;
}

export function renderShowcaseGalleryStyles(project: GalleryProject): string {
  const isDarkTheme = project.site.galleryTheme === "dark";

  return `:root {
  color-scheme: ${isDarkTheme ? "dark" : "light"};
  --bg: ${isDarkTheme ? "#09090b" : "#fafafa"};
  --dot: ${isDarkTheme ? "#27272a" : "#e5e7eb"};
  --border: ${isDarkTheme ? "#27272a" : "#e4e4e7"};
  --text: ${isDarkTheme ? "#fafafa" : "#18181b"};
  --muted: ${isDarkTheme ? "#a1a1aa" : "#71717a"};
  --surface: ${isDarkTheme ? "#18181b" : "#ffffff"};
  --shadow: 0 18px 45px -18px rgba(15, 23, 42, 0.28);
  --shadow-hover: 0 30px 70px -24px rgba(15, 23, 42, 0.34);
  --hero-glow: rgba(99, 102, 241, 0.07);
  --desktop-ring: ${isDarkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(24, 24, 27, 0.05)"};
  --desktop-bar-border: ${isDarkTheme ? "rgba(39, 39, 42, 0.5)" : "rgba(228, 228, 231, 0.5)"};
  --desktop-bar-bg: ${isDarkTheme ? "rgba(24, 24, 27, 0.8)" : "rgba(255, 255, 255, 0.8)"};
  --phone-shell: ${isDarkTheme ? "#000000" : "#18181b"};
  --dot-opacity: ${isDarkTheme ? "0.45" : "0.7"};
  --font-sans: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
}

body {
  margin: 0;
  background: var(--bg);
}

img {
  display: block;
  max-width: 100%;
}

.page {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: var(--bg);
}

.page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--dot) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: var(--dot-opacity);
  pointer-events: none;
}

.hero-glow {
  position: absolute;
  left: 50%;
  top: 208px;
  width: 320px;
  height: 320px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: var(--hero-glow);
  filter: blur(110px);
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 20px 0;
}

.masthead {
  padding-bottom: 16px;
  text-align: center;
}

.masthead-label {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.hero {
  position: relative;
  z-index: 1;
  max-width: 896px;
  margin: 0 auto;
  padding: 96px 16px 64px;
  text-align: center;
}

.hero-meta {
  margin: 0 0 20px;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}

.hero-title {
  margin: 0 0 24px;
  font-size: clamp(3rem, 8vw, 5.75rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.92;
}

.hero-description {
  max-width: 720px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.8;
  color: var(--muted);
}

.lead-section {
  position: relative;
  z-index: 2;
  max-width: 1120px;
  margin: 0 auto 96px;
  padding: 0 16px;
}

.lead-figure {
  margin: 0;
}

.desktop-frame,
.phone-frame {
  transition:
    transform 500ms ease,
    box-shadow 500ms ease;
}

.desktop-frame:hover,
.phone-frame:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-hover);
}

.desktop-frame {
  overflow: hidden;
  border-radius: 12px;
  background: var(--surface);
  box-shadow: var(--shadow);
  outline: 1px solid var(--desktop-ring);
}

.desktop-bar {
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid var(--desktop-bar-border);
  background: var(--desktop-bar-bg);
  backdrop-filter: blur(12px);
}

.desktop-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.desktop-dot--red {
  background: #f87171;
}

.desktop-dot--amber {
  background: #fbbf24;
}

.desktop-dot--green {
  background: #4ade80;
}

.desktop-frame img {
  width: 100%;
  height: auto;
}

.phone-frame {
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  overflow: hidden;
  border: 10px solid var(--phone-shell);
  border-radius: 40px;
  background: var(--phone-shell);
  box-shadow: var(--shadow);
}

.phone-notch {
  position: absolute;
  top: 12px;
  left: 50%;
  width: 112px;
  height: 24px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #09090b;
  z-index: 1;
}

.phone-frame img {
  width: 100%;
  height: auto;
}

.feature-caption {
  margin-top: 20px;
  text-align: left;
}

.feature-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.features {
  position: relative;
  z-index: 1;
  max-width: 1216px;
  margin: 0 auto;
  padding: 0 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

.feature-slot {
  margin: 0;
}

.empty-state {
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px 48px;
}

.empty-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.empty-description {
  max-width: 640px;
  margin: 16px auto 0;
  color: var(--muted);
  line-height: 1.8;
}

.footer {
  margin-top: 96px;
  border-top: 1px solid var(--border);
  padding: 48px 16px;
  text-align: center;
}

.footer-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
}

.footer-note {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--muted);
}

.footer-project-link {
  display: inline-flex;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  text-decoration: underline;
  text-decoration-color: var(--border);
  text-underline-offset: 4px;
}

.footer-project-link:hover {
  color: var(--text);
}

@media (min-width: 640px) {
  .container {
    padding: 32px 32px 0;
  }

  .hero-glow {
    width: 416px;
    height: 416px;
  }
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .feature-slot--wide-feature {
    grid-column: span 7;
  }

  .feature-slot--secondary-feature {
    grid-column: span 6;
  }

  .feature-slot--mobile-feature {
    grid-column: span 5;
  }

  .feature-slot--supporting-utility {
    grid-column: span 6;
  }
}

@media (min-width: 1024px) {
  .feature-slot--wide-feature {
    grid-column: span 8;
  }

  .feature-slot--secondary-feature {
    grid-column: span 7;
  }

  .feature-slot--mobile-feature {
    grid-column: span 4;
  }

  .feature-slot--supporting-utility {
    grid-column: span 4;
  }
}

`;
}

export function renderShowcaseGalleryExportHtml(
  project: GalleryProject,
  language: AppLanguage,
): string {
  const template = getShowcaseGalleryTemplateData(project, language);

  const leadHtml = template.leadPhoto
    ? `      <section class="lead-section">
        <figure class="lead-figure">
${renderMockup(template.leadPhoto)}
${template.leadPhoto.title ? `          <figcaption class="feature-caption">
            <p class="feature-title">${escapeHtml(template.leadPhoto.title)}</p>
          </figcaption>` : ""}
        </figure>
      </section>`
    : "";

  const featuresHtml = template.featurePhotos.length
    ? `      <section class="features">
        <div class="features-grid">
${template.featurePhotos
  .map(
    (photo) => `          <figure class="${getSlotClass(photo.slot)}">
${renderMockup(photo)}
${photo.title ? `            <figcaption class="feature-caption">
              <p class="feature-title">${escapeHtml(photo.title)}</p>
            </figcaption>` : ""}
          </figure>`,
  )
  .join("\n")}
        </div>
      </section>`
    : "";

  const emptyHtml = !template.leadPhoto && !template.featurePhotos.length
    ? `      <section class="empty-state">
        <div>
          <h2 class="empty-title">${escapeHtml(template.emptyTitle)}</h2>
          <p class="empty-description">${escapeHtml(template.emptyDescription)}</p>
        </div>
      </section>`
    : "";

  return `<!doctype html>
<html lang="${template.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(template.title)}</title>
    <meta name="description" content="${escapeHtml(template.description)}" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <main class="page">
      <div class="hero-glow"></div>
      <div class="container">
        <header class="masthead">
          <p class="masthead-label">${escapeHtml(template.mastheadLabel)}</p>
        </header>

        <section class="hero">
          <p class="hero-meta">${escapeHtml(template.photoCountLabel)}</p>
          <h1 class="hero-title">${escapeHtml(template.title)}</h1>
          <p class="hero-description">${escapeHtml(template.description)}</p>
        </section>
${leadHtml}
${featuresHtml}
${emptyHtml}
      </div>

      <footer class="footer">
        <p class="footer-title">${escapeHtml(template.title)}</p>
        <p class="footer-note">${escapeHtml(template.footerNote)}</p>
${template.projectUrl ? `        <a class="footer-project-link" href="${escapeHtml(template.projectUrl)}" target="_blank" rel="noreferrer">${escapeHtml(template.projectLinkLabel)}</a>` : ""}
      </footer>
    </main>
  </body>
</html>
`;
}
