import JSZip from "jszip";

import { createSafeZipFileName } from "@/lib/export/file-naming";
import type { GalleryExportBundle } from "@/lib/export/types";

export async function downloadGalleryZip(
  bundle: GalleryExportBundle,
  siteTitle?: string,
): Promise<void> {
  const zip = new JSZip();

  bundle.assets.forEach((asset) => {
    if (asset.kind === "text") {
      zip.file(asset.path, asset.contents);
      return;
    }

    zip.file(asset.path, asset.contents);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const downloadUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = createSafeZipFileName(siteTitle);
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
}
