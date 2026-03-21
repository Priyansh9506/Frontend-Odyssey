"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Miranda-style 3-phase page reveal:
 *
 * Phase 1 — LOADING: Black screen with a subtle counter / branding
 * Phase 2 — POP-UP: The paper rises into view at 85% scale, 15° tilt, rounded corners, big shadow
 * Phase 3 — SCROLL UNFURL: As the user scrolls, the paper zooms to 100%, flattens, fills viewport
 */
export default function PageUnfurl({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterObj = useRef({ val: 0 });
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"loading" | "popup" | "ready">("loading");

  // ── Phase 1: Loading counter ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Paper starts hidden, pushed down and tilted
    gsap.set(paperRef.current, {
      scale: 0.82,
      rotateX: 18,
      y: 120,
      opacity: 0,
      borderRadius: "24px",
      boxShadow: "0 60px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
    });

    // Count 0 → 100
    gsap.to(counterObj.current, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterTextRef.current) {
          counterTextRef.current.textContent = Math.round(counterObj.current.val).toString();
        }
      },
      onComplete: () => setPhase("popup"),
    });
  }, []);

  // ── Phase 2: Pop-up reveal ──────────────────────────────
  useEffect(() => {
    if (phase !== "popup") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("ready");
        document.body.style.overflow = "";
      },
    });

    // Fade out the black loader
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Pop the paper up from below into its "resting" position on the table
    tl.to(
      paperRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "expo.out",
      },
      "-=0.3"
    );

    // After pop-up, hide the loader div entirely
    tl.set(loaderRef.current, { display: "none" });
  }, [phase]);

  // ── Phase 3: Scroll-driven unroll ───────────────────────
  useEffect(() => {
    if (phase !== "ready") return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "+=50%",
        scrub: 0.5,
      },
    });

    tl.to(paperRef.current, {
      scale: 1,
      rotateX: 0,
      borderRadius: "0px",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 1,
      ease: "none",
    });

    // Fade the dark background
    tl.to(
      ".unfurl-dark-bg",
      {
        opacity: 0,
        duration: 1,
        ease: "none",
      },
      "<"
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [phase]);

  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ perspective: "1200px", perspectiveOrigin: "center 40%" }}
    >
      {/* ── Loading overlay ─────────────────────────────── */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center gap-6"
      >
        <span
          ref={counterTextRef}
          className="font-mono font-black text-white/10 tabular-nums select-none"
          style={{ fontSize: "clamp(8rem, 28vw, 26rem)" }}
        >
          0
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">
          The Hypertext Herald
        </span>
      </div>

      {/* ── Dark surface (always behind paper) ──────────── */}
      <div className="unfurl-dark-bg fixed inset-0 bg-[#0e0e0e] z-[-1] pointer-events-none" />

      {/* ── The paper (contains all children) ──────────── */}
      <div
        ref={paperRef}
        className="relative w-full will-change-transform"
        style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
      >
        {children}
      </div>
    </div>
  );
}
