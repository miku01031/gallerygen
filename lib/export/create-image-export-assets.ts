import type { GalleryBinaryExportAsset } from "@/lib/export/types";
import { slugifyAsciiSegment } from "@/lib/export/file-naming";
import type { GalleryPhoto } from "@/types/gallery";

function getFileNameParts(fileName: string): { name: string; extension: string } {
  const extensionIndex = fileName.lastIndexOf(".");

  if (extensionIndex <= 0) {
    return {
      name: fileName,
      extension: "",
    };
  }

  return {
    name: fileName.slice(0, extensionIndex),
    extension: fileName.slice(extensionIndex + 1),
  };
}

function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    case "image/avif":
      return "avif";
    default:
      return "";
  }
}

function createSafeExtension(value: string): string {
  const normalizedValue = value
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase();

  return normalizedValue.replace(/[^a-z0-9]+/g, "");
}

export function createPhotoExportPathMap(photos: GalleryPhoto[]): Map<string, string> {
  const pathMap = new Map<string, string>();
  const usedPaths = new Map<string, number>();

  photos.forEach((photo) => {
    const { name, extension } = getFileNameParts(photo.fileName);
    const safeBaseName = slugifyAsciiSegment(name, "image");
    const safeExtension = createSafeExtension(
      extension || getExtensionFromMimeType(photo.mimeType),
    );
    const fileExtension = safeExtension ? `.${safeExtension}` : "";
    const basePath = `images/${safeBaseName}${fileExtension}`;
    const currentCount = usedPaths.get(basePath) ?? 0;
    const nextCount = currentCount + 1;

    usedPaths.set(basePath, nextCount);

    const path =
      nextCount === 1
        ? basePath
        : `images/${safeBaseName}-${nextCount}${fileExtension}`;

    pathMap.set(photo.id, path);
  });

  return pathMap;
}

export function createImageExportAssets(photos: GalleryPhoto[]): GalleryBinaryExportAsset[] {
  const exportPathMap = createPhotoExportPathMap(photos);

  return photos.map((photo) => ({
    kind: "binary",
    path: exportPathMap.get(photo.id) ?? `images/${photo.fileName}`,
    contents: photo.sourceFile,
    mimeType: photo.mimeType,
    size: photo.size,
    sourcePhotoId: photo.id,
  }));
}
