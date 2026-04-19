# AGENTS.md

## Project
GalleryGen is an offline-first web app that turns a batch of local images into a beautiful static gallery website.

## Product goal
The first public release must let a user drop images, preview them, choose one template, and export a deployable ZIP in under 30 seconds.

## Non-goals for v0.1
- No backend
- No user accounts
- No cloud sync
- No AI caption generation
- No multi-page admin panel
- No Tauri / desktop packaging
- No advanced EXIF UI
- No folder import in the first milestone

## Tech constraints
- Next.js App Router
- Static export only
- Browser-side file processing
- Mobile-first UI
- TypeScript only
- Keep components small and composable

## Architecture rules
- Separate upload pipeline, image pipeline, template renderer, and export pipeline
- Preview data and export data must share the same normalized schema
- Avoid mixing view state with persistent gallery data
- Prefer pure functions in lib/
- Put browser-only logic behind client components or browser-safe utilities

## Code quality rules
- Strong typing first
- No any unless justified
- No giant components over ~250 lines unless unavoidable
- Create reusable UI primitives before duplicating markup
- Every completed feature must pass lint, typecheck, and build

## Delivery rules
When implementing a feature:
1. Restate the goal
2. Identify affected files
3. Implement the smallest complete version
4. Verify with lint, typecheck, and build
5. Summarize what changed and what remains
