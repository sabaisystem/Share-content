# Share and Edit Flow for HTML-to-Image Deliverables

## Goal

Use HTML as the editable source of truth, then export final stills as an image folder or zip for delivery.

This keeps production flexible:
- We can generate layouts quickly with AI.
- We can swap client assets in and out.
- We can deliver easy-to-review image outputs.
- We avoid locking the project too early into video-only tooling.

## Recommended Source of Truth

Use a structured HTML project as the master editable format.

Why:
- HTML is easy for AI to generate and modify.
- Assets can be referenced from a normal folder structure.
- We can render both animated previews and flat exported images.
- It is easier to version, diff, and automate than design-tool-native files.

## Recommended Project Structure

```text
project/
  slides/
    01-cover.html
    02-water.html
    03-reef.html
  assets/
    client/
    generated/
    logos/
    backgrounds/
  exports/
    png/
    jpg/
    zip/
  data/
    manifest.json
    copy.json
  review/
    client-feedback.md
```

## Best Workflow

### Phase 1: Build editable HTML

1. Create slide HTML files or one HTML app with one scene per slide.
2. Store all images, logos, and backgrounds in `assets/`.
3. Keep text and slide metadata in `data/manifest.json` or `data/copy.json`.
4. Use fixed canvas sizes:
   - `1920x1080` for landscape
   - `1080x1350` or `1080x1920` if social portrait is needed
5. Make every slide exportable on its own.

### Phase 2: Add assets

Assets can come from:
- us
- the client
- AI-generated images
- stock sources

Rules:
- Save original files unchanged in `assets/client/` when they come from the client.
- Save AI-created or processed files in `assets/generated/`.
- Do not scatter assets across random folders.
- Keep filenames descriptive and stable.

### Phase 3: Generate preview set

From the HTML source, export each slide as:
- PNG for review
- JPG if smaller files are needed
- optional PDF contact sheet for quick overview

Deliver to client:
- a hosted HTML preview if animation matters
- a zip of review images
- a simple numbered list of slides

### Phase 4: Review and comments

The easiest review flow is:
- client comments on exported PNGs in Figma, Google Drive, Frame.io, Markup.io, or PDF
- we apply edits to the HTML source
- we re-export the updated image set

Recommended comment method:
- one image per slide
- clear slide numbers in filename
- one shared feedback doc if comments are made by email or chat

Example filenames:
- `01-cover-v1.png`
- `02-water-v1.png`
- `03-reef-v2.png`

### Phase 5: Final delivery

Final delivery package:
- `final-images.zip`
- optional `preview.mp4` or `preview.html`
- optional source package if client needs editable handoff

If the client only needs final assets, deliver:
- exported images only

If the client may need future edits, deliver:
- HTML source
- asset folders
- manifest/copy files
- a short editing instruction file

## Recommended Tools by Job

### For source creation and AI editing

Best choice:
- HTML/CSS/React

Why:
- easiest for AI to modify
- easy to automate
- easy to export

### For client review

Best choices:
- Figma for visual commenting
- Frame.io if motion preview matters
- Google Drive comments for lightweight review
- PDF if the client wants something very simple

### For client self-editing

Do not make raw HTML the primary client-edit format unless the client is technical.

If client self-editing is important, consider:
- Figma if edits are mostly layout and copy review
- Google Slides or PowerPoint if they need basic text/image swaps

But for this workflow, the cleanest setup is:
- HTML is the master source
- client comments on exported visuals
- we or AI make source edits

## Strong Recommendation

Use this operating model:

1. HTML is the master editable source.
2. Assets live in a clean folder structure.
3. Export numbered PNGs for review.
4. Client comments on those exports.
5. We revise the HTML.
6. We export a final folder or zip.

This is simpler than asking the client to edit the source directly.

## Suggested Data Model

Keep editable content outside layout code when possible.

Example `manifest.json` fields:

```json
{
  "project": "Villa Sabai Jai Promo",
  "size": "1920x1080",
  "slides": [
    {
      "id": "01-cover",
      "title": "Cover",
      "html": "slides/01-cover.html",
      "assets": [
        "assets/client/logo.png",
        "assets/generated/hero-water.jpg"
      ],
      "copy": {
        "headline": "BOOK THE VILLA.",
        "subheadline": "BEFORE THEY CATCH ON."
      }
    }
  ]
}
```

This makes AI edits safer because the AI can see:
- what slide exists
- which assets belong to it
- which copy is editable

## Export Strategy

Two export modes are useful:

### Mode A: Review export

- export every slide to PNG
- place in `exports/png/`
- zip the folder for the client

### Mode B: Final use export

- export PNG or JPG in final dimensions
- optionally create multiple sizes
- optionally package thumbnails plus full-resolution images

## Decision

For this project, the simplest and safest workflow is:

1. Generate or maintain the design in HTML.
2. Store all client and generated assets in organized folders.
3. Export images for each slide.
4. Deliver those images to the client for comments.
5. Keep edits centralized in the HTML source.
6. Deliver final images as a folder or zip.

## What Not to Do

- Do not let the client comment directly inside raw code unless they are technical.
- Do not mix source files and exported files in the same folder.
- Do not rely on only one large HTML file if each slide may need separate export and review.
- Do not bury editable copy inside many visual components if AI will update it later.

## Next Practical Step

Refactor this prototype into a reusable slide system with:
- one manifest file
- one assets folder
- one export script
- one review folder

That will make future AI-driven updates much easier.
