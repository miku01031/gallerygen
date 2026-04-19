"use client";

import { Languages } from "lucide-react";

import type { AppLanguage } from "@/lib/i18n/dict";

type LanguageToggleProps = {
  label: string;
  value: AppLanguage;
  onChange: (language: AppLanguage) => void;
};

const LANGUAGE_OPTIONS: Array<{ value: AppLanguage; label: string }> = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中" },
];

export function LanguageToggle({ label, value, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white/80 p-1 shadow-sm dark:border-white/10 dark:bg-white/5">
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-300"
      >
        <Languages className="h-4 w-4" />
      </span>

      <div className="inline-flex rounded-full">
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-label={`${label}: ${option.label}`}
              aria-pressed={isActive}
              className={[
                "inline-flex min-h-9 items-center justify-center rounded-full px-3 text-xs font-medium transition sm:px-4",
                isActive
                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
