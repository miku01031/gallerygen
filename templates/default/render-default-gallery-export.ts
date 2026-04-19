import type { AppLanguage } from "@/lib/i18n/dict";
import type { GalleryProject } from "@/types/gallery";

import { getDefaultGalleryTemplateData } from "@/templates/default/get-default-gallery-template-data";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderDefaultGalleryStyles(project: GalleryProject): string {
  const isDarkTheme = project.site.galleryTheme === "dark";

  return `:root {
  color-scheme: ${isDarkTheme ? "dark" : "light"};
  --bg: ${isDarkTheme ? "#111315" : "rgba(250, 250, 249, 0.96)"};
  --border: ${isDarkTheme ? "rgba(255, 255, 255, 0.08)" : "rgba(24, 24, 27, 0.08)"};
  --text: ${isDarkTheme ? "#f5f5f4" : "#09090b"};
  --text-soft: ${isDarkTheme ? "#a1a1aa" : "#71717a"};
  --photo-title: ${isDarkTheme ? "#d4d4d8" : "#52525b"};
  --photo-shadow: ${isDarkTheme ? "0 1px 2px rgba(0, 0, 0, 0.35)" : "0 1px 2px rgba(15, 23, 42, 0.08)"};
  --photo-shadow-hover: ${isDarkTheme ? "0 20px 35px rgba(0, 0, 0, 0.45)" : "0 20px 35px rgba(15, 23, 42, 0.14)"};
  --font-body: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  font-family: var(--font-body);
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
  padding: 32px 16px 48px;
}

.container {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

.site-shell {
  overflow: hidden;
  background: var(--bg);
}

.content {
  padding: 24px 20px 0;
}

.site-masthead {
  padding-bottom: 48px;
  text-align: center;
}

.masthead-label {
  margin: 0;
  color: var(--text-soft);
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero {
  padding-bottom: 56px;
  text-align: center;
}

.hero-title {
  max-width: 960px;
  margin: 0 auto;
  font-size: clamp(3rem, 8vw, 5.75rem);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -0.07em;
}

.hero-description {
  max-width: 720px;
  margin: 24px auto 0;
  color: var(--text-soft);
  font-size: 16px;
  line-height: 1.8;
}

.hero-count {
  margin: 18px 0 0;
  color: var(--text-soft);
  font-size: 14px;
}

.masonry-gallery {
  padding-bottom: 56px;
}

.masonry-grid {
  column-count: 1;
  column-gap: 1.5rem;
}

.masonry-item {
  break-inside: avoid;
  margin: 0 0 1.5rem;
}

.masonry-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: var(--photo-shadow);
  transition:
    transform 500ms ease,
    box-shadow 500ms ease;
}

.masonry-item:hover img {
  transform: scale(1.02);
  box-shadow: var(--photo-shadow-hover);
}

.photo-caption {
  margin-top: 8px;
}

.photo-title {
  margin: 0;
  color: var(--photo-title);
  font-size: 14px;
  font-weight: 500;
}

.empty-state {
  padding-top: 8px;
  padding-bottom: 48px;
  text-align: center;
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
  color: var(--text-soft);
  font-size: 15px;
  line-height: 1.8;
}

.site-footer {
  background: transparent;
  border-top: 1px solid var(--border);
  color: var(--text-soft);
  padding: 40px 20px;
}

.site-footer-inner {
  display: grid;
  gap: 16px;
}

.footer-label {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.footer-title {
  margin: 8px 0 0;
  color: var(--text-soft);
  font-size: 14px;
  font-weight: 400;
}

.footer-meta {
  display: grid;
  gap: 4px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

@media (min-width: 640px) {
  .page {
    padding: 40px 24px 64px;
  }

  .content {
    padding: 32px 32px 0;
  }

  .masonry-grid {
    column-count: 2;
  }

  .site-footer {
    padding: 48px 32px;
  }

  .site-footer-inner {
    grid-template-columns: minmax(0, 1fr) 180px;
    align-items: end;
  }

  .footer-meta {
    text-align: right;
  }
}

@media (min-width: 768px) {
  .masonry-grid {
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    column-count: 4;
  }
}

`;
}

export function renderDefaultGalleryExportHtml(
  project: GalleryProject,
  language: AppLanguage,
): string {
  const template = getDefaultGalleryTemplateData(project, language);

  const renderMasonryItems = (
    photos: typeof template.photos,
  ): string =>
    photos
      .map(
        (photo) => `          <figure class="masonry-item">
            <img src="${escapeHtml(photo.exportSrc)}" alt="${escapeHtml(photo.alt)}" />
${photo.caption ? `            <figcaption class="photo-caption">
              <p class="photo-title">${escapeHtml(photo.caption)}</p>
            </figcaption>` : ""}
          </figure>`,
      )
      .join("\n");

  const masonryHtml = template.photos.length
    ? `      <section class="masonry-gallery">
        <div class="masonry-grid">
${renderMasonryItems(template.photos)}
        </div>
      </section>`
    : "";

  const emptyHtml = !template.photos.length
    ? `      <section class="empty-state">
        <h2 class="empty-title">${escapeHtml(template.emptyTitle)}</h2>
        <p class="empty-description">${escapeHtml(template.emptyDescription)}</p>
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
      <div class="container">
        <article class="site-shell">
          <div class="content">
            <header class="site-masthead">
              <p class="masthead-label">${escapeHtml(template.mastheadLabel)}</p>
            </header>

            <section class="hero">
              <h1 class="hero-title">${escapeHtml(template.title)}</h1>
              <p class="hero-description">${escapeHtml(template.description)}</p>
              <p class="hero-count">${escapeHtml(template.photoCountLabel)}</p>
            </section>
${masonryHtml}
${emptyHtml}
          </div>

          <footer class="site-footer">
            <div class="site-footer-inner">
              <div>
                <p class="footer-label">${escapeHtml(template.mastheadLabel)}</p>
                <p class="footer-title">${escapeHtml(template.title)}</p>
              </div>
              <div class="footer-meta">
                <p>${escapeHtml(template.photoCountLabel)}</p>
                <p>${escapeHtml(template.footerNote)}</p>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  </body>
</html>
`;
}
