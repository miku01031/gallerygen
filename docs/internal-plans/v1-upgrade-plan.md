# GalleryGen v1 Upgrade Plan

## Current State Summary

GalleryGen already has a solid MVP foundation for a frontend-only gallery generator:

- Multi-image import via file picker
- Drag-and-drop upload for files
- Non-image filtering
- Local preview generation with object URLs
- Shared `GalleryProject` state
- Basic site metadata editing
- One live template preview
- Static export bundle generation
- ZIP download in the browser

The current architecture is also directionally correct for a larger product:

- `GalleryProject` is already the shared source of truth
- Preview rendering and static export rendering are separated
- Export assets already support text and binary outputs
- Image asset export paths are already deterministic

The main gap is not architectural viability. The gap is product depth, interaction quality, and completeness relative to the v1 target.

## Gap Analysis

### Already Implemented

- Pure frontend, browser-side workflow
- Offline-friendly local file processing model
- Multi-image import
- Drag-and-drop upload for images
- Shared project schema for preview and export
- Basic title and description editing
- Real gallery-style live preview instead of a raw file list
- Static HTML/CSS export generation
- Binary image asset export
- Browser-side ZIP packaging and download

### Partially Implemented

- Responsive gallery preview
  - Present, but only one template and limited interactions
- Exportable static site
  - Present, but bundle structure is simpler than the target
- Product-like homepage
  - Present, but still closer to a launchable MVP than a frictionless v1 experience
- Template system
  - Present structurally, but only a single `default` theme exists
- Metadata editing
  - Present globally, but not yet per-image or bulk-edit capable
- Privacy-first browser workflow
  - Functionally true, but not yet reinforced with richer UX or offline/PWA affordances

### Missing

- Folder selection
- Folder drag-and-drop handling
- File System Access API integration
- Theme toggle and help affordance in the top navigation
- Export button in a global product nav
- Processing progress UI
- Per-image editing for title and description
- Image reordering
- Lightbox viewer
- Zoom / rotate / keyboard navigation
- Single-image download
- EXIF reading and display
- Image compression controls
- Multiple gallery templates
- Template switching UI
- Global intro/footer/copyright editing
- Export options modal or panel
- Export structure with `assets/css`, `assets/js`, `gallery.json`, and export README
- Lazy-loading strategy for exported galleries
- Responsive image generation / `srcset`
- PWA setup and true offline-capable app shell
- Dark/light theming support at the product level

### Should Be Redesigned Rather Than Simply Extended

- `app/page.tsx`
  - It is currently the orchestration layer, but it will become too dense for a true editor workspace. It should evolve into a shell that composes focused panels and workspace sections.
- `GalleryPhoto`
  - It works for the MVP, but v1 likely needs richer per-image editing, ordering, processing status, metadata, and export variants. The shape should be expanded carefully rather than patched ad hoc.
- `GallerySiteMeta.theme`
  - It is currently fixed to `"default"`. That should become a real template/theme selection model.
- Export output structure
  - The current `index.html` + `styles.css` + `images/...` structure is good for MVP validation, but should be redesigned into a cleaner deployable folder layout before v1.
- Template data model
  - The current default template data layer is good, but once multiple templates, lightbox behavior, and richer metadata arrive, the shared rendering input will need broader structure and conventions.

## What To Preserve From The Current MVP

- `GalleryProject` as the central source of truth
- Separation between upload pipeline, preview template rendering, and export rendering
- Deterministic export asset generation
- Browser-side ZIP workflow
- The current incremental, pure-function-heavy approach in `lib/`
- The current single-template path as the reference implementation for future templates

## What Should Be Replaced

- The current homepage composition as the long-term editor experience
- The fixed `"default"` theme literal model
- The simple export folder shape
- The current single-panel metadata editing approach once per-image editing arrives
- The current ad hoc MVP debug/export status block once user-facing export UX is introduced

## What Should Wait Until After Public Launch

- Slideshow mode
- Viewed markers
- Advanced hover states beyond the current portfolio polish
- More than 2-3 strong templates
- Deep EXIF UI
- Advanced SEO generation beyond a lightweight baseline
- More ambitious large-batch performance work beyond the first practical optimization pass

## Phase 1: Homepage / First Impression

### User-Facing Goal

Make the first screen feel frictionless and product-grade: clear drop target, stronger visual trust, visible primary actions, and a polished app shell that immediately communicates “drop photos here and export a gallery.”

### Scope

- Add a real top navigation bar
- Add dark/light theme support driven by system preference with manual toggle
- Make the dropzone the dominant action area
- Add separate `Choose Images` and `Choose Folder` actions
- Introduce a cleaner product shell and information hierarchy
- Keep current live preview, but make the layout feel more like “builder + preview” and less like stacked utility cards

### Files Likely Affected

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/uploader/upload-dropzone.tsx`
- likely new files under `components/shared/`
- likely new files under `components/editor/`
- `types/gallery.ts`

### Implementation Risk

Medium.

This phase touches the most visible surface area, but should not require major data-model changes if kept focused on shell, navigation, and upload entry points.

### Build Strategy

Build incrementally.

Preserve current functionality and progressively reorganize `app/page.tsx` into smaller presentational sections. Avoid rewriting the upload pipeline at the same time.

## Phase 2: Editor Workspace / Interaction Model

### User-Facing Goal

Upgrade the app from “single-page demo-like workflow” into a real editor workspace where users can manage images, edit metadata, reorder content, and preview results without friction.

### Scope

- Split the experience into clearer workspace regions:
  - ingest panel
  - image list / image inspector
  - site settings
  - live preview
- Add per-image title and description editing
- Add drag-and-drop image reordering
- Add processing progress states
- Add folder import support
- Add File System Access API support where available
- Prepare the workspace for lightbox and per-image interactions

### Files Likely Affected

- `app/page.tsx`
- `components/editor/site-meta-editor.tsx`
- `components/uploader/upload-dropzone.tsx`
- likely new files:
  - `components/editor/photo-list-editor.tsx`
  - `components/editor/photo-item-editor.tsx`
  - `components/editor/workspace-shell.tsx`
  - `components/shared/top-nav.tsx`
- `lib/image/normalize-gallery-files.ts`
- likely new file(s) under `lib/image/` for folder ingestion and processing progress
- `types/gallery.ts`

### Implementation Risk

High.

This phase introduces the first major interaction-model expansion and will push the current state shape beyond simple append/remove operations.

### Build Strategy

Incremental, with selective refactoring.

Preserve `GalleryProject`, but refactor state helpers and editor composition once per-image editing and ordering are introduced. Do not try to add lightbox, compression, and EXIF in the same pass.

## Phase 3: Template And Export Visual Quality

### User-Facing Goal

Make GalleryGen produce galleries that feel genuinely launch-worthy and deploy-ready, with better template choice, stronger output quality, and a cleaner export package.

### Scope

- Expand the template model from one fixed theme to a real template selector
- Add at least one more strong template direction
- Improve exported site structure toward:
  - `assets/images`
  - `assets/css`
  - `assets/js`
  - `gallery.json`
  - lightweight export `README`
- Add a stronger export options step
- Add a minimal JS runtime for exported interactions if needed
- Improve responsiveness and perceived polish in the exported galleries
- Prepare lazy loading and a future lightbox path in exported output

### Files Likely Affected

- `templates/gallery-template-preview.tsx`
- `templates/default/*`
- likely new template folders under `templates/`
- `lib/export/types.ts`
- `lib/export/build-gallery-export-assets.ts`
- `lib/export/create-image-export-assets.ts`
- `lib/export/download-gallery-zip.ts`
- likely new files under `lib/export/` for gallery manifest and export structure
- `types/gallery.ts`

### Implementation Risk

Medium to high.

The architecture already supports this direction, but export structure changes must be handled carefully to avoid breaking current preview/export alignment.

### Build Strategy

Refactor directly where export structure is concerned, incremental where template additions are concerned.

The current bundle shape is a useful MVP scaffold, but the final v1 package structure should be intentionally redesigned instead of endlessly patched.

## Phase 4: Advanced Product Features

### User-Facing Goal

Deliver the “high-end, beginner-proof gallery generator” experience with browser-side optimization, richer viewing interactions, better metadata handling, and stronger output quality for real-world use.

### Scope

- Browser-side image compression
- Quality presets
- EXIF parsing
- Optional EXIF display
- Full-screen lightbox
- Keyboard navigation
- Zoom and rotate
- Single-image download
- Better responsive image handling
- PWA install/offline support
- SEO options such as lightweight meta tags and optional sitemap
- Better performance strategies for roughly 200 images

### Files Likely Affected

- `types/gallery.ts`
- `lib/image/*`
- `lib/export/*`
- `templates/*`
- `app/layout.tsx`
- likely new files under:
  - `components/gallery/`
  - `components/editor/`
  - `components/shared/`
  - `lib/storage/`

### Implementation Risk

High.

This phase introduces the most moving parts, the highest performance risk, and the greatest chance of muddying the clean MVP if done too early.

### Build Strategy

Incremental, feature-cluster by feature-cluster.

Do compression, EXIF, lightbox, and PWA support as separate tracks. Do not combine all advanced features into one release branch.

## Recommended Sequence Across Phases

1. Strengthen the homepage shell and upload affordances
2. Turn the page into a real editor workspace
3. Improve template/export quality and package structure
4. Layer in optimization, metadata, lightbox, and PWA features

This sequence preserves the current architecture instead of discarding it:

- `GalleryProject` remains the backbone
- Templates continue to consume shared normalized data
- Export remains a pure bundle-building pipeline
- ZIP export remains a final delivery step, not a new architecture

## Best Next Implementation Step

The highest-impact, lowest-risk next step is:

**Introduce a real product shell for the homepage with a top navigation bar, dark/light theming, stronger primary upload actions, and a cleaner builder/preview layout.**

Why this is the best next step:

- It immediately upgrades first impression and launch quality
- It aligns directly with the v1 target without forcing major data-model changes
- It preserves the current MVP architecture
- It improves screenshots, demo quality, and perceived product maturity
- It creates the right visual foundation before adding more complex editor behaviors

If executed well, this step will make the project feel significantly closer to a real v1 product while keeping implementation risk relatively low.
