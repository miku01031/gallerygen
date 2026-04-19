import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary } from "@/lib/i18n/dict";

type HelpPanelProps = {
  language: AppLanguage;
};

export function HelpPanel({ language }: HelpPanelProps) {
  const dictionary = getDictionary(language);

  return (
    <div className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-4 text-sm shadow-xl dark:border-white/10 dark:bg-zinc-900">
      <p className="font-medium text-zinc-950 dark:text-zinc-50">{dictionary.helpPanel.title}</p>
      <p className="mt-2 leading-6 text-zinc-600 dark:text-zinc-300">
        {dictionary.helpPanel.description}
      </p>
    </div>
  );
}
