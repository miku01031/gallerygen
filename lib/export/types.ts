export type GalleryTextExportAsset = {
  kind: "text";
  path: string;
  contents: string;
  mimeType: "text/html" | "text/css";
};

export type GalleryBinaryExportAsset = {
  kind: "binary";
  path: string;
  contents: Blob;
  mimeType: string;
  size: number;
  sourcePhotoId: string;
};

export type GalleryExportAsset = GalleryTextExportAsset | GalleryBinaryExportAsset;

export type GalleryExportBundle = {
  assets: GalleryExportAsset[];
};
