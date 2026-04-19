import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary, getPhotoCountLabel } from "@/lib/i18n/dict";
import { createPhotoExportPathMap } from "@/lib/export/create-image-export-assets";
import type { GalleryProject } from "@/types/gallery";
import type { GalleryTheme } from "@/types/gallery";

export type ShowcaseTemplatePhoto = {
  id: string;
  title?: string;
  alt: string;
  objectUrl: string;
  exportSrc: string;
  width: number;
  height: number;
  device: "desktop" | "mobile";
  slot?: "secondary-feature" | "supporting-utility" | "mobile-feature" | "wide-feature";
};

export type ShowcaseGalleryTemplateData = {
  htmlLang: AppLanguage;
  galleryTheme: GalleryTheme;
  mastheadLabel: string;
  photoCountLabel: string;
  footerNote: string;
  projectUrl?: string;
  projectLinkLabel: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  leadPhoto?: ShowcaseTemplatePhoto;
  featurePhotos: ShowcaseTemplatePhoto[];
};

function getDesktopSlot(index: number): NonNullable<ShowcaseTemplatePhoto["slot"]> {
  const pattern: NonNullable<ShowcaseTemplatePhoto["slot"]>[] = [
    "secondary-feature",
    "wide-feature",
    "supporting-utility",
    "wide-feature",
    "supporting-utility",
  ];

  return pattern[index % pattern.length] ?? "supporting-utility";
}

function getMobileSlot(index: number): NonNullable<ShowcaseTemplatePhoto["slot"]> {
  const pattern: NonNullable<ShowcaseTemplatePhoto["slot"]>[] = [
    "mobile-feature",
    "supporting-utility",
    "mobile-feature",
    "supporting-utility",
  ];

  return pattern[index % pattern.length] ?? "mobile-feature";
}

function looksLikeRawFilename(value: string): boolean {
  return /^(img|dsc|pxl|mvimg|photo|image|screenshot|capture)[\s_-]*\d+/i.test(value)
    || /^[a-z]{2,}[\s_-]?\d{3,}$/i.test(value)
    || /[_-]\d{3,}/.test(value)
    || /\d{4,}/.test(value);
}

function getCleanTitle(value: string): string | undefined {
  const trimmedValue = value.trim();

  if (!trimmedValue || looksLikeRawFilename(trimmedValue)) {
    return undefined;
  }

  return trimmedValue;
}

export function getShowcaseGalleryTemplateData(
  project: GalleryProject,
  language: AppLanguage,
): ShowcaseGalleryTemplateData {
  const dictionary = getDictionary(language);
  const copy = dictionary.templates.showcase;
  const exportPathMap = createPhotoExportPathMap(project.photos);
  const title = project.site.title.trim() || copy.untitled;
  const description = project.site.description.trim() || copy.fallbackDescription;
  const projectUrl = project.site.projectUrl?.trim() || undefined;

  const photos = project.photos.map((photo, index) => {
    const cleanTitle = getCleanTitle(photo.title);
    const isMobile = photo.height > photo.width;

    return {
      id: photo.id,
      title: cleanTitle,
      alt: cleanTitle ?? copy.imageAlt(index + 1),
      objectUrl: photo.objectUrl,
      exportSrc: exportPathMap.get(photo.id) ?? `images/${photo.fileName}`,
      width: photo.width,
      height: photo.height,
      device: isMobile ? ("mobile" as const) : ("desktop" as const),
    };
  });

  const leadPhotoBase = photos[0];
  const leadPhoto = leadPhotoBase
    ? {
        ...leadPhotoBase,
        title: leadPhotoBase.title ?? copy.featureTitleFallback(1),
      }
    : undefined;
  let desktopIndex = 0;
  let mobileIndex = 0;
  const featurePhotos = photos.slice(1).map((photo, index) => {
    let slot: ShowcaseTemplatePhoto["slot"];

    if (photo.device === "mobile") {
      slot = getMobileSlot(mobileIndex);
      mobileIndex += 1;
    } else {
      slot = getDesktopSlot(desktopIndex);
      desktopIndex += 1;
    }

    return {
      ...photo,
      slot,
      title: photo.title ?? copy.featureTitleFallback(index + 2),
    };
  });

  return {
    htmlLang: language,
    galleryTheme: project.site.galleryTheme,
    mastheadLabel: "GalleryGen",
    photoCountLabel: getPhotoCountLabel(language, project.photos.length),
    footerNote: copy.footerNote,
    projectUrl,
    projectLinkLabel: copy.projectLinkLabel,
    title,
    description,
    emptyTitle: copy.emptyTitle,
    emptyDescription: copy.emptyDescription,
    leadPhoto,
    featurePhotos,
  };
}
