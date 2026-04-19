# Minimal Masonry / Portfolio Template Implementation Plan

## Purpose

This document explains how to adapt the provided Stitch reference and exported HTML/CSS into a GalleryGen-compatible **Template B**:

- elegant
- spacious
- image-first
- believable as an automatically generated portfolio site
- compatible with both live preview and static export

This is an inspiration-based translation, not a literal reproduction.

## Reference Reading

The reference is less like a magazine issue and more like a **refined portfolio landing page** with light brand framing:

- a minimal top app bar
- a generous but restrained hero
- a masonry-style image field with quiet captions
- one mid-page image/text anchor block
- a soft, low-contrast footer

Its strongest quality is the balance between:

- elegance
- whitespace
- image prominence
- very restrained text

Compared with the current Monolith-inspired default template, this direction is:

- lighter
- more brand-like
- less dramatic
- more suitable for everyday portfolios and lifestyle/travel collections

## Proposed Section Structure

The Stitch reference can be translated into these reusable GalleryGen sections:

1. Minimal masthead / top bar
2. Spacious portfolio hero
3. Masonry gallery field
4. Mid-page feature anchor block
5. Minimal soft footer

## Section Breakdown

### 1. Minimal Masthead / Top Bar

#### Visual role

This section gives the page a premium frame and a sense of calm product identity. It helps the page feel like a real portfolio website instead of a raw export file.

#### GalleryProject data that could drive it

- `project.site.title`
- static product label such as `GalleryGen`
- optional template label

#### Keep / simplify / remove

- **Keep** the light, quiet brand framing
- **Simplify** navigation into minimal neutral links or a non-interactive framed top bar
- **Remove** complex multi-link brand/marketing navigation that implies a real editorial site structure

#### Automatic-generation suitability

High.

This section is safe because it depends mostly on spacing and typography, not content richness.

### 2. Spacious Portfolio Hero

#### Visual role

The hero introduces the gallery with a calm, refined identity. Unlike the Monolith direction, this hero is still large but less extreme. It feels more like a designer portfolio or travel story landing page.

#### GalleryProject data that could drive it

- `project.site.title`
- `project.site.description`
- `project.photos.length`

#### Keep / simplify / remove

- **Keep** the large title, short descriptive text, and small image-count detail
- **Simplify** the editorial label to something neutral like `Collection` or `Portfolio`
- **Remove** any archive/issue framing or brand-heavy copy

#### Automatic-generation suitability

Very high.

This is one of the safest and strongest sections for auto-generated output because the required data already exists.

### 3. Masonry Gallery Field

#### Visual role

This is the defining section of Template B. The staggered masonry rhythm makes the gallery feel curated and alive without requiring hand-made layout logic for every image.

#### GalleryProject data that could drive it

- `project.photos`
- per-photo title from `photo.title`
- optional quiet location-like / metadata line derived from safe fallbacks if desired

#### Keep / simplify / remove

- **Keep** the staggered image rhythm and quiet captions
- **Simplify** captions so titles remain primary and secondary metadata is optional or very subtle
- **Remove** fake location or time metadata unless it can be derived from real data later

#### Automatic-generation suitability

High.

This is a strong auto-generation pattern because:

- it works with many image counts
- it tolerates mixed image sizes
- it feels more premium than a rigid card grid

But it must be implemented carefully to avoid becoming chaotic.

### 4. Mid-Page Feature Anchor Block

#### Visual role

This section interrupts the masonry flow and creates a quiet editorial pause. It gives the page pacing and prevents it from feeling like an endless wall of images.

#### GalleryProject data that could drive it

- one selected image from later in the photo set
- `project.site.title`
- `project.site.description`
- `project.photos.length`
- optionally a selected photo title

#### Keep / simplify / remove

- **Keep** the image + text pairing and the compositional pause
- **Simplify** the copy into neutral, auto-generated portfolio text
- **Remove** “Read the Story” style CTA language if there is no actual linked story

#### Automatic-generation suitability

Medium to high.

It works well if the text remains short and neutral. It becomes risky only when it starts pretending to be a real editorial essay.

### 5. Minimal Soft Footer

#### Visual role

The footer closes the page gently and keeps the output feeling complete. In this reference, it is lighter and softer than the dark Monolith footer.

#### GalleryProject data that could drive it

- `project.site.title`
- optional copyright line
- lightweight `Built with GalleryGen` note

#### Keep / simplify / remove

- **Keep** the minimalist footer treatment
- **Simplify** footer links or omit them entirely
- **Remove** brand/legal structures that imply a richer site than actually exists

#### Automatic-generation suitability

High.

This section is straightforward and robust for generated sites.

## Elements That Still Feel Too Much Like a Brand / Editorial Landing Page

These elements in the reference feel too hand-authored or brand-specific to carry over directly:

- `Collections / Archives / About` navigation
- burger/menu affordance that implies more site structure than exists
- “Photographic Essay” framing if it is not grounded in real content
- location and time metadata if it cannot be derived honestly
- “Read the Story” CTA
- footer links such as `Privacy`, `Terms`, `Contact`
- phrases like “The Digital Curator”

These create a polished landing page feel, but they overstate what an automatically generated portfolio export really is.

## How To Adapt Them Into Neutral Auto-Generated Content

The best adaptation strategy is:

- Keep the **layout roles**
- Replace the **storytelling claims**

Recommended substitutions:

- top navigation becomes a quiet masthead with product + gallery count
- `Photographic Essay` becomes `Collection`, `Portfolio`, or `Gallery`
- fake location/time metadata becomes optional and omitted by default
- `Read the Story` becomes no CTA at all, or a neutral caption line
- footer links become a minimal footer note only
- brand slogans become `Built with GalleryGen`

## What Should Be Preserved

These are the most valuable parts of the Stitch direction:

- generous whitespace
- lighter, softer typography hierarchy
- masonry rhythm
- image-first page structure
- quiet captions
- refined but understated product framing
- a more lifestyle / portfolio-like mood than the heavier Monolith direction

## What Should Be Simplified

These should remain, but in a safer auto-generated form:

- hero eyebrow label
- small metadata lines
- the mid-page image/text anchor block
- footer identity

All of them should use:

- title
- description
- image count
- photo titles

And not rely on fake editorial storytelling.

## What Should Be Removed

These elements should not carry into Template B:

- faux brand navigation
- archive / essay framing
- CTA links that lead nowhere
- fake location/timestamp metadata
- marketing-style footer links
- any interaction hint that suggests pages or sections that do not exist

## Proposed Template Data Adaptation

The current shared template data layer can be extended without changing app architecture.

Suggested derived data for Template B:

- `mastheadLabel`
- `heroLabel`
- `photoCountLabel`
- `masonryPhotos`
- `anchorPhoto`
- `anchorTitle`
- `anchorSummary`
- `footerNote`

This should remain entirely derived from `GalleryProject`, not stored separately.

## Live Preview Template Plan

### Goal

Create a believable generated portfolio page that feels clean and premium inside the existing builder preview panel.

### Proposed structure

1. quiet masthead
2. spacious hero
3. masonry image field
4. mid-page anchor block
5. minimal footer

### Preview-specific considerations

- image removal controls should remain available but visually quiet
- captions should stay minimal
- filenames should be hidden or heavily de-emphasized
- the masonry layout should remain robust with arbitrary images

## Static Export Renderer Plan

### Goal

Keep exported HTML simple and readable while matching the live preview structure.

### Proposed HTML structure

- `header.site-masthead`
- `section.hero`
- `section.masonry-gallery`
- `section.feature-anchor`
- `footer.site-footer`

### Rendering strategy

- hero uses `site.title`, `site.description`, and photo count
- masonry field uses most uploaded images
- one later image becomes the mid-page anchor image
- anchor text uses title + neutral supporting summary
- omit anchor block entirely when too few images are available

## Exported CSS Structure Plan

### Goal

Produce a maintainable static CSS file that captures the reference mood without depending on CDN fonts, JS, or fragile one-off rules.

### Suggested CSS groups

- root tokens
  - palette
  - spacing
  - typography sizes
  - border radius
- page shell
- masthead
- hero
- masonry layout
- captions
- feature anchor
- footer
- responsive rules

### Masonry strategy

The reference uses CSS columns. That approach is viable for exported output and can also be approximated in the live preview.

Recommended approach:

- exported HTML/CSS:
  - use CSS columns for the masonry field
- live preview:
  - use either CSS columns or a stable responsive grid that approximates masonry visually

If exact parity becomes too fragile, prefer:

- exported output as the “true” masonry layout
- preview as a close visual approximation rather than forcing perfect match

## Biggest Implementation Risks

1. Over-branding the generated output
   - If Template B keeps too much landing-page language, it will feel fake for ordinary user galleries.

2. Masonry instability with arbitrary image sets
   - Mixed aspect ratios can create awkward gaps or weak pacing if not tuned carefully.

3. Preview/export mismatch
   - Masonry behavior in React preview may not perfectly match exported CSS columns.

4. Too much decorative metadata
   - Adding faux location/time details would immediately reduce credibility.

## Recommended Implementation Principle

Template B should aim for:

**soft premium portfolio mood, minimal claims, maximum auto-generation credibility.**

That means:

- preserve the spaciousness
- preserve the masonry rhythm
- preserve quiet elegance
- remove fake editorial storytelling

## Recommended Build Order

1. Extend the shared template data for Template B
2. Build the live preview masthead + hero
3. Build the masonry gallery field
4. Add the mid-page feature anchor
5. Add the soft footer
6. Tune responsive spacing and caption density
7. Test with:
   - 3 images
   - 6 images
   - 12 images
   - mixed portrait/landscape sets

This should yield a Template B that feels elegant and premium, while still believable as an automatically generated portfolio export from `GalleryProject`.
