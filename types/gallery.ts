export type GalleryTheme = "light" | "dark";

export type GalleryPhoto = {
  id: string;
  originalName: string;
  fileName: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  title: string;
  description: string;
  takenAt?: string;
  objectUrl: string;
  sourceFile: File;
};

export type GallerySiteMeta = {
  title: string;
  description: string;
  theme: "default" | "showcase";
  galleryTheme: GalleryTheme;
  projectUrl?: string;
};

export type GalleryConfig = GallerySiteMeta;

export type GalleryProject = {
  site: GallerySiteMeta;
  photos: GalleryPhoto[];
};
