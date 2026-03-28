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
const PageUnfurl = ({ children }: { children: React.ReactNode }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"loading" | "popup" | "ready">("loading");

  // ── Phase 1: Setup initial state & loading counter ─────────
  useEffect(() => {
    if (window.innerWidth < 1024) {
      if (loaderRef.current) loaderRef.current.style.display = "none";
      const darkBg = document.querySelector('.unfurl-dark-bg') as HTMLElement;
      if (darkBg) darkBg.style.display = "none";
      // Clear GPU/overflow styles so page scrolls freely on mobile/tablet
      if (outerRef.current) {
        outerRef.current.style.overflow = "visible";
        outerRef.current.style.perspective = "none";
      }
      if (paperRef.current) {
        paperRef.current.style.transform = "none";
        paperRef.current.style.willChange = "auto";
      }
      setPhase("ready");
      return;
    }

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

    const tl = gsap.timeline({
      onComplete: () => setPhase("popup"),
    });

    // 2026 to 1969 counter animation
    tl.to(
      { val: 2026 },
      {
        val: 1969,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: function () {
          if (counterTextRef.current) {
            counterTextRef.current.textContent = Math.round(this.targets()[0].val).toString();
          }
        },
      }
    );

    // Fade counter out slightly before pop-up
    tl.to(
      ".loader-content",
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.35"
    );

    return () => {
      tl.kill();
    };
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

    // Provide the content an elegant staged entry like the original version
    tl.fromTo(
      paperRef.current?.querySelectorAll("h1, h2, h3, p, img, button, .meta-fade") || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.05, ease: "power3.out" },
      "-=1.0"
    );

    // After pop-up, hide the loader div entirely
    tl.set(loaderRef.current, { display: "none" });
  }, [phase]);

  // ── Phase 3: Scroll-driven unroll ───────────────────────
  useEffect(() => {
    if (phase !== "ready") return;
    if (window.innerWidth < 768) {
      // Still clean up overflow so page scrolls freely
      if (outerRef.current) {
        outerRef.current.style.overflow = "visible";
        outerRef.current.style.perspective = "none";
      }
      if (paperRef.current) {
        paperRef.current.style.transform = "none";
        paperRef.current.style.willChange = "auto";
      }
      const darkBg = document.querySelector('.unfurl-dark-bg') as HTMLElement;
      if (darkBg) darkBg.style.display = "none";
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outerRef.current,
        start: "top top",
        end: "+=50%",
        scrub: 0.8,
        onLeave: (self) => {
          // Smoothly finish rather than force-snap
          gsap.to(paperRef.current, {
            scale: 1,
            rotateX: 0,
            borderRadius: "0px",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              // Clean up GPU-heavy styles to prevent ongoing jank
              if (paperRef.current) {
                paperRef.current.style.willChange = "auto";
                paperRef.current.style.transformStyle = "flat";
                paperRef.current.style.transform = "none";
              }
              if (outerRef.current) {
                outerRef.current.style.perspective = "none";
                outerRef.current.style.overflow = "visible";
              }
              // Hide the dark bg now that paper is fully open
              const darkBg = document.querySelector('.unfurl-dark-bg') as HTMLElement;
              if (darkBg) darkBg.style.display = "none";
            }
          });
          self.kill(false);
        }
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

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [phase]);

  return (
    <>
      {/* ── Loading overlay (black background) ─────────── */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center text-paper"
      >
        {phase === "loading" && (
          <div className="loader-content flex flex-col items-center gap-4">
            <h2 className="font-serif text-2xl uppercase tracking-[0.3em] opacity-50 text-center">
              The Hypertext Herald
            </h2>
            <div 
              ref={counterTextRef}
              className="text-8xl md:text-9xl tracking-tighter"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              2026
            </div>
          </div>
        )}
      </div>

      {/* ── Dark surface (always behind paper, covers viewport smoothly) ──────────── */}
      <div className="unfurl-dark-bg fixed inset-0 w-full h-full bg-[#0e0e0e] z-[-1] pointer-events-none" />

      {/* ── Perspective Wrapper ──────────── */}
      <div
        ref={outerRef}
        className="relative w-full overflow-hidden"
        style={{ perspective: "1200px", perspectiveOrigin: "center 40%" }}
      >
        {/* ── The paper (contains all children) ──────────── */}
        <div
          ref={paperRef}
          className="relative w-full will-change-transform"
          style={{ transformStyle: "preserve-3d", transformOrigin: "center top" }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default PageUnfurl;
