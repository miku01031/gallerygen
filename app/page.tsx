"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";

import { SiteMetaEditor } from "@/components/editor/site-meta-editor";
import { ExportSuccessModal } from "@/components/export/export-success-modal";
import { AppHeader } from "@/components/shared/app-header";
import type { ThemePreference } from "@/components/shared/theme-toggle";
import { downloadGalleryZip } from "@/lib/export/download-gallery-zip";
import { UploadDropzone } from "@/components/uploader/upload-dropzone";
import { buildGalleryExportAssets } from "@/lib/export/build-gallery-export-assets";
import { getDictionary } from "@/lib/i18n/dict";
import type {
  GalleryBinaryExportAsset,
  GalleryExportAsset,
  GalleryTextExportAsset,
} from "@/lib/export/types";
import { normalizeGalleryFiles } from "@/lib/image/normalize-gallery-files";
import { useAppPreferencesStore } from "@/lib/stores/use-app-preferences-store";
import { useGalleryConfigStore } from "@/lib/stores/use-gallery-config-store";
import { createEmptyGalleryProject } from "@/lib/utils/create-empty-gallery-project";
import { GalleryTemplatePreview } from "@/templates/gallery-template-preview";
import type { GalleryPhoto, GalleryProject } from "@/types/gallery";

const THEME_STORAGE_KEY = "gallerygen-theme";

function getTemplateLabel(theme: GalleryProject["site"]["theme"]): string {
  switch (theme) {
    case "showcase":
      return "showcase";
    case "default":
    default:
      return "editorial";
  }
}

function isTextAsset(asset: GalleryExportAsset): asset is GalleryTextExportAsset {
  return asset.kind === "text";
}

function isBinaryAsset(asset: GalleryExportAsset): asset is GalleryBinaryExportAsset {
  return asset.kind === "binary";
}

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function hasDraggedFiles(event: DragEvent<HTMLDivElement>): boolean {
  return Array.from(event.dataTransfer.types).includes("Files");
}

export default function Home() {
  const language = useAppPreferencesStore((state) => state.language);
  const setLanguage = useAppPreferencesStore((state) => state.setLanguage);
  const config = useGalleryConfigStore((state) => state.config);
  const setConfig = useGalleryConfigStore((state) => state.setConfig);
  const dictionary = getDictionary(language);
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => createEmptyGalleryProject().photos);
  const [errorMessage, setErrorMessage] = useState("");
  const [exportErrorMessage, setExportErrorMessage] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isExportSuccessOpen, setIsExportSuccessOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isPageDragging, setIsPageDragging] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>("system");
  const activePhotoUrlsRef = useRef(new Set<string>());
  const dragDepthRef = useRef(0);
  const project = useMemo<GalleryProject>(
    () => ({
      site: config,
      photos,
    }),
    [config, photos],
  );
  const exportBundle = useMemo(() => buildGalleryExportAssets(project, language), [language, project]);
  const textAssets = exportBundle.assets.filter(isTextAsset);
  const imageAssets = exportBundle.assets.filter(isBinaryAsset);
  const htmlAsset = textAssets.find((asset) => asset.path === "index.html");
  const cssAsset = textAssets.find((asset) => asset.path === "styles.css");
  const canExport = project.photos.length > 0;
  const activeTemplateLabel =
    getTemplateLabel(project.site.theme) === "showcase"
      ? dictionary.siteMeta.showcase
      : dictionary.siteMeta.editorial;

  useEffect(() => {
    const activePhotoUrls = activePhotoUrlsRef.current;

    return () => {
      activePhotoUrls.forEach((objectUrl) => {
        URL.revokeObjectURL(objectUrl);
      });
      activePhotoUrls.clear();
    };
  }, []);

  useEffect(() => {
    const storedThemePreference = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (isThemePreference(storedThemePreference)) {
      setThemePreference(storedThemePreference);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const root = document.documentElement;

    const applyTheme = () => {
      const shouldUseDarkTheme =
        themePreference === "dark" || (themePreference === "system" && mediaQuery.matches);

      root.classList.toggle("dark", shouldUseDarkTheme);
      root.style.colorScheme = shouldUseDarkTheme ? "dark" : "light";
    };

    applyTheme();
    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);

    const handleChange = () => {
      if (themePreference === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themePreference]);

  async function handleSelectFiles(files: File[]) {
    const { photos: nextPhotos, rejectedFiles } = await normalizeGalleryFiles(files);

    if (rejectedFiles.length > 0) {
      setErrorMessage(
        language === "zh"
          ? `已忽略 ${rejectedFiles.length} 个不受支持的文件，请选择图片文件。`
          : `Ignored ${rejectedFiles.length} unsupported file(s). Please choose image files.`,
      );
    } else {
      setErrorMessage("");
    }

    if (nextPhotos.length === 0) {
      return;
    }

    nextPhotos.forEach((photo) => {
      activePhotoUrlsRef.current.add(photo.objectUrl);
    });

    setPhotos((currentPhotos) => [...currentPhotos, ...nextPhotos]);
  }

  function handleRemovePhoto(photoId: string) {
    setPhotos((currentPhotos) => {
      const targetPhoto = currentPhotos.find((photo) => photo.id === photoId);

      if (targetPhoto) {
        URL.revokeObjectURL(targetPhoto.objectUrl);
        activePhotoUrlsRef.current.delete(targetPhoto.objectUrl);
      }

      return currentPhotos.filter((photo) => photo.id !== photoId);
    });
  }

  async function handleExportZip() {
    if (!canExport) {
      return;
    }

    setIsExporting(true);
    setExportErrorMessage("");

    try {
      await downloadGalleryZip(exportBundle, project.site.title);
      setIsExportSuccessOpen(true);
    } catch {
      setExportErrorMessage(
        language === "zh"
          ? "导出 ZIP 失败，请稍后重试。"
          : "ZIP export failed. Please try again.",
      );
    } finally {
      setIsExporting(false);
    }
  }

  function handlePageDragEnter(event: DragEvent<HTMLDivElement>) {
    if (!hasDraggedFiles(event)) {
      return;
    }

    event.preventDefault();
    dragDepthRef.current += 1;
    setIsPageDragging(true);
  }

  function handlePageDragOver(event: DragEvent<HTMLDivElement>) {
    if (!hasDraggedFiles(event)) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsPageDragging(true);
  }

  function handlePageDragLeave(event: DragEvent<HTMLDivElement>) {
    if (!hasDraggedFiles(event)) {
      return;
    }

    event.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);

    if (dragDepthRef.current === 0) {
      setIsPageDragging(false);
    }
  }

  function handlePageDrop(event: DragEvent<HTMLDivElement>) {
    if (!hasDraggedFiles(event)) {
      return;
    }

    event.preventDefault();
    dragDepthRef.current = 0;
    setIsPageDragging(false);

    void handleSelectFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <div
      className="relative min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#f4f4f5_52%,#ededf0_100%)] text-zinc-950 dark:bg-[radial-gradient(circle_at_top,#1f2937_0%,#09090b_48%,#020617_100%)] dark:text-zinc-50"
      onDragEnter={handlePageDragEnter}
      onDragOver={handlePageDragOver}
      onDragLeave={handlePageDragLeave}
      onDrop={handlePageDrop}
    >
      {isPageDragging ? (
        <div className="pointer-events-none fixed inset-4 z-50 flex items-center justify-center rounded-[2rem] border-2 border-dashed border-zinc-900/80 bg-white/88 p-6 backdrop-blur-sm dark:border-zinc-100/80 dark:bg-zinc-950/82">
          <div className="max-w-xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
              {dictionary.pageDrag.badge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {dictionary.pageDrag.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
              {dictionary.pageDrag.description}
            </p>
          </div>
        </div>
      ) : null}

      <AppHeader
        canExport={canExport}
        isExporting={isExporting}
        isHelpOpen={isHelpOpen}
        language={language}
        onExport={handleExportZip}
        onLanguageChange={setLanguage}
        onThemeChange={setThemePreference}
        onToggleHelp={() => setIsHelpOpen((currentValue) => !currentValue)}
        themePreference={themePreference}
      />

      <ExportSuccessModal
        isOpen={isExportSuccessOpen}
        language={language}
        onClose={() => setIsExportSuccessOpen(false)}
        photoCount={project.photos.length}
        siteTitle={project.site.title}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,390px)_minmax(0,1fr)] xl:items-start">
          <aside className="space-y-4">
            <UploadDropzone language={language} onSelectFiles={handleSelectFiles} />

            <SiteMetaEditor
              language={language}
              site={config}
              onChange={setConfig}
            />

            <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                    {dictionary.status.label}
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-zinc-950 dark:text-zinc-50">
                    {dictionary.status.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {project.photos.length > 0
                      ? dictionary.status.readyDescription
                      : dictionary.status.emptyDescription}
                  </p>
                </div>
                <span
                  className={[
                    "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                    canExport
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                      : "bg-zinc-100 text-zinc-600 dark:bg-white/8 dark:text-zinc-300",
                  ].join(" ")}
                >
                  {canExport ? dictionary.common.exportReady : dictionary.common.waitingForPhotos}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-zinc-600 sm:grid-cols-3 dark:text-zinc-300">
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.status.photos}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {project.photos.length}
                  </dd>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.status.template}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {activeTemplateLabel}
                  </dd>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.status.export}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {canExport ? dictionary.common.ready : dictionary.common.disabled}
                  </dd>
                </div>
              </dl>

              {errorMessage ? (
                <p className="mt-4 rounded-2xl bg-amber-50 px-3 py-2 text-sm text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                  {errorMessage}
                </p>
              ) : null}

              {exportErrorMessage ? (
                <p className="mt-3 rounded-2xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/15 dark:text-red-300">
                  {exportErrorMessage}
                </p>
              ) : null}
            </section>
          </aside>

          <section className="space-y-4">
            <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                    {dictionary.livePreview.label}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {dictionary.livePreview.title}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    {dictionary.livePreview.description(activeTemplateLabel)}
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-white/8 dark:text-zinc-300">
                  {canExport
                    ? dictionary.livePreview.activeTemplate(activeTemplateLabel)
                    : dictionary.livePreview.readyForUpload}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-zinc-600 sm:grid-cols-2 xl:grid-cols-4 dark:text-zinc-300">
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.livePreview.totalAssets}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {exportBundle.assets.length}
                  </dd>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.livePreview.imageAssets}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {imageAssets.length}
                  </dd>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.livePreview.htmlLength}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {htmlAsset?.contents.length ?? 0}
                  </dd>
                </div>
                <div className="rounded-2xl bg-zinc-50 px-3 py-3 dark:bg-white/6">
                  <dt className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {dictionary.livePreview.cssLength}
                  </dt>
                  <dd className="mt-1 font-medium text-zinc-900 dark:text-zinc-50">
                    {cssAsset?.contents.length ?? 0}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[2rem] border border-zinc-200/80 bg-white/70 p-2 shadow-sm dark:border-white/10 dark:bg-white/5">
              <GalleryTemplatePreview
                language={language}
                project={project}
                onRemovePhoto={handleRemovePhoto}
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
