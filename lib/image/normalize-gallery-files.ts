import type { GalleryPhoto } from "@/types/gallery";

const IMAGE_MIME_PREFIX = "image/";

export type NormalizeGalleryFilesResult = {
  photos: GalleryPhoto[];
  rejectedFiles: File[];
};

export function isSupportedImageFile(file: File): boolean {
  return file.type.startsWith(IMAGE_MIME_PREFIX);
}

function createPhotoTitle(fileName: string): string {
  const extensionIndex = fileName.lastIndexOf(".");
  const nameWithoutExtension =
    extensionIndex > 0 ? fileName.slice(0, extensionIndex) : fileName;

  return nameWithoutExtension.replace(/[-_]+/g, " ").trim();
}

function loadImageDimensions(objectUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.onerror = () => {
      reject(new Error("Unable to read image dimensions."));
    };

    image.src = objectUrl;
  });
}

export async function normalizeGalleryFiles(
  files: File[],
): Promise<NormalizeGalleryFilesResult> {
  const results = await Promise.all(
    files.map(async (file) => {
      if (!isSupportedImageFile(file)) {
        return {
          kind: "rejected" as const,
          file,
        };
      }

      const objectUrl = URL.createObjectURL(file);

      try {
        const { width, height } = await loadImageDimensions(objectUrl);

        return {
          kind: "photo" as const,
          photo: {
            id: crypto.randomUUID(),
            originalName: file.name,
            fileName: file.name,
            width,
            height,
            size: file.size,
            mimeType: file.type,
            title: createPhotoTitle(file.name),
            description: "",
            objectUrl,
            sourceFile: file,
          } satisfies GalleryPhoto,
        };
      } catch {
        URL.revokeObjectURL(objectUrl);

        return {
          kind: "rejected" as const,
          file,
        };
      }
    }),
  );

  return results.reduce<NormalizeGalleryFilesResult>(
    (accumulator, result) => {
      if (result.kind === "photo") {
        accumulator.photos.push(result.photo);
      } else {
        accumulator.rejectedFiles.push(result.file);
      }

      return accumulator;
    },
    {
      photos: [],
      rejectedFiles: [],
    },
  );
}
