"use client";

import { useEffect, useMemo, useState } from "react";

import { CheckCircle2, Copy, ExternalLink, PartyPopper, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createSafeZipFileName } from "@/lib/export/file-naming";
import type { AppLanguage } from "@/lib/i18n/dict";
import { getDictionary, getReadmeSnippet } from "@/lib/i18n/dict";

type ExportSuccessModalProps = {
  isOpen: boolean;
  language: AppLanguage;
  onClose: () => void;
  photoCount: number;
  siteTitle: string;
};

export function ExportSuccessModal({
  isOpen,
  language,
  onClose,
  photoCount,
  siteTitle,
}: ExportSuccessModalProps) {
  const [isSnippetCopied, setIsSnippetCopied] = useState(false);
  const zipFileName = useMemo(() => createSafeZipFileName(siteTitle), [siteTitle]);
  const dictionary = getDictionary(language);
  const readmeSnippet = useMemo(() => getReadmeSnippet(language), [language]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isSnippetCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSnippetCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isSnippetCopied]);

  async function handleCopySnippet() {
    try {
      await navigator.clipboard.writeText(readmeSnippet);
      setIsSnippetCopied(true);
    } catch {
      setIsSnippetCopied(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={dictionary.common.close}
        className="absolute inset-0 bg-zinc-950/45 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-success-title"
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,244,245,0.96))] shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.97),rgba(9,9,11,0.96))]"
      >
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(244,244,245,0.9),rgba(244,244,245,0))] dark:bg-[radial-gradient(circle_at_top,rgba(63,63,70,0.45),rgba(24,24,27,0))]" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-500/12 text-emerald-600 shadow-inner shadow-emerald-500/10 dark:bg-emerald-500/15 dark:text-emerald-300">
                <PartyPopper className="h-8 w-8" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {dictionary.exportSuccess.badge}
                </div>
                <h2
                  id="export-success-title"
                  className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
                >
                  {dictionary.exportSuccess.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  {dictionary.exportSuccess.subtitle}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Card className="overflow-hidden">
              <CardHeader>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  {dictionary.exportSuccess.nextSteps}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {dictionary.exportSuccess.deployTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {dictionary.exportSuccess.deployDescription}
                </p>
              </CardHeader>

              <CardContent className="grid gap-4 pt-6">
                <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50/80 p-5 dark:border-white/10 dark:bg-white/6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                      1
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                        {dictionary.exportSuccess.unzipTitle}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {dictionary.exportSuccess.unzipDescription(zipFileName).split(zipFileName)[0]}
                        <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 text-[0.85em] dark:bg-white/10">
                          {zipFileName}
                        </code>
                        {dictionary.exportSuccess.unzipDescription(zipFileName).split(zipFileName)[1]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-50/80 p-5 dark:border-white/10 dark:bg-white/6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
                      2
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                          {dictionary.exportSuccess.deployStepTitle}
                        </h4>
                        <a
                          href="https://app.netlify.com/drop"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-zinc-950 px-3 py-1 text-xs font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                        >
                          Netlify Drop
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                        {dictionary.exportSuccess.deployStepDescription}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        {dictionary.exportSuccess.deployStepHint}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        {dictionary.exportSuccess.deployStepNote}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-zinc-200 bg-white/70 p-5 dark:border-white/10 dark:bg-white/4">
                  <div className="space-y-3">
                    <h4 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                      {dictionary.exportSuccess.githubPagesTitle}
                    </h4>
                    <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                      {dictionary.exportSuccess.githubPagesDescription}
                    </p>
                    <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                      {dictionary.exportSuccess.githubPagesHint}
                    </p>
                    <a
                      href="https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 dark:text-zinc-200 dark:decoration-zinc-700 dark:hover:text-zinc-50"
                    >
                      {dictionary.exportSuccess.githubPagesAction}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  {dictionary.exportSuccess.shareTitle}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                  {dictionary.exportSuccess.shareHeading}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {dictionary.exportSuccess.shareDescription}
                </p>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="rounded-[1.5rem] border border-zinc-200 bg-zinc-950 p-4 shadow-inner dark:border-white/10">
                  <pre className="overflow-x-auto text-sm leading-6 text-zinc-100">
                    <code>{readmeSnippet}</code>
                  </pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {dictionary.exportSuccess.shareHint}
                  </p>

                  <Button type="button" variant="secondary" onClick={handleCopySnippet}>
                    <Copy className="mr-2 h-4 w-4" />
                    {isSnippetCopied ? dictionary.common.copied : dictionary.common.copySnippet}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-zinc-200/80 bg-white/70 px-5 py-4 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {dictionary.exportSuccess.bottomSummary(photoCount)}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                {dictionary.common.continueEditing}
              </Button>
              <a
                href="https://app.netlify.com/drop"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                {dictionary.common.openNetlifyDrop}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
