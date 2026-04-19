# Template B: Screenshot / Product Showcase Implementation Plan

## 1. Current Objective

Template B is intended to turn:

- project screenshots
- product mockups
- UI captures
- design system visuals
- mixed portfolio assets

into a polished static showcase page that feels premium and share-worthy.

This template differs from Template A in a fundamental way:

- Template A is closer to an image-led portfolio / gallery rhythm
- Template B should feel more like a structured product showcase page
- Template B must handle screenshots and interface captures better than a photography-oriented composition

The goal is not to create a fake startup landing page or marketing site. The goal is to create a **credible showcase surface** for visual project assets using the existing GalleryGen architecture.

## 2. Visual Identity

Using the approved Stitch screenshot as visual source of truth, the key qualities to preserve are:

- strong but controlled typography
- structured composition rather than freeform masonry
- one dominant lead visual
- mixed image aspect ratios presented with intention
- clean white / soft gray surfaces
- minimal chrome
- restrained metadata
- high-end product presentation feel

The intended emotional impression is:

- polished
- product-grade
- structured
- showcase-ready
- README-link-worthy

Compared with a photography-leaning template, this direction should feel:

- more deliberate
- more interface-friendly
- more compatible with screenshots and mockups
- less dependent on emotional/editorial imagery

## 3. Section Breakdown

The Stitch reference can be translated into these reusable sections.

### Minimal Masthead

Visual role:
- frames the page and immediately signals a product/showcase context

Keep / simplify / remove:
- preserve the minimal top frame
- simplify fake multi-link navigation into a quiet branded masthead or static section marker
- remove search/menu affordances and any implication of a full website IA

GalleryProject data:
- `project.site.title`
- optional static product label such as `GalleryGen`
- `project.photos.length`

Auto-generation suitability:
- high

### Structured Hero

Visual role:
- introduces the showcase with confidence and hierarchy
- should feel more product-focused than editorial

Keep / simplify / remove:
- preserve large heading, concise supporting copy, and clean spacing
- simplify copy into neutral gallery/site metadata
- remove fake positioning language that sounds like brand marketing

GalleryProject data:
- `project.site.title`
- `project.site.description`
- `project.photos.length`

Auto-generation suitability:
- very high

### Lead Showcase Visual

Visual role:
- anchors the page with a dominant first visual
- makes the page immediately screenshot-friendly and README-worthy

Keep / simplify / remove:
- preserve the wide lead visual treatment
- simplify overlay text into a neutral label or omit entirely
- remove hero-badge language that sounds like product campaign copy

GalleryProject data:
- one selected leading photo from `project.photos`
- `photo.title`

Auto-generation suitability:
- high, as long as selection logic is deterministic and robust

### Secondary Showcase Grid

Visual role:
- presents the rest of the set in a structured, asymmetric layout
- communicates “system”, “range”, and “curation” better than a pure masonry wall

Keep / simplify / remove:
- preserve the asymmetric grid feeling from the Stitch structure
- simplify metadata into quiet titles or short labels only
- remove fake categories like “Dashboard Interface” or “Editorial Layout” unless based on real titles

GalleryProject data:
- `project.photos`
- `photo.title`

Auto-generation suitability:
- medium to high

This is workable if the grid logic is layout-driven rather than content-dependent.

### Optional Anchor / Showcase Note Section

Visual role:
- creates a pause after the visual cluster
- provides a concise, centered explanatory statement
- helps the page feel complete without needing fake storytelling

Keep / simplify / remove:
- preserve the calm pause section
- simplify into neutral site-level text derived from the gallery title/description
- remove CTA buttons and archive/project buttons

GalleryProject data:
- `project.site.title`
- `project.site.description`
- `project.photos.length`

Auto-generation suitability:
- high, if kept short and neutral

### Minimal Footer

Visual role:
- gives the page a clean ending
- reinforces completion without pretending to be a multi-page product site

Keep / simplify / remove:
- preserve low-noise footer framing
- simplify to title / count / build note
- remove archive/privacy/inquiries links

GalleryProject data:
- `project.site.title`
- `project.photos.length`
- optional `Built with GalleryGen` or `Exported with GalleryGen`

Auto-generation suitability:
- high

## 4. Screenshot / Product Showcase Suitability

This template should be explicitly optimized for:

- project screenshots
- design mockups
- product renders
- mixed portfolio visuals

### What should be emphasized

- screenshot clarity
- clean framing
- readable interface surfaces
- strong first image impact
- structured contrast between wide, vertical, and square visuals
- enough whitespace to let UI screenshots breathe

### What should be avoided

- aggressive image cropping that cuts off UI edges
- photography-only visual assumptions
- overly decorative overlays
- fake storytelling labels
- masonry-only rhythm that weakens screenshot readability

### How image clarity and cropping should be handled

- screenshots should generally receive more respectful framing than photography
- lead visual should prefer wider presentation
- vertical mockups should have a dedicated column treatment when possible
- square or detail images should sit in balanced secondary positions
- object-fit rules should avoid destroying important UI edges; layouts should use aspect-ratio slots thoughtfully rather than crop everything the same way

### Why this template is more suitable than a photography-only template

Photography templates often assume:

- emotional imagery
- organic cropping
- loose storytelling rhythm

But screenshot showcases benefit from:

- clean structural hierarchy
- clearer aspect-ratio intent
- stronger “hero + supporting system” composition
- less dependence on atmospheric captions

Template B should therefore feel better for README-linked project galleries because it presents screenshots as designed artifacts, not as lifestyle photography.

## 5. Elements to Keep

These parts from the Stitch direction should be preserved closely:

- minimal page frame
- strong headline-led hero
- dominant lead showcase visual
- asymmetric supporting image grid
- centered concluding note section
- clean, low-noise footer
- premium spacing and restrained palette

## 6. Elements to Simplify

These should remain in spirit but become neutral GalleryGen-driven content:

- hero copy
- image captions
- lead visual label
- section note / anchor copy
- footer identity language

They should be translated into:

- title
- description
- image count
- photo titles
- lightweight build note

## 7. Elements to Remove

These should be removed entirely:

- fake brand navigation
- fake multi-page site links
- search/menu controls
- fake marketing CTA buttons
- fake archive or process pages
- fake editorial storytelling
- branded slogans like “Curated Excellence”
- footer links such as privacy/inquiries/archive

## 8. Data Mapping Plan

Template B should be driven only by existing `GalleryProject` data:

- `project.site.title`
- `project.site.description`
- `project.photos.length`
- `project.photos`
- `photo.title`
- existing neutral image metadata already present in the current normalized photo objects

### Derived concepts that may be created in the template data layer

- `leadPhoto`
- `secondaryPhotos`
- `showcaseGridPhotos`
- `heroCountLabel`
- `leadLabel`
- `anchorTitle`
- `anchorSummary`
- `footerNote`
- layout slot assignments such as `wide`, `portrait`, `square`, `detail`

These should remain pure derived values inside the template data builder.

### Persisted state that should NOT be introduced

- no new screenshot-specific state
- no per-image manual layout editor state
- no new project-level marketing copy fields
- no fake navigation or section config state
- no new stored CTA/button text

The template should remain auto-generated from the current model, not from new persistent authoring controls.

## 9. Preview and Export Implementation Plan

### React Live Preview

Implement a dedicated preview component for Template B that:

- renders the structured masthead
- renders the hero
- renders one lead showcase image
- renders a stable asymmetric supporting grid
- optionally renders a short showcase-note block
- renders a minimal footer

The preview should keep remove controls subtle and non-dominant.

### Static Export Renderer

Implement a matching export renderer that produces:

- clean semantic HTML
- no external dependencies
- deterministic ordering and layout slots

Suggested structure:

- `header.site-masthead`
- `section.hero`
- `section.lead-showcase`
- `section.showcase-grid`
- `section.showcase-note`
- `footer.site-footer`

### Exported CSS Structure

Suggested CSS groups:

- root tokens
- page shell
- masthead
- hero
- lead showcase media
- showcase grid
- captions
- note section
- footer
- responsive rules

The CSS should prioritize:

- aspect-ratio stability
- calm spacing
- screenshot readability
- minimal hover dependency

## 10. Risk Analysis

### Overfitting to a single polished demo set

The Stitch reference uses very cooperative visuals. A direct translation may fail on ordinary screenshots or mixed image sets.

### Screenshot cropping / readability issues

Screenshots have fragile edges and text density. Over-cropping can quickly reduce clarity and make the template feel worse than a simpler gallery.

### Preview / export drift

The asymmetric structured grid must remain visually close in both React preview and static export. If the layout is too bespoke, parity may drift.

### Too much landing-page feeling

The reference has product-site energy. If left unchecked, the output will feel fake because the generated page is not a real marketing website.

### Too little visual distinction from Template A

If the implementation falls back to a loose image gallery with minor spacing differences, it will not justify a second template.

## 11. Recommended Phased Implementation

### First Pass

User-facing goal:
- establish Template B as a clearly different screenshot/product showcase layout

Likely affected files:
- `templates/gallery-template-preview.tsx`
- `templates/default/get-default-gallery-template-data.ts` or new neighboring template data file
- new Template B preview component
- new Template B export renderer/CSS

What should be done:
- structured masthead
- strong hero
- lead showcase visual
- basic asymmetric secondary grid
- minimal footer

What should NOT be done yet:
- CTA-like note block
- excessive motion
- advanced dark mode polish
- template switching UI

### Second Pass

User-facing goal:
- make the layout feel curated and premium across mixed screenshot sets

Likely affected files:
- Template B preview component
- Template B export renderer
- Template B CSS
- template data builder

What should be done:
- refine slot assignment logic
- improve screenshot-safe cropping
- add optional neutral showcase-note section
- tighten caption density
- improve spacing between hero, lead visual, and grid

What should NOT be done yet:
- manual layout editing
- screenshot-specific per-image controls
- fake product navigation

### Final Polish Pass

User-facing goal:
- make Template B README/demo ready

Likely affected files:
- Template B preview component
- Template B export renderer
- Template B CSS only

What should be done:
- dark mode calibration
- responsive balance tuning
- edge-case tuning for 4, 6, 8, 12 image sets
- typography and footer refinement
- preview/export parity check

What should NOT be done yet:
- new product features
- new persisted project fields
- builder UI redesign

## 12. Final Recommendation

The single best first implementation step is:

**build the core Template B composition first: structured hero + lead showcase visual + asymmetric secondary grid.**

Why this gives the highest impact with the lowest risk:

- it creates the strongest visual distinction from Template A immediately
- it is already strongly supported by the Stitch reference
- it fits the existing `GalleryProject` model cleanly
- it improves screenshot suitability without requiring new state or new packages
- it establishes the core layout language before finer polish decisions

In short:

start with the **hero + lead visual + structured grid skeleton**, then refine caption density and the optional note section later.
