@AGENTS.md

# Frontend Odyssey: History of Web 🕸️📰

## Build & Tech Stack
- **Framework:** Next.js (App Router), React 18, TypeScript, Tailwind CSS
- **Animations:** GSAP (ScrollTrigger), Custom `Tilt3D` WebGL/CSS components
- **Commands:**
  - `npm run dev` - Start local development server
  - `npm run build` - Build production bundle
  - `npx tsc --noEmit` - Type-check application

## Code Guidelines & Conventions
- **Component Style:** Always use `rafce` syntax (React Arrow Function Component with Export at the bottom):
  `const ComponentName = ({ children }) => { ... }; export default ComponentName;`
- **Typing:** Explicitly type props interfaces or inline types securely.
- **Responsiveness:** Favor Tailwind breakpoint utility classes (`md:w-[68vw]`, `lg:grid-cols-12`).

## Animation Rules (CRITICAL)
- **Mobile First:** Heavy GSAP animations, timelines, and 3D interactions *must* be disabled on mobile to preserve touch scrolling.
  - Use `if (typeof window !== 'undefined' && window.innerWidth < 768) return;` inside `useEffect` before registering ScrollTriggers.
- **Cinematic Intros:** Rely on advanced timeline sequencing (like the `PageUnfurl` Star Wars crawl) rather than basic fades. Use `onUpdate` scrub hooks for one-way irreversible reveals.

## Styling & Theme Notes (Newspaper Aesthetic)
- **Colors:**
  - `bg-paper` (rgb(205, 198, 190)): Custom grayish-beige canvas base.
  - `text-ink` / `border-ink` / `bg-ink` (#1a1a1a): Deep off-black ink tone.
  - `bg-accent` (#cc0000): Vintage striking red highlights.
- **Fonts:**
  - `font-newspaper`: `OldNewspaperTypes` (.ttf custom font) for vintage paragraphs.
  - `font-serif`: `Cormorant Garamond` (bold 700 explicitly) for vintage headlines.
  - `font-sans`: `Inter` for metadata, labels, and technical tags (`text-[10px] tracking-widest uppercase`).
- **Images:** By default, exclude heavy CSS color-burn mix-blends or sepia masks unless specifically asked. Use clean raw colors with minimal transparent scanline background arrays over images.

## Project Structure
- `src/components/PageUnfurl.tsx`: Wraps layout execution for 3-phase immersive 3D paper entry. (Note: fixed full-screen backgrounds MUST sit outside perspective containers to avoid width overrides and warping).
- `src/components/Tilt3D.tsx`: Interactive premium parallax hover component with dynamic glare tracking.
- `src/components/CopyReveal.tsx`: Handles cinematic staggering block reveals for era transitions (e.g. 1989 The Revolution).
- `src/components/sections/Era1_Arpanet.tsx`: Foundational content architecture. All future eras should match its structural cadence.
- `src/components/sections/RetroWeb.tsx`: Dedicated break from newspaper theme; fully authentic Web 1.0 experience leveraging native local custom cursors (`/cursor/cursor.png`) instead of GSAP canvas dots.

## Architecture & Design Logs
- **Custom Cursor Overhaul:** To prevent conflicting premium animations over retro elements, the global `CustomCursor.tsx` was completely removed. Cursor logic should now exclusively rely on CSS inheritance. For `RetroWeb.tsx`, the `.retro-cursor` class forces local pixelated PNG files on every child element natively.
- **ScrollTrigger Animation Scoping:** Removed strict `window.innerWidth` limits on `Era1_Arpanet` content loading animations, guaranteeing the `PageUnfurl` sequence unrolls and elegantly staggers all titles, paragraphs, and images securely on all devices.
