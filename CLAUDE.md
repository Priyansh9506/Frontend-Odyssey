@AGENTS.md

# The Hypertext Herald — History of Web 🕸️📰

An immersive, scroll-driven interactive documentary chronicling the History of the Internet (1969–2026) presented as a vintage newspaper. Built for the **Frontend Odyssey** hackathon.

---

## Build & Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.1 |
| **React** | React | 19.2.4 |
| **Language** | TypeScript | ^5 |
| **Styling** | Tailwind CSS v4 (via `@tailwindcss/postcss`) | ^4 |
| **Animations** | GSAP (ScrollTrigger, SplitText) | ^3.14.2 |
| **GSAP React** | `@gsap/react` (useGSAP hook) | ^2.1.2 |
| **3D** | Three.js, @react-three/fiber, @react-three/drei | ^0.183.2 |
| **Smooth Scroll** | Lenis | ^1.3.19 |
| **Utilities** | clsx, tailwind-merge | latest |
| **Compiler** | React Compiler (babel-plugin-react-compiler) | 1.0.0 |

### Commands
```bash
npm run dev          # Start local development server (Next.js dev mode)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx tsc --noEmit     # Type-check without emitting
```

### Config Highlights
- **`next.config.ts`**: `reactCompiler: true` enables the React Compiler.
- **`postcss.config.mjs`**: Uses `@tailwindcss/postcss` (Tailwind v4 PostCSS mode).
- **`tsconfig.json`**: Path alias `@/*` → `./src/*`. Target ES2017, module bundler resolution.
- **No `tailwind.config.*`**: Tailwind v4 is configured entirely through CSS (`globals.css`) using `@theme inline` blocks and CSS custom properties.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css        # Design system: @theme, @font-face, base styles, animations
│   ├── layout.tsx         # Root layout: fonts (Cormorant+Inter), Lenis wrapper, SEO metadata
│   ├── page.tsx           # Main page: composes all eras + PageUnfurl wrapper
│   └── icon.png           # Favicon
├── components/
│   ├── PageUnfurl.tsx     # 3-phase cinematic page entry (loading → popup → scroll unfurl)
│   ├── LoadingNewspaper.tsx # Standalone loading screen (3D newspaper unfurl, currently unused in page.tsx)
│   ├── CopyReveal.tsx     # GSAP SplitText block-reveal animation component
│   ├── Tilt3D.tsx         # Interactive 3D perspective tilt on hover with glare
│   ├── SmoothScrolling.tsx # Lenis smooth scroll wrapper + ScrollTrigger sync
│   └── sections/
│       ├── Era1_Arpanet.tsx      # Vol. 1 — ARPANET & Birth of the Internet (1969-1989)
│       ├── Era2_WWW.tsx          # Vol. 2 — World Wide Web & Dot-Com Boom (1989-1999)
│       ├── RetroWeb.tsx          # Interactive Web 1.0 Retro Break (Netscape Navigator)
│       ├── Era3_BubbleBurst.tsx  # Vol. 3 — The Dot-Com Crash (2000-2003)
│       ├── Era4_Web2.tsx         # Vol. 4 — Web 2.0: Facebook, YouTube, Twitter (2004-2007)
│       ├── Era5_SocialMedia.tsx  # Vol. 5 — Zuckerberg's Empire & Acquisitions (2008-2016)
│       ├── Era6_Web3.tsx         # Vol. 6 — Bitcoin, Ethereum, NFTs, Metaverse (2009-2022)
│       ├── Era7_Web3Burst.tsx    # Vol. 7 — Web3 Bubble Burst & Meta Losses (2022-2026)
│       └── TheEditorsDesk.tsx    # Back Page: Flip-card credits/manifesto/about
public/
├── fonts/OldNewspaperTypes.ttf   # Custom vintage newspaper body font
├── images/                        # 28 editorial images (PNG/WebP/GIF)
└── video/                         # 2 MP4 videos (Meta rebrand, Zuckerberg demo)
```

---

## Page Composition & Flow

The main `page.tsx` composes everything as a **single long-scroll experience**:

1. **`<PageUnfurl>`** wraps only `<Era1_Arpanet />` — provides the cinematic 3D newspaper entry on desktop (disabled on mobile/tablet < 1024px).
2. All subsequent eras run **outside** PageUnfurl in a native `div` to prevent perspective/overflow conflicts:
   - Era 2 → RetroWeb → Era 3 → Era 4 → Era 5 → Era 6 → Era 7 → TheEditorsDesk

### Era Transition Pattern
Each era (2–7) follows this repeating structure:
1. **Cinematic black-screen transition** — Full viewport dark section with `CopyReveal` animating a large year + subtitle
2. **Newspaper content** — Paper-colored section with the era's newspaper header, grid content, images, and end-of-volume marker

---

## Component Architecture

### PageUnfurl.tsx (Desktop-Only, ≥1024px)
- **Phase 1 — Loading**: Black overlay, year counter 2026→1969 via GSAP tween, branded "The Hypertext Herald".
- **Phase 2 — Popup**: Loader fades, paper slides into view at `scale(0.82)` + `rotateX(18deg)`, children stagger-animate in.
- **Phase 3 — Scroll Unfurl**: ScrollTrigger scrubs the paper from tilted+rounded to flat+full viewport. On `onLeave`, cleans up GPU-heavy styles (`will-change`, `perspective`, `transformStyle`) to prevent jank downstream.

### CopyReveal.tsx
- Uses GSAP `SplitText` to split children into lines, wraps each in a container, and animates a colored block (`scaleX 0→1`, reveal text, `scaleX 1→0` from right). 
- **Critical**: Waits for `document.fonts.ready` before measuring to avoid mis-splits.
- Supports scroll-triggered (`animateOnScroll=true`) or immediate playback.
- Props: `blockColor`, `stagger`, `duration`, `delay`, `animateOnScroll`.

### Tilt3D.tsx
- Mouse-tracking 3D perspective rotation + radial gradient glare.
- Disabled on mobile (`window.innerWidth < 768`).
- Uses GSAP for smooth interpolation. `elastic.out` ease on mouse leave.

### SmoothScrolling.tsx
- Wraps the entire app in `<ReactLenis>` with `lerp: 0.1`, `duration: 1.2`, `smoothWheel: true`.
- Refreshes `ScrollTrigger` on mount to sync with Lenis.

### TheEditorsDesk.tsx
- **3D flip card** — Front face shows "Turn to the Back Page" CTA; back face reveals the manifesto, design philosophy, and author bio.
- Flip animation: GSAP `rotateY` 0↔180 with `expo.inOut` easing.
- Both faces use `backfaceVisibility: hidden`; the inactive face becomes `position: absolute` to avoid layout disruption.
- After flip, calls `ScrollTrigger.refresh()` and `lenis.resize()` to sync layout.

### RetroWeb.tsx
- Fully authentic **Web 1.0 Netscape Navigator** simulation.
- Shows Win95-style error dialog on mobile/tablet, full Netscape browser on XL screens.
- Features: hit counter, marquee, guestbook button with "Error 404" popup, retro links.
- Uses `.retro-cursor` CSS class for custom SVG cursors (defined in `globals.css`).

---

## Code Guidelines & Conventions

### Component Style
- Use **`rafce`** syntax (React Arrow Function Component Export):
  ```tsx
  const ComponentName = ({ children }: Props) => { ... };
  export default ComponentName;
  ```
- Some components use `export default function` — both styles are acceptable, but prefer `rafce` for new components.

### Typing
- Explicitly type prop interfaces or inline types. Use `useRef<HTMLDivElement>(null)` pattern.

### File Organization
- All **era content** lives in `src/components/sections/`.
- All **reusable animation/UI components** live in `src/components/`.
- There is only **one page** (`page.tsx`) — the entire app is a single-page scroll experience.

### Client Components
- Every component that uses hooks, GSAP, or browser APIs must have `"use client"` directive.
- The root `page.tsx` is a **Server Component** — it only imports client components.

---

## Styling & Theme (Newspaper Aesthetic)

### Design Tokens (defined in `globals.css` via CSS variables + `@theme inline`)

| Token | Value | Usage |
|---|---|---|
| `--color-paper` / `bg-paper` | `rgb(205, 198, 190)` | Grayish-beige canvas base |
| `--color-ink` / `text-ink` / `bg-ink` | `#1a1a1a` | Deep off-black ink tone |
| `--color-accent` / `text-accent` / `bg-accent` | `#cc0000` | Vintage striking red highlights |

### Typography

| Class | Font | Usage |
|---|---|---|
| `font-serif` | Cormorant Garamond (Google Fonts, weights 300–700) | Headlines, titles, section headers |
| `font-sans` / `font-inter` | Inter (Google Fonts) | Metadata, labels, technical tags, UI text |
| `font-newspaper` | OldNewspaperTypes (custom `.ttf`) | Vintage paragraph body text |

- The `OldNewspaperTypes` font is **preloaded** in `layout.tsx` `<head>` and declared with `font-display: block` to prevent FOIT.
- Headline style: `text-[11vw] leading-[0.8] uppercase font-black tracking-tighter`.
- Metadata style: `font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.2em]`.
- First-letter drop caps: `first-letter:text-[6rem] first-letter:font-black first-letter:float-left`.

### Common CSS Patterns
- **Article text**: `font-newspaper text-lg md:text-xl leading-relaxed text-justify`.
- **Image containers**: `border-[2px] md:border-[4px] border-ink overflow-hidden`.
- **Newspaper section borders**: `border-x-[8px] md:border-x-[40px] border-paper` (creates page margins).
- **Volume end markers**: Centered horizontal rule with centered "END OF VOL. N" badge.
- **Share button**: Each era header has a Share button using `navigator.share` with clipboard fallback.
- **Body noise grain**: SVG inline noise texture at `opacity: 0.04`.
- **Hidden scrollbar**: Globally hidden across all browsers.

### Images
- Use raw `<img>` tags (not Next.js `<Image>`) for editorial photographs — this avoids hydration issues and allows simpler CSS control.
- Apply `contrast-125` for vintage punch. Use `group-hover:scale-105 transition-all duration-700` for hover zoom.
- Vintage scanline overlay SVG is used sparingly via `bg-[url(...)]` pseudo-patterns.

---

## Animation Rules (CRITICAL)

### Mobile-First Performance
- **PageUnfurl** is completely disabled below 1024px — mobile/tablet get instant content with no 3D transforms.
- **Tilt3D** is disabled below 768px.
- The `if (window.innerWidth < 768) return;` guard must be used in `useEffect` before registering heavy ScrollTriggers.
- `RetroWeb.tsx` shows a simplified Win95 error dialog on mobile instead of the full Netscape simulation.

### GSAP Registration
- Always register plugins *outside* components or inside `if (typeof window !== "undefined")` guard:
  ```tsx
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  ```
- Use `gsap.context(() => { ... }, sectionRef)` for scoped cleanups. Return `ctx.revert()` in useEffect cleanup.

### Scroll-Triggered Reveals
- Each era uses a class-based reveal pattern (e.g., `.era1-reveal`, `.era2-reveal`, `.era5-reveal`).
- Standard reveal: `gsap.fromTo(elem, { y: 60, opacity: 0, rotateX: 10 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: elem, start: "top 85%" } })`.
- For per-element triggers, use `gsap.utils.toArray<HTMLElement>(".eraX-reveal").forEach(...)`.

### SVG Timeline Animation (Era 1 & Era 5)
- Animated sine-wave SVG `<path>` draws on scroll using `strokeDasharray` / `strokeDashoffset`.
- Timeline nodes `.timeline-node` / `.era5-node` pop in with `back.out(2)` stagger, synced to scroll.
- Wrapped in `setTimeout(() => { ... }, 100)` to ensure layout is calculated before measuring path length.

### GPU Cleanup
- After PageUnfurl completes, `will-change`, `transformStyle`, `perspective`, and `transform` are explicitly reset to `auto`/`none`/`flat` to free GPU layers.

### Cinematic CopyReveal Transitions
- All era transitions use back-to-back `<CopyReveal>` blocks — first the year (large, `OldNewspaperTypes`), then the subtitle (`tracking-widest`, `text-zinc-400`).
- Delay the subtitle by `0.4s` for theatrical sequencing.

---

## SEO & Metadata
- Full OpenGraph + Twitter Card meta tags in both Next.js `metadata` export and manual `<head>` tags (for maximum compatibility).
- `metadataBase`: `https://history-of-web.vercel.app`
- Title: "The Hypertext Herald | History of Web"
- Favicon: `/icon.png` (also used as OG image).

---

## Architecture & Design Decisions

### Why No Custom Cursor
The global `CustomCursor.tsx` was removed entirely. Cursor logic relies on CSS inheritance. For `RetroWeb.tsx`, the `.retro-cursor` class applies custom SVG-based cursors (arrow + hand pointer) to all children via `!important` override.

### Why `<img>` Instead of `<Image>`
Next.js `<Image>` caused hydration mismatches and layout shift issues with the heavily-styled newspaper grid. Native `<img>` tags are used with `eslint-disable-next-line @next/next/no-img-element` comments for all editorial content images.

### Why PageUnfurl Only Wraps Era 1
Wrapping all eras in the perspective container caused width overrides, GPU jank on long scrolls, and interfered with downstream ScrollTrigger animations. Only Era 1 sits inside the 3D perspective wrapper; all other eras render natively.

### TheEditorsDesk Flip Height Calculation
Both front and back face heights are **measured before** the flip animation starts (via temporary `position: relative` tricks). This prevents the container from collapsing during the GSAP `rotateY` tween. After animation, the container height is set to `auto` (back) or the measured front height.

### Lenis + GSAP ScrollTrigger Sync
`SmoothScrolling.tsx` wraps the app in `<ReactLenis>` and calls `ScrollTrigger.refresh()` on mount. After flip animations in `TheEditorsDesk`, both `ScrollTrigger.refresh()` and `lenis.resize()` are called.

---

## Known Patterns & Gotchas

1. **SplitText + Custom Fonts**: `CopyReveal` waits for `document.fonts.ready` before running `SplitText` — without this, line splits are measured incorrectly.
2. **Tablet Breakpoints**: SVG timeline animations use `window.innerWidth < 1280` to apply softer scroll ranges on tablets vs desktop.
3. **`suppressHydrationWarning`**: Applied to `<html>` and `<body>` in `layout.tsx` to prevent hydration warnings from browser extensions.
4. **Marquee Animation**: Era 3 stock ticker uses pure CSS (`marquee-track` class in `globals.css`) with GPU optimizations (`backface-visibility: hidden`, `perspective: 1000px`), NOT GSAP — for zero-jank infinite loop.
5. **React 19 Compatibility**: `CopyReveal` wraps children in a `<div ref={containerRef}>` to avoid React 19's stricter ref access rules during render.
6. **dangerouslySetInnerHTML**: `RetroWeb.tsx` uses inline `<style>` with `dangerouslySetInnerHTML` for the marquee `@keyframes` — this is intentional for the retro section only.

---

## Asset Inventory

### Fonts
- `public/fonts/OldNewspaperTypes.ttf` — Custom vintage newspaper typeface

### Key Images (28 total in `public/images/`)
| File | Era | Subject |
|---|---|---|
| `imp-processor.png` | 1 | Interface Message Processor |
| `email.png` | 1 | First network email system |
| `NeXT-computer.png` | 2 | World's first web server |
| `time-burners-lee.png` | 2 | Tim Berners-Lee portrait |
| `giphy.gif` | Retro | Spinning 3D skull GIF |
| `stock-crash.png` | 3 | Stock market crash |
| `jeff-bezos-amazon.png` | 3 | Young Jeff Bezos |
| `ebay-founders.png` | 3 | eBay founders |
| `mark-.zukerberg-old-days.png` | 4 | Young Zuckerberg |
| `youtube-founders.png` | 4 | YouTube founders |
| `jack-dorsey.png` | 4 | Jack Dorsey |
| `facebook-popularity.png` | 5 | Facebook graph |
| `instagram-logo.png` | 5 | Instagram logo |
| `snapchat-logo.png` | 5 | Snapchat logo |
| `whatsapp-logo.png` | 5 | WhatsApp logo |
| `Mark-Z-dominence.png` | 5 | Zuckerberg dominance |
| `satoshi-nakamoto.png` | 6 | Satoshi Nakamoto statue |
| `bitcoin-ethereum.png` | 6 | Bitcoin & Ethereum |
| `bored-ape-fun.png` | 6 | BAYC collection |
| `most-expensive-bored-ape.png` | 6 | Bored Ape #8585 |
| `most-expensive-cryptopunk.png` | 6 | CryptoPunk #5822 |
| `opensea.png` | 6 | OpenSea marketplace |
| `rariable.png` | 6 | Rarible marketplace |
| `meta-80-billion-loss.png` | 7 | Meta losses chart |
| `meta-horizon.png` | 7 | Meta Horizon Worlds |
| `meme-coin.png` | 7 | Meme coin graveyard |
| `sandbox-metaverse.png` | 7 | The Sandbox |
| `Priyansh.webp` | Editors | Author portrait |

### Videos (2 total in `public/video/`)
| File | Era | Subject |
|---|---|---|
| `mark-zukerberg-giving-demo.mp4` | 4 | Zuckerberg CNBC demo (3.8 MB) |
| `Meta-rebrand.mp4` | 6 | Meta rebrand announcement (31.8 MB) |
