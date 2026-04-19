"use client";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";
import type { GallerySiteMeta } from "@/types/gallery";

type SiteMetaEditorProps = {
  language: AppLanguage;
  site: GallerySiteMeta;
  onChange: (site: GallerySiteMeta) => void;
};

export function SiteMetaEditor({ language, site, onChange }: SiteMetaEditorProps) {
  const dictionary = getDictionary(language);
  const templateOptions: Array<{
    value: GallerySiteMeta["theme"];
    label: string;
  }> = [
    {
      value: "default",
      label: dictionary.siteMeta.editorial,
    },
    {
      value: "showcase",
      label: dictionary.siteMeta.showcase,
    },
  ];
  const galleryThemeOptions: Array<{
    value: GallerySiteMeta["galleryTheme"];
    label: string;
  }> = [
    {
      value: "light",
      label: dictionary.themeToggle.light,
    },
    {
      value: "dark",
      label: dictionary.themeToggle.dark,
    },
  ];

  function updateField<K extends keyof GallerySiteMeta>(
    key: K,
    value: GallerySiteMeta[K],
  ) {
    onChange({
      ...site,
      [key]: value,
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
          {dictionary.siteMeta.label}
        </p>
        <h2 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
          {dictionary.siteMeta.title}
        </h2>
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {dictionary.siteMeta.description}
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {dictionary.siteMeta.template}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              {dictionary.siteMeta.active}
            </span>
          </div>

          <div className="inline-flex w-full rounded-2xl border border-zinc-300 bg-zinc-50 p-1 dark:border-white/12 dark:bg-zinc-950/50">
            {templateOptions.map((option) => {
              const isActive = site.theme === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("theme", option.value)}
                  className={[
                    "flex-1 rounded-[1rem] px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-zinc-50"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {dictionary.siteMeta.templateDescription}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {dictionary.siteMeta.galleryTheme}
            </span>
          </div>

          <div className="inline-flex w-full rounded-2xl border border-zinc-300 bg-zinc-50 p-1 dark:border-white/12 dark:bg-zinc-950/50">
            {galleryThemeOptions.map((option) => {
              const isActive = site.galleryTheme === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("galleryTheme", option.value)}
                  className={[
                    "flex-1 rounded-[1rem] px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "bg-white text-zinc-950 shadow-sm dark:bg-white/10 dark:text-zinc-50"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {dictionary.siteMeta.galleryThemeDescription}
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {dictionary.siteMeta.galleryTitle}
          </span>
          <input
            type="text"
            value={site.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="min-h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-white/12 dark:bg-zinc-950/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
            placeholder={dictionary.siteMeta.galleryTitlePlaceholder}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {dictionary.siteMeta.galleryDescription}
          </span>
          <textarea
            value={site.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-white/12 dark:bg-zinc-950/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
            placeholder={dictionary.siteMeta.galleryDescriptionPlaceholder}
          />
        </label>

        {site.theme === "showcase" ? (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {dictionary.siteMeta.projectUrl}
            </span>
            <input
              type="url"
              value={site.projectUrl ?? ""}
              onChange={(event) => updateField("projectUrl", event.target.value)}
              className="min-h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-white/12 dark:bg-zinc-950/50 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
              placeholder={dictionary.siteMeta.projectUrlPlaceholder}
            />
            <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {dictionary.siteMeta.projectUrlHelp}
            </p>
          </label>
        ) : null}
      </div>
    </section>
  );
}
