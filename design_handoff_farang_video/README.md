# Handoff: "Don't Let Farang See This" — Koh Tao Promo Video

## Overview
A ~22-second animated promotional reel for **Villa Sabai Jai** on Koh Tao, Thailand. Playful "insider secret" framing: opens on Earth from space, zooms to Koh Tao, drops a "CLASSIFIED / DON'T LET FARANG SEE THIS" stamp, then rapid-fires six reasons Koh Tao is special, ending on a CTA to `villasabaijai.vercel.app`.

Target use: social media (Instagram Reels, TikTok, YouTube Shorts). Canvas is 16:9 at 1920×1080 — crop or re-layout for 9:16 if vertical is needed.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working animated prototype showing intended look, motion, and timing. They are **not** meant to be shipped as-is to production.

Your task is to **recreate this animation in the target environment**. Reasonable options:
- Keep as a standalone HTML/React animation and embed via iframe or static export
- Rebuild in a dedicated motion tool (After Effects, Rive, Lottie, Remotion) and export as MP4/WebM
- Render frames and stitch to video via Puppeteer + ffmpeg (Remotion-style) — this is probably the most practical path since the prototype is already React

Pick whichever fits the delivery channel. For social video upload, an MP4 export is almost certainly what you want.

## Fidelity
**High-fidelity.** Final colors, type, timing, copy, and layout are locked. Motion curves are specified in code via `Easing.*` and `interpolate()` helpers. Recreate pixel-perfectly.

## Scenes (in playback order)

### 1. Earth → Zoom to Koh Tao (0.0s – 4.2s)
- **Background:** Near-black `#04060e` with 120 randomized twinkling stars (sine-wave opacity)
- **Earth:** 520px stylized globe, radial gradient `#2aa3b3 → #0b6e7a → #064049`, with continent blobs in `#2f7a4a` rotating at 30°/s. Atmosphere glow via box-shadow.
- **Caption (0.4–2.6s):** `"somewhere in the Gulf of Thailand…"` — 36px JetBrains Mono, cream, centered at bottom
- **Zoom curve:** `scale([1 → 1.1 → 3.6 → 12])` across `[0, 2.8, 3.6, 4.2]s` with `easeInOutSine → easeInCubic → easeInExpo`
- **Pan offset:** Earth drifts up-left by `(-260, -90)` to frame Thailand under the crosshair
- **Crosshair (2.4–3.8s):** Coral `#e8654e` reticle with coordinates `10.0956° N / 99.8378° E → KOH TAO` in JetBrains Mono

### 2. Classified Stamp (4.2s – 6.5s)
- **Background:** Cream `#f6efe0` with 1px scanline overlay
- **White flash** (0–0.5s of scene) for transition punch
- **Header strip:** `FILE #047-KT` · `◼ EYES ONLY ◼` · `THAI LOCALS CLASSIFIED` — 20px mono
- **Three redaction bars:** Solid black rectangles at 70%, 55%, 82% width
- **Main stamp:** Slams from scale 3 → 0.92 → 1 with `easeOutBack`, rotated -8°, coral border
  - `⚠ CONFIDENTIAL ⚠` 32px
  - `DON'T LET` 96px Archivo Black
  - `FARANG` 168px Archivo Black
  - `SEE THIS` 96px Archivo Black
- **Thai subtitle:** `อย่าให้ฝรั่งเห็น` — 44px Noto Serif Thai
- **Dictionary gloss:** `/fə-ˈrang/ n. — foreigner` — 20px mono

### 3. Highlights (6.5s – 17.5s) — 6 beats, ~1.83s each
Persistent chrome:
- Top-left: `KOH TAO · เกาะเต่า` (26px Archivo Black)
- Top-right: `REASON NN / 06` counter (22px mono)
- Bottom: 6 progress pills (12px inactive / 40px active, coral)

| # | Label | Visual | Main text |
|---|---|---|---|
| 01 | THE WATER | Teal gradient + animated ripples + shimmer | `SO CLEAR / YOU CAN SEE / YOUR TOES` + `VISIBILITY ≥ 25M · ALL YEAR` |
| 02 | THE REEF | Deep teal with 5 swimming fish + rising bubbles | `TURTLES. / ACTUAL TURTLES.` + `SHARK BAY · AO LEUK · HIN WONG` |
| 03 | 18:42 LOCAL | Sunset sky gradient, descending sun, palm silhouettes | `SUNSETS / WORTH CRYING OVER` |
| 04 | THE PRICES | Sun-yellow pattern, 4 rotated price tags (PAD THAI ฿60, MASSAMAN ฿80, MANGO STICKY RICE ฿50, FRESH COCONUT ฿40) | `STREET / FOOD / UNDER $2.50` |
| 05 | THE VIEWS | Layered mountains, beach, flying birds, viewpoint sign | `TWO BAYS. / ONE HILL. / ZERO CROWDS.` + `↗ JOHN-SUWAN VIEWPOINT · 15min hike` |
| 06 | WHERE TO STAY | Warm golden hour, bungalow silhouettes on stilts, hammock | `A VILLA. / ON THE HILL.` + `Pool. Privacy. Parking. Paradise.` |

Each beat uses a shared entry/exit envelope (`beatEnvelope`): 0.3s ease-in, hold, 0.3s ease-out, with a +40px translateY entrance and 0.94 → 1 scale.

### 4. CTA (17.5s – 22.0s)
- **Background:** Ink `#1a1512` with radial sun-yellow vignette at 15% opacity, palm silhouettes flanking
- **Kicker:** `◼ SHHH ◼ ONE MORE SECRET ◼` (28px mono, sun-yellow, staggered fade-in at 0.1–0.5s)
- **Headline:** `BOOK THE VILLA.` (130px Archivo Black, cream)
- **Sub:** `BEFORE THEY CATCH ON.` (90px Archivo Black, coral)
- **URL badge:** `villasabaijai.vercel.app` on sun-yellow plate, ink text, cream border, coral `10px 10px 0` offset shadow. Animates in with `easeOutBack` scale and a subtle 2% pulse.
- **Micro-CTA:** `↗ TAP · BOOK · DISAPPEAR` (24px mono)
- **Footer:** `VILLA SABAI JAI · KOH TAO, TH` left, `EST. สบายใจ · "HAPPY HEART"` right

## Design Tokens

### Colors
```
cream      #f6efe0   page bg, light text on dark
paper      #efe6d1   alt surface
ink        #1a1512   primary text, CTA bg
ocean      #0b6e7a   water mid
deepOcean  #064049   water deep, accents
coral      #e8654e   primary accent, stamps, URL shadow
sun        #f4c653   highlight accent, CTA badge
leaf       #2f7a4a   foliage / continents
sand       #e8d4a8   beach
redact     #0f0f0f   redaction bars (slightly off-black)
```

### Typography
- **Display:** Archivo Black (fallbacks: Anton, system-ui sans)
- **Body:** Inter 400/500/600/700
- **Mono:** JetBrains Mono 400/500 — captions, coordinates, data labels
- **Thai:** Noto Serif Thai 400/700 (fallback Sarabun)

Scales used (all px): 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 54, 60, 72, 90, 96, 100, 110, 120, 130, 140, 160, 168, 180, 200, 210, 220. Letter-spacing: tight display (`-0.01em` to `-0.03em`), wide mono labels (`0.15em` to `0.4em`).

### Motion
- **Core helpers:** `Easing.easeOutBack`, `easeOutCubic`, `easeInCubic`, `easeInOutSine`, `easeInExpo`
- **Stamp slam:** `easeOutBack`, 400ms
- **Beat transitions:** 300ms in, 300ms out, `easeOutCubic`
- **CTA URL pulse:** `1 + 0.02 * sin(t * 4)` — continuous subtle

### Layout
- Canvas: 1920 × 1080
- Margins: 40–80px from edges for chrome
- Card padding: 20–32px
- Card borders: 4px solid ink
- Offset shadow pattern: `6px 6px 0 rgba(0,0,0,0.25)` on cards, `10px 10px 0 coral` on URL

## Assets
**None shipped.** All visuals are procedural SVG/CSS (gradients, shapes, drawn palms, drawn fish, drawn bungalows, drawn Earth). No external images. No icons beyond Unicode (`◼ ⚠ ↗ ᵛᵛ`).

If you're rebuilding in a motion tool, consider swapping the procedural placeholders for real photography — especially for the water, reef, sunset, and viewpoint beats. Leave the stamp and CTA scenes procedural; they're the stronger design choice.

## Files in This Bundle
- `Dont Let Farang See This.html` — entry point, composes scenes via `<Stage>` and `<Sprite>`
- `animations.jsx` — reusable engine: `Stage`, `Sprite`, `useTime`, `useSprite`, `Easing`, `interpolate`, `animate`
- `scenes.jsx` — Scene 1 (Earth) + Scene 2 (Classified)
- `scenes2.jsx` — Scene 3 (6 highlight beats) + Scene 4 (CTA)

## Implementation Notes for Claude Code
1. **If exporting to video:** [Remotion](https://www.remotion.dev/) is the cleanest path — this code is already React with a time-driven render model. Swap `<Stage>` for Remotion's `<Composition>`, replace `useTime()` with `useCurrentFrame() / fps`, and the scenes port almost directly.
2. **If keeping as web:** The prototype already works standalone. You mainly need to host the fonts and inline the React/Babel CDN scripts, or move to a real build.
3. **Fonts are loaded from Google Fonts** via `<link>` in the HTML head. In production, self-host or subset for perf.
4. **Timing is hand-tuned.** If you add narration/music, keep scene boundaries at `4.2 / 6.5 / 17.5 / 22.0s` so motion hits on beat.
5. **Copy is final** — no lorem ipsum. Only edit if brand/legal requires it.
