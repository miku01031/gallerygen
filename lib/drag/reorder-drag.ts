export const REORDER_DRAG_MIME_TYPE = "application/x-gallerygen-reorder";

export function dataTransferHasReorderType(
  dataTransfer: DataTransfer | null | undefined,
): boolean {
  if (!dataTransfer) {
    return false;
  }

  return Array.from(dataTransfer.types).includes(REORDER_DRAG_MIME_TYPE);
}
