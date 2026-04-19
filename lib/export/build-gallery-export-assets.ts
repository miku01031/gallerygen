import type { AppLanguage } from "@/lib/i18n/dict";
import { createImageExportAssets } from "@/lib/export/create-image-export-assets";
import type { GalleryExportBundle } from "@/lib/export/types";
import { renderDefaultGalleryExportHtml, renderDefaultGalleryStyles } from "@/templates/default/render-default-gallery-export";
import {
  renderShowcaseGalleryExportHtml,
  renderShowcaseGalleryStyles,
} from "@/templates/showcase/render-showcase-gallery-export";
import type { GalleryProject } from "@/types/gallery";

export function buildGalleryExportAssets(
  project: GalleryProject,
  language: AppLanguage,
): GalleryExportBundle {
  switch (project.site.theme) {
    case "showcase":
      const showcaseImageAssets = createImageExportAssets(project.photos);

      return {
        assets: [
          {
            kind: "text",
            path: "index.html",
            contents: renderShowcaseGalleryExportHtml(project, language),
            mimeType: "text/html",
          },
          {
            kind: "text",
            path: "styles.css",
            contents: renderShowcaseGalleryStyles(project),
            mimeType: "text/css",
          },
          ...showcaseImageAssets,
        ],
      };
    case "default":
    default:
      const imageAssets = createImageExportAssets(project.photos);

      return {
        assets: [
          {
            kind: "text",
            path: "index.html",
            contents: renderDefaultGalleryExportHtml(project, language),
            mimeType: "text/html",
          },
          {
            kind: "text",
            path: "styles.css",
            contents: renderDefaultGalleryStyles(project),
            mimeType: "text/css",
          },
          ...imageAssets,
        ],
      };
  }
}
