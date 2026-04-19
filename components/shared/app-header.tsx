import { HelpPanel } from "@/components/shared/help-panel";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { ThemeToggle, type ThemePreference } from "@/components/shared/theme-toggle";
import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";

type AppHeaderProps = {
  canExport: boolean;
  isExporting: boolean;
  isHelpOpen: boolean;
  language: AppLanguage;
  onExport: () => void;
  onLanguageChange: (language: AppLanguage) => void;
  onThemeChange: (theme: ThemePreference) => void;
  onToggleHelp: () => void;
  themePreference: ThemePreference;
};

export function AppHeader({
  canExport,
  isExporting,
  isHelpOpen,
  language,
  onExport,
  onLanguageChange,
  onThemeChange,
  onToggleHelp,
  themePreference,
}: AppHeaderProps) {
  const dictionary = getDictionary(language);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/75">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-zinc-950">
              GG
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {dictionary.common.appName}
              </p>
              <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                {dictionary.header.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <LanguageToggle
              label={dictionary.header.languageToggleLabel}
              value={language}
              onChange={onLanguageChange}
            />
            <div className="flex items-center gap-2">
              <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {dictionary.header.builderTheme}
              </p>
              <ThemeToggle language={language} value={themePreference} onChange={onThemeChange} />
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={onToggleHelp}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                aria-expanded={isHelpOpen}
              >
                {dictionary.header.help}
              </button>

              {isHelpOpen ? (
                <div className="absolute right-0 top-[calc(100%+0.75rem)]">
                  <HelpPanel language={language} />
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onExport}
              disabled={!canExport || isExporting}
              className={[
                "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition",
                !canExport || isExporting
                  ? "cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-white/10 dark:text-zinc-400"
                  : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
              ].join(" ")}
            >
              {isExporting ? dictionary.header.exporting : dictionary.header.exportZip}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
