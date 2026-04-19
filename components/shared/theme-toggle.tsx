export type ThemePreference = "system" | "light" | "dark";

import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";

type ThemeToggleProps = {
  language: AppLanguage;
  value: ThemePreference;
  onChange: (theme: ThemePreference) => void;
};

const THEME_OPTIONS: ThemePreference[] = ["system", "light", "dark"];

export function ThemeToggle({ language, value, onChange }: ThemeToggleProps) {
  const dictionary = getDictionary(language);
  const labels = {
    system: dictionary.themeToggle.auto,
    light: dictionary.themeToggle.light,
    dark: dictionary.themeToggle.dark,
  } satisfies Record<ThemePreference, string>;

  return (
    <div className="inline-flex rounded-full border border-zinc-200 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
      {THEME_OPTIONS.map((option) => {
        const isActive = option === value;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={[
              "inline-flex min-h-9 items-center justify-center rounded-full px-3 text-xs font-medium transition sm:px-4",
              isActive
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10",
            ].join(" ")}
            aria-pressed={isActive}
          >
            {labels[option]}
          </button>
        );
      })}
    </div>
  );
}
