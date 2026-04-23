import { DefaultGalleryTemplate } from "@/templates/default/default-gallery-template";
import { ShowcaseGalleryTemplate } from "@/templates/showcase/showcase-gallery-template";
import type { AppLanguage } from "@/lib/i18n/dict";
import type { GalleryProject } from "@/types/gallery";

type GalleryTemplatePreviewProps = {
  language: AppLanguage;
  project: GalleryProject;
  onRemovePhoto?: (photoId: string) => void;
  onReorderPhoto?: (fromIndex: number, toIndex: number) => void;
  onOpenPhoto?: (photoId: string) => void;
};

export function GalleryTemplatePreview({
  language,
  project,
  onRemovePhoto,
  onReorderPhoto,
  onOpenPhoto,
}: GalleryTemplatePreviewProps) {
  switch (project.site.theme) {
    case "showcase":
      return (
        <ShowcaseGalleryTemplate
          language={language}
          project={project}
          onRemovePhoto={onRemovePhoto}
          onReorderPhoto={onReorderPhoto}
          onOpenPhoto={onOpenPhoto}
        />
      );
    case "default":
    default:
      return (
        <DefaultGalleryTemplate
          language={language}
          project={project}
          onRemovePhoto={onRemovePhoto}
          onReorderPhoto={onReorderPhoto}
          onOpenPhoto={onOpenPhoto}
        />
      );
  }
}
