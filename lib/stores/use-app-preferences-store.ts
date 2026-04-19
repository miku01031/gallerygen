"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AppLanguage } from "@/lib/i18n/dict";

type AppPreferencesState = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
};

export const useAppPreferencesStore = create<AppPreferencesState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "gallerygen-app-preferences",
    },
  ),
);
