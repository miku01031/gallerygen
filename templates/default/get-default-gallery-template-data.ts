import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary, getPhotoCountLabel } from "@/lib/i18n/dict";
import type { GalleryProject } from "@/types/gallery";
import type { GalleryTheme } from "@/types/gallery";
import { createPhotoExportPathMap } from "@/lib/export/create-image-export-assets";

type DefaultTemplatePhoto = {
  id: string;
  caption?: string;
  alt: string;
  objectUrl: string;
  exportSrc: string;
  width: number;
  height: number;
};

export type DefaultGalleryTemplateData = {
  htmlLang: AppLanguage;
  galleryTheme: GalleryTheme;
  mastheadLabel: string;
  photoCountLabel: string;
  footerNote: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  photos: DefaultTemplatePhoto[];
};

function stripFileExtension(value: string): string {
  return value.replace(/\.[^.]+$/, "");
}

function normalizeLooseLabel(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_-]+/g, " ");
}

function looksLikeRawFilename(value: string): boolean {
  const normalizedValue = stripFileExtension(value.trim());

  return /^(img|dsc|pxl|mvimg|photo|image|screenshot|screen shot|capture)[\s_-]*\d+/i.test(
    normalizedValue,
  )
    || /^[a-z]{2,}[\s_-]?\d{3,}$/i.test(normalizedValue)
    || /[_-]\d{3,}/.test(normalizedValue)
    || /\d{4,}/.test(normalizedValue);
}

function getEditorialCaption(title: string, originalName: string): string | undefined {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return undefined;
  }

  const normalizedTitle = normalizeLooseLabel(trimmedTitle);
  const normalizedOriginalName = normalizeLooseLabel(stripFileExtension(originalName));

  if (normalizedTitle === normalizedOriginalName && looksLikeRawFilename(originalName)) {
    return undefined;
  }

  if (looksLikeRawFilename(trimmedTitle)) {
    return undefined;
  }

  return trimmedTitle;
}

export function getDefaultGalleryTemplateData(
  project: GalleryProject,
  language: AppLanguage,
): DefaultGalleryTemplateData {
  const dictionary = getDictionary(language);
  const copy = dictionary.templates.default;
  const exportPathMap = createPhotoExportPathMap(project.photos);
  const title = project.site.title.trim() || copy.untitled;
  const description = project.site.description.trim() || copy.fallbackDescription;

  const photos = project.photos.map((photo, index) => {
    const caption = getEditorialCaption(photo.title, photo.originalName);

    return {
      id: photo.id,
      caption,
      alt: caption ?? copy.imageAlt(index + 1),
      objectUrl: photo.objectUrl,
      exportSrc: exportPathMap.get(photo.id) ?? `images/${photo.fileName}`,
      width: photo.width,
      height: photo.height,
    };
  });

  return {
    htmlLang: language,
    galleryTheme: project.site.galleryTheme,
    mastheadLabel: "GalleryGen",
    photoCountLabel: getPhotoCountLabel(language, project.photos.length),
    footerNote: copy.footerNote,
    title,
    description,
    emptyTitle: copy.emptyTitle,
    emptyDescription: copy.emptyDescription,
    photos,
  };
}
