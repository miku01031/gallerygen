# Monolith-Inspired Template Implementation Plan

## Purpose

This document explains how to translate the provided Stitch reference into a GalleryGen-compatible export template that remains:

- automatically generated from `GalleryProject`
- suitable for arbitrary user image sets
- usable in both live React preview and static HTML/CSS export
- editorial and premium in mood without depending on hand-authored content

This is an inspiration-driven adaptation, not a literal recreation.

## Reference Reading

The reference has a clear editorial composition built from a few repeatable ideas:

- a minimal top bar
- an oversized typographic opening
- a dominant lead image
- a smaller secondary image row
- an alternating image/text feature block
- a second feature strip with image + muted side panels
- a large typographic divider near the bottom
- a dense dark footer

Its strongest quality is not any one widget. It is the visual rhythm: large type, generous whitespace, a strong lead image, then calmer modular sections.

## Proposed Section Structure

The reference can be translated into the following reusable GalleryGen template sections:

1. Minimal masthead
2. Oversized editorial hero
3. Lead feature image
4. Secondary gallery row
5. Feature split block
6. Editorial image block with quiet side panels
7. Section divider / index marker
8. Minimal dark footer

## Section Breakdown

### 1. Minimal Masthead

#### Visual role

The masthead creates a premium frame before the content starts. In the reference, it is sparse and almost quiet, which makes the oversized hero feel more intentional.

#### GalleryProject data that could drive it

- `project.site.title`
- `project.site.theme`
- static product label such as `GalleryGen`

#### Automatic-generation suitability

High.

This section can be generated very safely because it needs little content. The key is restraint, not complexity.

#### Recommendation

Preserve the small, quiet editorial top bar feeling, but simplify it further for auto-generated output:

- product name on the left
- optional gallery label or theme label on the right
- avoid multi-link navigation in exported galleries

### 2. Oversized Editorial Hero

#### Visual role

This is the strongest visual identity piece in the reference. The oversized typography makes the page feel like a designed issue or portfolio entry rather than a utility output.

#### GalleryProject data that could drive it

- `project.site.title`
- `project.site.description`
- photo count derived from `project.photos.length`

#### Automatic-generation suitability

Very high.

This is one of the best sections to preserve because the data already exists and the layout quality comes mostly from typography and spacing.

#### Recommendation

Preserve closely:

- oversized title
- generous spacing
- small editorial-style supporting line
- subtle photo count placement

Replace the archive-style numbering and issue language with something more neutral, since most user galleries will not have issue-like semantics.

### 3. Lead Feature Image

#### Visual role

The first large image acts like a cover story. It gives the page a focal point and raises perceived quality immediately.

#### GalleryProject data that could drive it

- first photo in `project.photos`
- title from `photo.title`
- optional subdued fallback from filename-derived title

#### Automatic-generation suitability

High, with one caveat.

It works well as long as the first uploaded image is treated as the lead image. That is deterministic and believable for auto-generated output.

#### Recommendation

Preserve closely:

- large single-image treatment
- image-first composition
- a very small caption line below or overlaid lightly

Do not overfit to the exact image proportions from the reference. Use a robust aspect ratio that works for ordinary user photos.

### 4. Secondary Gallery Row

#### Visual role

The three-up image row in the reference changes scale after the large lead image and establishes rhythm. It communicates “curated collection” without becoming a masonry wall.

#### GalleryProject data that could drive it

- next 3 photos after the lead image
- title from `photo.title`

#### Automatic-generation suitability

High.

This is a very good auto-generated pattern because it can be applied to nearly any set of images and still feel deliberate.

#### Recommendation

Preserve the idea, not the exact count:

- use a compact secondary row or compact multi-column band
- keep titles minimal
- hide or heavily de-emphasize filenames

### 5. Feature Split Block

#### Visual role

The reference includes a left-image, right-text feature section. Its job is to slow the page down and introduce editorial contrast between pure image display and structured storytelling.

#### GalleryProject data that could drive it

- one selected image from the remaining set
- title from `photo.title`
- description from `photo.description`, falling back to `project.site.description` or a short static editorial support line

#### Automatic-generation suitability

Medium.

The visual pattern is excellent, but the text-heavy editorial copy in the reference is not realistic for arbitrary user uploads.

#### Recommendation

Preserve:

- image + text split composition
- asymmetry
- editorial calm

Simplify:

- replace long article-like text with a short title + 1-2 quiet support lines
- avoid fake essay content

### 6. Editorial Image Block With Quiet Side Panels

#### Visual role

The later block in the reference uses one strong image plus muted side rectangles and quiet labels. This creates art-direction and pacing without requiring more text.

#### GalleryProject data that could drive it

- one image from the set
- optional section label
- optional photo count or collection summary

#### Automatic-generation suitability

Medium to high.

The side panels are decorative rather than content-heavy, so they can be reused safely as visual devices.

#### Recommendation

Preserve the compositional idea:

- one featured image
- adjacent muted blocks or typographic side panel

But do not reproduce the exact rectangles or references to systems/essays. Use them as abstract layout balancing devices only.

### 7. Section Divider / Index Marker

#### Visual role

The “INDEX / 02” style divider gives the page a designed rhythm break and makes the layout feel like a publication.

#### GalleryProject data that could drive it

- static section label
- derived photo count
- gallery title fragment if needed

#### Automatic-generation suitability

Medium.

It is visually strong, but if overused it can feel fake. For auto-generated galleries, it should be a restrained divider rather than a fictional publication index.

#### Recommendation

Keep a simplified version:

- a typographic divider near the lower half of the page
- use a real label such as `Collection`, `Selected Works`, or a photo count line

Avoid arbitrary numbering systems unless there is real meaning behind them.

### 8. Minimal Dark Footer

#### Visual role

The dark footer gives the page a strong ending and premium contrast. It also makes the whole site feel more complete.

#### GalleryProject data that could drive it

- `project.site.title`
- lightweight copyright line
- export-generated note such as “Built with GalleryGen”

#### Automatic-generation suitability

High.

Footers are very safe to auto-generate if kept minimal.

#### Recommendation

Preserve:

- dark contrasting footer
- compact grid or column alignment
- clean minimal closing feel

Simplify:

- remove complex nav clusters
- keep only a few lines of useful, believable metadata

## What Should Be Preserved Closely

These are the visual ideas most worth preserving from the reference:

- oversized editorial hero typography
- strong lead image immediately after the hero
- alternating scale between large and smaller image sections
- refined whitespace and quiet pacing
- very restrained metadata treatment
- a minimal, premium-feeling footer
- strong black/white/soft-gray tonal structure

## What Should Be Simplified

These should remain, but in a more auto-generation-friendly form:

- editorial captions
  - reduce to title plus very short support text
- section labels
  - use neutral terms like `Gallery`, `Selected Works`, `Collection`
- photo count and meta
  - keep, but in a quiet supporting role
- split image/text sections
  - use shorter, believable auto-generated copy

## What Should Be Removed Entirely

These elements are too manually art-directed or too editorially specific for reliable automatic generation:

- newsletter subscription areas
- multi-link editorial navigation systems
- long essay blocks
- fake article excerpts
- archive/issue systems that imply a publication structure the user did not create
- dense footer navigation clusters
- decorative labels that require handcrafted semantics

## Mapping Strategy For GalleryGen

## Proposed Template Data Evolution

Keep the current shared data layer approach, but extend it minimally to support the new section model.

Suggested additions in the template data layer:

- `featuredPhoto`
- `secondaryPhotos`
- `splitFeaturePhoto`
- `splitFeatureText`
- `editorialBreakLabel`
- `footerMeta`

These should remain derived from `GalleryProject` and not require new persistent app data in the first pass.

## Live Preview Template Plan

### Goal

Make the React preview look like a believable premium gallery website, not an app-side representation of gallery cards.

### Planned structure

1. Minimal top masthead
2. Oversized hero
3. Lead feature image
4. Secondary image strip/grid
5. One split editorial feature block
6. One additional image-led section
7. Simplified index/divider
8. Dark footer

### Preview-specific considerations

- Remove action buttons from visually dominant positions
- If image removal must remain, keep it subtle and overlay-only
- Avoid showing filenames in most places
- Keep the preview clean enough for screenshots

## Static Export Renderer Plan

### Goal

Match the live preview structure closely while keeping the exported HTML simple and readable.

### Planned HTML structure

- `header.site-masthead`
- `section.hero`
- `section.feature-lead`
- `section.gallery-strip`
- `section.editorial-feature`
- `section.gallery-detail`
- `section.editorial-divider`
- `footer.site-footer`

### Rendering approach

- Derive all content from `GalleryProject`
- Use the first photo as the lead image
- Use subsequent images in stable slices for each section
- Fall back gracefully when photo count is low
- Omit sections that cannot be filled cleanly rather than forcing noisy placeholders

## Exported CSS Structure Plan

### Goal

Produce maintainable static CSS that captures editorial mood without fragile one-off hacks.

### Suggested CSS groups

- root tokens
  - colors
  - spacing
  - typography
  - border radius
- shell and page framing
- masthead
- hero
- lead feature image
- gallery row / grid rhythm
- split editorial feature block
- divider styles
- footer
- responsive rules

### Styling priorities

- large type with strong line-height control
- clean white/soft-gray space
- minimal borders
- image prominence over panels
- editorial asymmetry without brittle layout logic

## Suitability For Arbitrary Image Sets

The design should be adapted around these rules:

- first image gets priority by default
- later images use stable, repeatable layout slots
- avoid requiring handcrafted copy
- avoid requiring very specific aspect ratios
- prefer omission over awkward filler

This keeps the template robust for ordinary uploads while still borrowing the premium editorial feel of the reference.

## Biggest Implementation Risks

1. Overfitting to the reference
   - If the template depends on hand-authored editorial content, it will collapse for normal users.

2. Too many section types for too little data
   - Small galleries may not have enough images to populate multiple premium-looking sections well.

3. Preview/export drift
   - The more complex the layout becomes, the more important it is to keep the React preview and exported HTML aligned.

4. Fragile layout rhythm
   - A visually impressive desktop composition may break down on mobile or with extreme image aspect ratios.

## Recommended Implementation Principle

Aim for:

**60% of the editorial mood, 100% automatic-generation friendliness.**

That means preserving:

- typographic confidence
- whitespace
- image hierarchy
- editorial pacing

While avoiding:

- handcrafted storytelling blocks
- overly specific publication metaphors
- layouts that only work for perfect art-directed images

## Recommended Build Order

1. Update the shared template data layer
2. Rebuild the live preview structure
3. Rebuild exported HTML structure
4. Rewrite exported CSS around the new editorial system
5. Test with:
   - 1 image
   - 3 images
   - 6 images
   - 12+ mixed-aspect-ratio images

This will keep the new Monolith-inspired template premium in tone, but still realistic for GalleryGen's automatic-generation workflow.
