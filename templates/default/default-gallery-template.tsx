import Image from "next/image";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";
import type { GalleryProject } from "@/types/gallery";
import { getDefaultGalleryTemplateData } from "@/templates/default/get-default-gallery-template-data";

type DefaultGalleryTemplateProps = {
  language: AppLanguage;
  project: GalleryProject;
  onRemovePhoto?: (photoId: string) => void;
};

export function DefaultGalleryTemplate({
  language,
  project,
  onRemovePhoto,
}: DefaultGalleryTemplateProps) {
  const dictionary = getDictionary(language);
  const template = getDefaultGalleryTemplateData(project, language);
  const isDarkTheme = template.galleryTheme === "dark";

  function renderMasonryPhoto(photo: (typeof template.photos)[number]) {
    return (
      <figure key={photo.id} className="group mb-6 [break-inside:avoid]">
        <div className="relative">
          <Image
            src={photo.objectUrl}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            unoptimized
            className="h-auto w-full break-inside-avoid rounded-lg object-cover shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
          />

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
