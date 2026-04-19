import type { GalleryProject } from "@/types/gallery";

export function createEmptyGalleryProject(): GalleryProject {
  return {
    site: {
      title: "My Gallery",
      description: "A clean static gallery generated from local images.",
      theme: "default",
      galleryTheme: "light",
      projectUrl: "",
    },
    photos: [],
  };
}
