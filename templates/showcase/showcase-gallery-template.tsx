"use client";

import Image from "next/image";
import { GripVertical } from "lucide-react";
import type { DragEvent } from "react";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";
import { usePhotoReorderDrag } from "@/lib/drag/use-photo-reorder-drag";
import type { GalleryProject } from "@/types/gallery";
import {
  getShowcaseGalleryTemplateData,
  type ShowcaseTemplatePhoto,
} from "@/templates/showcase/get-showcase-gallery-template-data";

type ShowcaseGalleryTemplateProps = {
  language: AppLanguage;
  project: GalleryProject;
  onRemovePhoto?: (photoId: string) => void;
  onReorderPhoto?: (fromIndex: number, toIndex: number) => void;
  onOpenPhoto?: (photoId: string) => void;
};

type HandleProps = {
  draggable: true;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: (event: DragEvent<HTMLElement>) => void;
};

type DeviceMockupProps = {
  alt: string;
  className?: string;
  device: ShowcaseTemplatePhoto["device"];
  height: number;
  imageUrl: string;
  isDarkTheme: boolean;
  onImageClick?: () => void;
  openImageLabel?: string;
  onRemove?: () => void;
  removeLabel?: string;
  reorderHandleProps?: HandleProps;
  reorderHandleLabel?: string;
  width: number;
};

function getSlotClasses(slot: ShowcaseTemplatePhoto["slot"]): string {
  switch (slot) {
    case "wide-feature":
      return "md:col-span-7 lg:col-span-8";
    case "secondary-feature":
      return "md:col-span-6 lg:col-span-7";
    case "mobile-feature":
      return "md:col-span-5 lg:col-span-4";
    case "supporting-utility":
    default:
      return "md:col-span-6 lg:col-span-4";
  }
}

function DeviceMockup({
  alt,
  className = "",
  device,
  height,
  imageUrl,
  isDarkTheme,
  onImageClick,
  openImageLabel,
  onRemove,
  removeLabel,
  reorderHandleProps,
  reorderHandleLabel,
  width,
}: DeviceMockupProps) {
  const imageClassName = [
    "block h-auto w-full",
    onImageClick ? "cursor-zoom-in" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const reorderButton = reorderHandleProps ? (
    <button
      type="button"
      {...reorderHandleProps}
      aria-label={reorderHandleLabel}
      className="absolute left-4 top-4 inline-flex h-8 w-8 cursor-grab items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/65 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 group-hover:opacity-100 active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  ) : null;

  if (device === "mobile") {
    return (
      <div
        className={[
          "group relative mx-auto w-full max-w-[320px] overflow-hidden rounded-[2.5rem] border-[10px] shadow-[0_18px_45px_-18px_rgba(0,0,0,0.28)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-24px_rgba(0,0,0,0.34)]",
          isDarkTheme ? "border-black bg-black" : "border-zinc-900 bg-zinc-900",
          className,
        ].join(" ")}
      >
        <div className="pointer-events-none absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-full bg-black/90" />
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          draggable={false}
          onClick={onImageClick}
          aria-label={onImageClick ? openImageLabel : undefined}
          className={imageClassName}
        />
        {reorderButton}
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            aria-label={removeLabel}
            className="absolute right-4 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition hover:bg-black/70 group-hover:opacity-100"
          >
            x
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-xl shadow-[0_18px_45px_-18px_rgba(15,23,42,0.28)] transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-24px_rgba(15,23,42,0.34)]",
        isDarkTheme ? "bg-zinc-900 ring-1 ring-white/10" : "bg-white ring-1 ring-zinc-900/5",
        className,
      ].join(" ")}
    >
      <div
        className={[
          "flex h-10 items-center gap-2 border-b px-4 backdrop-blur-md",
          isDarkTheme
            ? "border-zinc-800/50 bg-zinc-900/80"
            : "border-zinc-200/50 bg-white/80",
        ].join(" ")}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        draggable={false}
        onClick={onImageClick}
        aria-label={onImageClick ? openImageLabel : undefined}
        className={imageClassName}
      />
      {reorderButton}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition hover:bg-black/65 group-hover:opacity-100"
        >
          x
        </button>
      ) : null}
    </div>
  );
}

export function ShowcaseGalleryTemplate({
  language,
  project,
  onRemovePhoto,
  onReorderPhoto,
  onOpenPhoto,
}: ShowcaseGalleryTemplateProps) {
  const dictionary = getDictionary(language);
  const template = getShowcaseGalleryTemplateData(project, language);
  const leadPhoto = template.leadPhoto;
  const isDarkTheme = template.galleryTheme === "dark";
  const orderedIds = project.photos.map((photo) => photo.id);

  const reorder = usePhotoReorderDrag({
    orderedIds,
    onReorder: onReorderPhoto ?? (() => undefined),
  });
  const reorderEnabled = Boolean(onReorderPhoto);

  function reorderFigureClasses(photoId: string, baseClass: string): string {
    if (!reorderEnabled) {
      return baseClass;
    }

    const active = reorder.isActive(photoId);
    const target = reorder.isTarget(photoId);

    return [
      baseClass,
      "transition",
      active ? "opacity-40" : "",
      target
        ? "ring-2 ring-emerald-400/70 ring-offset-4 ring-offset-transparent rounded-2xl"
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <article
      className={[
        "relative overflow-hidden",
        isDarkTheme ? "bg-zinc-950 text-zinc-50" : "bg-zinc-50 text-zinc-950",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 [background-size:20px_20px]",
          isDarkTheme
            ? "bg-[radial-gradient(#27272a_1px,transparent_1px)] opacity-45"
            : "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-70",
        ].join(" ")}
      />
      <div className="pointer-events-none absolute left-1/2 top-[13rem] z-0 h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[110px] sm:h-[26rem] sm:w-[26rem]" />

      <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <header className="pb-4 text-center">
          <p
            className={[
              "text-sm font-semibold tracking-[-0.03em]",
              isDarkTheme ? "text-zinc-100" : "text-zinc-900",
            ].join(" ")}
          >
            {template.mastheadLabel}
          </p>
        </header>

        <section className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-24 text-center">
          <p
            className={[
              "mb-5 text-[11px] uppercase tracking-[0.22em]",
              isDarkTheme ? "text-zinc-400" : "text-zinc-500",
            ].join(" ")}
          >
            {template.photoCountLabel}
          </p>
          <h2
            className={[
              "mb-6 text-5xl font-extrabold tracking-tighter md:text-7xl",
              isDarkTheme ? "text-white" : "text-zinc-900",
            ].join(" ")}
          >
            {template.title}
          </h2>
          <p
            className={[
              "mx-auto max-w-2xl text-lg md:text-xl",
              isDarkTheme ? "text-zinc-400" : "text-zinc-500",
            ].join(" ")}
          >
            {template.description}
          </p>
        </section>

        {leadPhoto ? (
          <section className="relative z-20 mb-24">
            <figure
              {...(reorderEnabled ? reorder.getDropProps(leadPhoto.id) : {})}
              className={reorderFigureClasses(
                leadPhoto.id,
                "mx-auto max-w-5xl px-4",
              )}
            >
              <DeviceMockup
                alt={leadPhoto.alt}
                device={leadPhoto.device}
                imageUrl={leadPhoto.objectUrl}
                width={leadPhoto.width}
                height={leadPhoto.height}
                isDarkTheme={isDarkTheme}
                className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                onImageClick={
                  onOpenPhoto ? () => onOpenPhoto(leadPhoto.id) : undefined
                }
                openImageLabel={dictionary.previewLightbox.openHint}
                onRemove={onRemovePhoto ? () => onRemovePhoto(leadPhoto.id) : undefined}
                removeLabel={`${dictionary.common.remove} ${leadPhoto.title ?? leadPhoto.alt}`}
                reorderHandleProps={
                  reorderEnabled ? reorder.getHandleProps(leadPhoto.id) : undefined
                }
                reorderHandleLabel={dictionary.photoOrder.dragHandle}
              />

              {leadPhoto.title ? (
                <figcaption className="mt-5 text-left">
                  <p
                    className={[
                      "text-sm font-semibold",
                      isDarkTheme ? "text-zinc-100" : "text-zinc-900",
                    ].join(" ")}
                  >
                    {leadPhoto.title}
                  </p>
                </figcaption>
              ) : null}
            </figure>
          </section>
        ) : null}

        {template.featurePhotos.length > 0 ? (
          <section className="relative z-10">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-12">
              {template.featurePhotos.map((photo) => (
                <figure
                  key={photo.id}
                  {...(reorderEnabled ? reorder.getDropProps(photo.id) : {})}
                  className={reorderFigureClasses(photo.id, getSlotClasses(photo.slot))}
                >
                  <DeviceMockup
                    alt={photo.alt}
                    device={photo.device}
                    imageUrl={photo.objectUrl}
                    width={photo.width}
                    height={photo.height}
                    isDarkTheme={isDarkTheme}
                    onImageClick={
                      onOpenPhoto ? () => onOpenPhoto(photo.id) : undefined
                    }
                    openImageLabel={dictionary.previewLightbox.openHint}
                    onRemove={onRemovePhoto ? () => onRemovePhoto(photo.id) : undefined}
                    removeLabel={`${dictionary.common.remove} ${photo.title ?? photo.alt}`}
                    reorderHandleProps={
                      reorderEnabled ? reorder.getHandleProps(photo.id) : undefined
                    }
                    reorderHandleLabel={dictionary.photoOrder.dragHandle}
                  />

                  {photo.title ? (
                    <figcaption className="mt-5 text-left">
                      <p
                        className={[
                          "text-sm font-semibold",
                          isDarkTheme ? "text-zinc-100" : "text-zinc-900",
                        ].join(" ")}
                      >
                        {photo.title}
                      </p>
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {!leadPhoto && template.featurePhotos.length === 0 ? (
          <section className="flex min-h-[340px] items-center justify-center pb-12 text-center sm:pb-16">
            <div className="max-w-xl space-y-4">
              <h3
                className={[
                  "text-2xl font-semibold tracking-[-0.04em] sm:text-3xl",
                  isDarkTheme ? "text-zinc-50" : "text-zinc-950",
                ].join(" ")}
              >
                {template.emptyTitle}
              </h3>
              <p
                className={[
                  "text-sm leading-7 sm:text-base",
                  isDarkTheme ? "text-zinc-300" : "text-zinc-600",
                ].join(" ")}
              >
                {template.emptyDescription}
              </p>
            </div>
          </section>
        ) : null}
      </div>

      <footer
        className={[
          "mt-24 border-t py-12 text-center",
          isDarkTheme ? "border-zinc-800" : "border-zinc-200",
        ].join(" ")}
      >
        <div className="space-y-2 px-4">
          <p
            className={[
              "text-sm font-semibold",
              isDarkTheme ? "text-zinc-100" : "text-zinc-900",
            ].join(" ")}
          >
            {template.title}
          </p>
          <p
            className={[
              "text-sm",
              isDarkTheme ? "text-zinc-400" : "text-zinc-500",
            ].join(" ")}
          >
            {template.footerNote}
          </p>
          {template.projectUrl ? (
            <p className="pt-2">
              <a
                href={template.projectUrl}
                target="_blank"
                rel="noreferrer"
                className={[
                  "inline-flex items-center text-sm font-medium underline underline-offset-4 transition",
                  isDarkTheme
                    ? "text-zinc-300 decoration-zinc-700 hover:text-zinc-50"
                    : "text-zinc-600 decoration-zinc-300 hover:text-zinc-950",
                ].join(" ")}
              >
                {template.projectLinkLabel}
              </a>
            </p>
          ) : null}
        </div>
      </footer>
    </article>
  );
}
