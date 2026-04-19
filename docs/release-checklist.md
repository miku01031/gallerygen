# Release Checklist

## Pre-Launch Checklist

- Confirm `README.md` reflects the current MVP only.
- Confirm `LICENSE` is present and matches the intended MIT choice.
- Run `npm run lint`.
- Run `npx tsc --noEmit`.
- Run `npm run build`.
- Verify the main workflow manually:
  - upload multiple images
  - drag and drop
  - remove image
  - edit title and description
  - preview the default template
  - export and download ZIP
- Open the exported ZIP and confirm it contains:
  - `index.html`
  - `styles.css`
  - `images/...`
- Test the exported files in a simple static hosting environment or local static file server.
- Confirm no placeholder text remains in release-facing copy unless intentionally marked.

## Demo Asset Checklist

- Record one short workflow GIF or MP4.
- Capture one clean hero screenshot of the homepage.
- Capture one screenshot showing uploader plus metadata editor.
- Capture one screenshot showing the live template preview.
- Ensure demo assets use realistic sample images.
- Avoid including personal or copyrighted photos without permission.
- Keep browser chrome clean and zoom level consistent.

## GitHub Repo Settings Checklist

- Set the repository description.
- Add the chosen GitHub topics.
- Pin the repository homepage URL if one exists.
- Make sure the default branch is correct.
- Enable Issues.
- Enable Discussions if community feedback is desired.
- Add the `MIT` license in GitHub repo metadata once detected.
- Add release notes for `v0.1.0`.
- Upload README demo assets and verify they render correctly.

## Post-Launch Sharing Checklist

- Publish the `v0.1.0` GitHub release.
- Share the launch post on GitHub, X, V2EX, Reddit, or relevant communities.
- Include one screenshot or GIF in launch posts when possible.
- Monitor the first issues and feedback closely.
- Fix any README or release-note inaccuracies discovered after launch.
- Save early user feedback for roadmap prioritization.
