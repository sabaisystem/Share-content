# Share Content Workflow

This repository is used to create, review, and deliver HTML-based marketing content for Villa Sabai Jai.

The source of truth is the HTML project. We use that source to generate preview images, collect feedback, make revisions, and prepare final deliverables.

## What This Repo Is For

This repo helps us work together with the client in a simple way:

- we build the content in HTML
- we add client assets and approved copy
- we export preview images for review
- the client gives comments
- we revise the source
- we deliver final files

## Simple Client Flow

### Step 1: Client sends inputs

The client sends:

- brand assets
- photos or videos
- logo files
- text or copy
- links or references
- notes about style, audience, or goals

Preferred formats:

- images: JPG, PNG, WebP
- logo: PNG, SVG, PDF, or AI export
- text: Google Doc, Word doc, Notion, email, or plain text
- feedback: comments on images, PDF, Figma, Google Drive, or email

### Step 2: We build the first version

We turn the content into:

- HTML layouts
- slide-style content
- animated or static visual concepts

If needed, we also:

- create AI-generated assets
- clean up client assets
- resize or format images
- prepare review exports

### Step 3: We send preview files

We usually send the client:

- exported PNG or JPG slides
- optional hosted HTML preview
- optional MP4 preview if motion matters

This is the version the client reviews.

### Step 4: Client gives comments

The client does not need to edit code.

The easiest way for the client to work with us is to:

- review the exported images
- leave comments on each slide
- mark text changes clearly
- point out asset swaps or missing items
- approve or request another round

Recommended comment formats:

- Figma comments
- Google Drive comments
- PDF annotations
- email with slide numbers
- message thread with numbered notes

Example:

- Slide 02: replace the reef photo
- Slide 04: update the price text
- Slide 06: use a different villa image

### Step 5: We update the source

We apply all approved changes in the HTML source files and re-export a fresh review set.

This keeps the work organized and avoids version confusion.

### Step 6: Final delivery

When approved, we deliver one or more of:

- final PNG or JPG files
- zip package of final images
- HTML source files
- asset folders
- preview HTML or MP4

## What The Client Needs To Do

The client only needs to do 3 things:

1. Send content and assets.
2. Review the preview files.
3. Give clear comments or approval.

The client does not need to:

- edit HTML
- manage code
- export files
- organize technical assets in the repo

We handle that part.

## Best Way To Give Feedback

For the fastest workflow, the client should:

1. Review the exported slides in order.
2. Comment using slide numbers.
3. Keep each comment specific.
4. Separate must-fix items from optional ideas.
5. Confirm when a version is approved.

Good feedback example:

- Slide 01: change headline to "Your private Koh Tao escape"
- Slide 03: this image feels too dark
- Slide 05: please use the newer pool photo
- Slide 06: approved

Less helpful feedback example:

- make it nicer
- change the style

## If The Client Wants To Edit Things Themselves

If the client is not technical, they should not edit the HTML directly.

Better options are:

- comment on preview images
- edit copy in a shared Google Doc
- replace files in a shared asset folder

If the client really wants self-editing, we can prepare a simpler client-editable version later in:

- Figma
- Google Slides
- PowerPoint

But the main production source should remain in HTML so edits stay consistent and export-ready.

## Internal Working Model

Our normal process is:

1. HTML is the master source.
2. Client assets are stored clearly.
3. Generated assets are stored separately.
4. Exports are created for review.
5. Feedback is applied to source.
6. Final files are packaged for delivery.

## Repo Notes

Important project guidance is also documented here:

- `design_handoff_farang_video/SHARE_EDIT_FLOW.md`
- `html-slide-editor-skill/SKILL.md`

## Summary

For the client, this process should feel simple:

- send content
- review visuals
- comment
- approve

For us, the workflow stays structured:

- build in HTML
- revise in HTML
- export final assets cleanly
