export function slugifyAsciiSegment(value: string, fallback: string): string {
  const normalizedValue = value
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase();

  const slug = normalizedValue.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  return slug || fallback;
}

export function createSafeZipFileName(siteTitle?: string): string {
  return `${slugifyAsciiSegment(siteTitle ?? "", "gallerygen-export")}.zip`;
}
