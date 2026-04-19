"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createEmptyGalleryProject } from "@/lib/utils/create-empty-gallery-project";
import type { GalleryConfig } from "@/types/gallery";

type GalleryConfigState = {
  config: GalleryConfig;
  setConfig: (config: GalleryConfig) => void;
  updateConfig: (partial: Partial<GalleryConfig>) => void;
};

const defaultConfig = createEmptyGalleryProject().site;

function normalizeGalleryConfig(
  config?: Partial<GalleryConfig> & Record<string, unknown>,
): GalleryConfig {
  return {
    title: config?.title ?? defaultConfig.title,
    description: config?.description ?? defaultConfig.description,
    theme: config?.theme ?? defaultConfig.theme,
    galleryTheme: config?.galleryTheme ?? defaultConfig.galleryTheme,
    projectUrl: config?.projectUrl ?? defaultConfig.projectUrl,
  };
}

export const useGalleryConfigStore = create<GalleryConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setConfig: (config) => set({ config: normalizeGalleryConfig(config) }),
      updateConfig: (partial) =>
        set((state) => ({
          config: normalizeGalleryConfig({
            ...state.config,
            ...partial,
          }),
        })),
    }),
    {
      name: "gallerygen-gallery-config",
      merge: (persistedState, currentState) => {
        const typedState = persistedState as Partial<GalleryConfigState> | undefined;

        return {
          ...currentState,
          ...typedState,
          config: normalizeGalleryConfig(typedState?.config),
        };
      },
    },
  ),
);
