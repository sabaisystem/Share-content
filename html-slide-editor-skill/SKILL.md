---
name: html-slide-editor
description: Use when modifying or generating HTML-based slides, swapping client or AI assets, updating copy, adding or removing scenes, and exporting final slide images as a reviewable folder or zip.
---

# HTML Slide Editor

Use this skill for HTML slide projects where HTML is the source of truth and final deliverables are exported images.

## Objective

Maintain an editable HTML slide system that can:
- accept client assets
- accept AI-generated assets
- update copy and layout safely
- add or remove slides
- export review and final image sets

## Default Workflow

1. Inspect the current project structure.
2. Identify slide files, asset folders, and data files.
3. Treat HTML as the editable source of truth.
4. Keep assets organized by origin:
   - `assets/client/`
   - `assets/generated/`
5. Prefer structured content files for editable copy when available.
6. Make requested slide, asset, or copy changes.
7. Keep slide numbering and filenames stable when possible.
8. Export still images per slide for review or final delivery.

## Editing Rules

- Do not hardcode new assets into random folders.
- Do not delete client originals unless explicitly asked.
- Prefer replacing references over destructive edits.
- If adding slides, use predictable numbering such as `04-name.html`.
- If removing slides, update manifest/order references too.
- If changing copy, preserve typography and layout intent unless the user asks for redesign.
- If an asset is missing, use a clearly named placeholder and note it.

## Asset Handling

When assets are provided:
- save client-supplied files under `assets/client/`
- save AI-generated or processed files under `assets/generated/`
- use stable, descriptive names

When assets are referenced in code:
- prefer centralized metadata when present
- otherwise update the exact slide file that uses the asset

## Export Goal

The normal output is not the HTML itself. The normal output is:
- an exported image per slide
- a folder of exports
- optionally a zip package for delivery

## Review Model

Preferred review loop:
- export numbered images
- client comments on the images
- apply revisions to the HTML source
- re-export

Do not assume the client will edit the HTML directly unless explicitly requested.

## Deliverables

Depending on the request, produce one or more of:
- updated HTML slide source
- organized asset folders
- exported PNG or JPG slides
- zip package for review or final handoff

## When Working On This Project

For the Villa Sabai Jai prototype:
- preserve the visual language unless asked to redesign
- keep timing and scene order explicit
- separate source files from exported outputs
- move toward a reusable slide/export structure rather than a one-off prototype
