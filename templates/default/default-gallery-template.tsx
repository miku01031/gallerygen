"use client";

import Image from "next/image";
import { GripVertical } from "lucide-react";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";
import { usePhotoReorderDrag } from "@/lib/drag/use-photo-reorder-drag";
import type { GalleryProject } from "@/types/gallery";
import { getDefaultGalleryTemplateData } from "@/templates/default/get-default-gallery-template-data";

type DefaultGalleryTemplateProps = {
  language: AppLanguage;
  project: GalleryProject;
  onRemovePhoto?: (photoId: string) => void;
  onReorderPhoto?: (fromIndex: number, toIndex: number) => void;
  onOpenPhoto?: (photoId: string) => void;
};

export function DefaultGalleryTemplate({
  language,
  project,
  onRemovePhoto,
  onReorderPhoto,
  onOpenPhoto,
}: DefaultGalleryTemplateProps) {
  const dictionary = getDictionary(language);
  const template = getDefaultGalleryTemplateData(project, language);
  const isDarkTheme = template.galleryTheme === "dark";
  const orderedIds = project.photos.map((photo) => photo.id);

  const reorder = usePhotoReorderDrag({
    orderedIds,
    onReorder: onReorderPhoto ?? (() => undefined),
  });
  const reorderEnabled = Boolean(onReorderPhoto);

  function renderMasonryPhoto(photo: (typeof template.photos)[number]) {
    const isActive = reorderEnabled && reorder.isActive(photo.id);
    const isTarget = reorderEnabled && reorder.isTarget(photo.id);
    const dropProps = reorderEnabled ? reorder.getDropProps(photo.id) : undefined;
    const handleProps = reorderEnabled
      ? reorder.getHandleProps(photo.id)
      : undefined;

    return (
      <figure
        key={photo.id}
        {...(dropProps ?? {})}
        className={[
          "group relative mb-6 [break-inside:avoid] transition",
          isActive ? "opacity-40" : "",
          isTarget
            ? "ring-2 ring-emerald-400/80 ring-offset-2 ring-offset-transparent rounded-lg"
            : "",
        ].join(" ")}
      >
        <div className="relative">
          <Image
            src={photo.objectUrl}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            unoptimized
            draggable={false}
            onClick={onOpenPhoto ? () => onOpenPhoto(photo.id) : undefined}
            aria-label={onOpenPhoto ? dictionary.previewLightbox.openHint : undefined}
            className={[
              "h-auto w-full break-inside-avoid rounded-lg object-cover shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl",
              onOpenPhoto ? "cursor-zoom-in" : "",
            ].join(" ")}
          />

          {handleProps ? (
            <button
              type="button"
              {...handleProps}
              aria-label={dictionary.photoOrder.dragHandle}
              className="absolute left-3 top-3 inline-flex h-8 w-8 cursor-grab items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/60 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </button>
          ) : null}

          {onRemovePhoto ? (
            <button
              type="button"
              onClick={() => onRemovePhoto(photo.id)}
              aria-label={`${dictionary.common.remove} ${photo.caption ?? photo.alt}`}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-black/55"
            >
              x
            </button>
          ) : null}
        </div>

        {photo.caption ? (
          <figcaption className="mt-2">
            <p
              className={[
                "text-sm font-medium",
                isDarkTheme ? "text-zinc-400" : "text-zinc-600",
              ].join(" ")}
            >
              {photo.caption}
            </p>
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <article
      className={[
        "overflow-hidden",
        isDarkTheme ? "bg-[#111315] text-zinc-50" : "bg-zinc-50/50 text-zinc-950",
      ].join(" ")}
    >
      <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="pb-12 text-center sm:pb-14 lg:pb-16">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              {template.mastheadLabel}
            </p>
            <h2
              className={[
                "mx-auto max-w-4xl text-5xl font-black tracking-tighter md:text-7xl",
                isDarkTheme ? "text-zinc-50" : "text-zinc-950",
              ].join(" ")}
            >
              {template.title}
            </h2>
            <p
              className={[
                "mx-auto max-w-2xl text-sm leading-7 sm:text-base",
                isDarkTheme ? "text-zinc-400" : "text-zinc-500",
              ].join(" ")}
            >
              {template.description}
            </p>
            <p className="text-sm text-zinc-500">{template.photoCountLabel}</p>
          </div>
        </header>

        {template.photos.length > 0 ? (
          <section className="pb-14 sm:pb-16">
            <div className="columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3 lg:columns-4">
              {template.photos.map(renderMasonryPhoto)}
            </div>
          </section>
        ) : (
          <section className="flex min-h-[320px] items-center justify-center pb-12 pt-4 text-center sm:pb-16">
            <div className="max-w-xl space-y-4">
              <h4
                className={[
                  "font-serif text-2xl tracking-[-0.03em] sm:text-3xl",
                  isDarkTheme ? "text-zinc-50" : "text-zinc-950",
                ].join(" ")}
              >
                {template.emptyTitle}
              </h4>
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
        )}
      </div>

      <footer
        className={[
          "bg-transparent px-5 py-10 text-zinc-500 sm:px-8 sm:py-12 lg:px-10",
          isDarkTheme ? "border-t border-white/8" : "border-t border-zinc-950/8",
        ].join(" ")}
      >
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.22em]">
              {template.mastheadLabel}
            </p>
            <p className="text-sm text-zinc-500">
              {template.title}
            </p>
          </div>
          <div className="space-y-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500 sm:text-right">
            <p>{template.photoCountLabel}</p>
            <p>{template.footerNote}</p>
          </div>
        </div>
      </footer>
    </article>
  );
}
