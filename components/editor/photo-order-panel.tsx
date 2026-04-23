"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";
import { usePhotoReorderDrag } from "@/lib/drag/use-photo-reorder-drag";
import type { GalleryPhoto } from "@/types/gallery";

type PhotoOrderPanelProps = {
  language: AppLanguage;
  photos: GalleryPhoto[];
  onReorder: (fromIndex: number, toIndex: number) => void;
};

export function PhotoOrderPanel({
  language,
  photos,
  onReorder,
}: PhotoOrderPanelProps) {
  const dictionary = getDictionary(language);
  const copy = dictionary.photoOrder;

  const reorder = usePhotoReorderDrag({
    orderedIds: photos.map((photo) => photo.id),
    onReorder,
  });

  function handleMoveUp(index: number) {
    if (index <= 0) {
      return;
    }

    onReorder(index, index - 1);
  }

  function handleMoveDown(index: number) {
    if (index >= photos.length - 1) {
      return;
    }

    onReorder(index, index + 1);
  }

  return (
    <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          {copy.label}
        </p>
        <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
          {copy.title}
        </h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {copy.description}
        </p>
      </div>

      <ul className="mt-4 grid max-h-[360px] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
        {photos.map((photo, index) => {
          const isActive = reorder.isActive(photo.id);
          const isTarget = reorder.isTarget(photo.id);
          const isLead = index === 0;
          const indexLabel = copy.indexLabel(index + 1);
          const handleProps = reorder.getHandleProps(photo.id);
          const dropProps = reorder.getDropProps(photo.id);

          return (
            <li
              key={photo.id}
              {...handleProps}
              {...dropProps}
              aria-label={indexLabel}
              className={[
                "group relative aspect-square cursor-grab overflow-hidden rounded-xl border transition active:cursor-grabbing",
                isActive ? "opacity-40" : "opacity-100",
                isTarget
                  ? "border-emerald-400 ring-2 ring-emerald-300 dark:border-emerald-400 dark:ring-emerald-500/40"
                  : "border-zinc-200 dark:border-white/10",
              ].join(" ")}
            >
              <Image
                src={photo.objectUrl}
                alt={indexLabel}
                width={photo.width}
                height={photo.height}
                unoptimized
                draggable={false}
                className="pointer-events-none h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute left-1.5 top-1.5 flex items-center gap-1">
                <span className="rounded-full bg-zinc-950/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                  {index + 1}
                </span>
                {isLead ? (
                  <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {copy.leadBadge}
                  </span>
                ) : null}
              </div>

              <div className="absolute bottom-1.5 right-1.5 flex gap-1 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  aria-label={copy.moveUp}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/60"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === photos.length - 1}
                  aria-label={copy.moveDown}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 disabled:opacity-30 disabled:hover:bg-black/60"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
