"use client";

import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent } from "react";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";

type UploadDropzoneProps = {
  disabled?: boolean;
  language: AppLanguage;
  onSelectFiles: (files: File[]) => void;
};

export function UploadDropzone({
  disabled = false,
  language,
  onSelectFiles,
}: UploadDropzoneProps) {
  const imageInputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const folderInputRef = useRef<HTMLInputElement | null>(null);
  const dictionary = getDictionary(language);

  useEffect(() => {
    const folderInput = folderInputRef.current;

    if (!folderInput) {
      return;
    }

    folderInput.setAttribute("webkitdirectory", "");
    folderInput.setAttribute("directory", "");
  }, []);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || disabled) {
      return;
    }

    onSelectFiles(Array.from(files));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  }

  return (
    <div
      className={[
        "overflow-hidden rounded-[2rem] border border-dashed p-6 shadow-sm transition sm:p-8",
        isDragging
          ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-white/8"
          : "border-zinc-300 bg-white hover:border-zinc-400 hover:bg-zinc-50/80 dark:border-white/12 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/7",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-default",
      ].join(" ")}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id={imageInputId}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
      />

      <div className="flex flex-col gap-6">
        <div className="space-y-4 text-center sm:text-left">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-zinc-950 text-2xl text-white shadow-sm sm:mx-0 dark:bg-white dark:text-zinc-950">
            +
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
              {dictionary.dropzone.eyebrow}
            </p>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              {dictionary.dropzone.title}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
              {dictionary.dropzone.description}
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-dashed border-zinc-300/90 bg-zinc-50/80 px-5 py-6 text-center dark:border-white/12 dark:bg-black/10 sm:px-6 sm:py-8">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            {dictionary.dropzone.dropTitle}
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
            {dictionary.dropzone.dropDescription}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <label
              htmlFor={imageInputId}
              className={[
                "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-medium transition",
                disabled
                  ? "bg-zinc-200 text-zinc-500 dark:bg-white/10 dark:text-zinc-400"
                  : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
              ].join(" ")}
            >
              {dictionary.dropzone.chooseImages}
            </label>

            <button
              type="button"
              onClick={() => folderInputRef.current?.click()}
              disabled={disabled}
              className={[
                "inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-medium transition",
                disabled
                  ? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/12 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10",
              ].join(" ")}
            >
              {dictionary.dropzone.chooseFolder}
            </button>
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            {dictionary.dropzone.uploadOrderHint}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500 sm:justify-start dark:text-zinc-400">
          <span>{dictionary.dropzone.localFirst}</span>
          <span>{dictionary.dropzone.browserProcessing}</span>
          <span>{dictionary.dropzone.zipExport}</span>
        </div>
      </div>
    </div>
  );
}
