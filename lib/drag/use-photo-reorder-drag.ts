"use client";

import { useState, type DragEvent } from "react";

import {
  REORDER_DRAG_MIME_TYPE,
  dataTransferHasReorderType,
} from "./reorder-drag";

type ReorderDragOptions = {
  orderedIds: string[];
  onReorder: (fromIndex: number, toIndex: number) => void;
};

type HandleProps = {
  draggable: true;
  onDragStart: (event: DragEvent<HTMLElement>) => void;
  onDragEnd: (event: DragEvent<HTMLElement>) => void;
};

type DropProps = {
  onDragEnter: (event: DragEvent<HTMLElement>) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: (event: DragEvent<HTMLElement>) => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
};

export type PhotoReorderDrag = {
  getHandleProps: (photoId: string) => HandleProps;
  getDropProps: (photoId: string) => DropProps;
  activeId: string | null;
  overId: string | null;
  isActive: (photoId: string) => boolean;
  isTarget: (photoId: string) => boolean;
};

export function usePhotoReorderDrag({
  orderedIds,
  onReorder,
}: ReorderDragOptions): PhotoReorderDrag {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  function getHandleProps(photoId: string): HandleProps {
    return {
      draggable: true,
      onDragStart: (event) => {
        event.stopPropagation();
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData(REORDER_DRAG_MIME_TYPE, photoId);
        event.dataTransfer.setData("text/plain", photoId);
        setActiveId(photoId);
      },
      onDragEnd: () => {
        setActiveId(null);
        setOverId(null);
      },
    };
  }

  function getDropProps(photoId: string): DropProps {
    return {
      onDragEnter: (event) => {
        if (!dataTransferHasReorderType(event.dataTransfer)) {
          return;
        }

        event.stopPropagation();
        setOverId(photoId);
      },
      onDragOver: (event) => {
        if (!dataTransferHasReorderType(event.dataTransfer)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "move";
      },
      onDragLeave: (event) => {
        if (!dataTransferHasReorderType(event.dataTransfer)) {
          return;
        }

        setOverId((current) => (current === photoId ? null : current));
      },
      onDrop: (event) => {
        if (!dataTransferHasReorderType(event.dataTransfer)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const fromId =
          event.dataTransfer.getData(REORDER_DRAG_MIME_TYPE) ||
          event.dataTransfer.getData("text/plain");

        setActiveId(null);
        setOverId(null);

        if (!fromId || fromId === photoId) {
          return;
        }

        const fromIndex = orderedIds.indexOf(fromId);
        const toIndex = orderedIds.indexOf(photoId);

        if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
          return;
        }

        onReorder(fromIndex, toIndex);
      },
    };
  }

  return {
    getHandleProps,
    getDropProps,
    activeId,
    overId,
    isActive: (photoId) => activeId === photoId,
    isTarget: (photoId) =>
      overId === photoId && activeId !== null && activeId !== photoId,
  };
}
