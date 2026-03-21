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
- `src/components/PageUnfurl.tsx`: Wraps layout execution for 3-phase immersive 3D paper entry.
- `src/components/Tilt3D.tsx`: Interactive premium parallax hover component with dynamic glare tracking.
- `src/components/sections/Era1_Arpanet.tsx`: Foundational content architecture. All future eras should match its structural cadence.
