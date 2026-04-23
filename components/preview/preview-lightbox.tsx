"use client";

import { useCallback, useEffect, type MouseEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";
import type { GalleryPhoto } from "@/types/gallery";

type PreviewLightboxProps = {
  language: AppLanguage;
  photos: GalleryPhoto[];
  activePhotoId: string | null;
  onClose: () => void;
  onNavigate: (nextPhotoId: string) => void;
};

export function PreviewLightbox({
  language,
  photos,
  activePhotoId,
  onClose,
  onNavigate,
}: PreviewLightboxProps) {
  const dictionary = getDictionary(language);
  const copy = dictionary.previewLightbox;

  const activeIndex = activePhotoId
    ? photos.findIndex((photo) => photo.id === activePhotoId)
    : -1;
  const activePhoto = activeIndex >= 0 ? photos[activeIndex] : null;
  const isOpen = activePhoto !== null;
  const totalPhotos = photos.length;
  const hasMultiplePhotos = totalPhotos > 1;

  const goPrev = useCallback(() => {
    if (!hasMultiplePhotos || activeIndex < 0) {
      return;
    }

    const nextIndex = (activeIndex - 1 + totalPhotos) % totalPhotos;
    onNavigate(photos[nextIndex].id);
  }, [activeIndex, hasMultiplePhotos, onNavigate, photos, totalPhotos]);

  const goNext = useCallback(() => {
    if (!hasMultiplePhotos || activeIndex < 0) {
      return;
    }

    const nextIndex = (activeIndex + 1) % totalPhotos;
    onNavigate(photos[nextIndex].id);
  }, [activeIndex, hasMultiplePhotos, onNavigate, photos, totalPhotos]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [goNext, goPrev, isOpen, onClose]);

  if (!isOpen || !activePhoto) {
    return null;
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const trimmedTitle = activePhoto.title?.trim();
  const indexLabel = `${activeIndex + 1} / ${totalPhotos}`;
  const altLabel = trimmedTitle || activePhoto.originalName;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={copy.ariaLabel}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-sm sm:px-10 sm:py-12"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={copy.close}
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="h-5 w-5" />
      </button>

      {hasMultiplePhotos ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={copy.previous}
            className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={copy.next}
            className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      <figure className="relative flex max-h-full max-w-full flex-col items-center gap-4">
        <Image
          key={activePhoto.id}
          src={activePhoto.objectUrl}
          alt={altLabel}
          width={activePhoto.width}
          height={activePhoto.height}
          unoptimized
          draggable={false}
          className="max-h-[80vh] w-auto max-w-full select-none rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-white/85">
          <span className="text-xs uppercase tracking-[0.22em] text-white/70">
            {indexLabel}
          </span>
          {trimmedTitle ? (
            <>
              <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
              <span className="text-sm font-medium text-white/90">
                {trimmedTitle}
              </span>
            </>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}
