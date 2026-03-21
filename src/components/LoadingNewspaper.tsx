"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

export default function LoadingNewspaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef({ value: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Phase 1: Count from 0 → 100
  useEffect(() => {
    gsap.set(paperRef.current, {
      rotateX: 65,
      rotateY: -15,
      rotateZ: -8,
      scale: 0.08,
      yPercent: 80,
      opacity: 0,
    });

    gsap.to(counterRef.current, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = Math.round(counterRef.current.value) + "%";
        }
      },
      onComplete: () => setIsLoaded(true),
    });
  }, []);

  // Phase 2: Unfurl the newspaper
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    // Fade out the percentage counter
    tl.to(percentRef.current, {
      opacity: 0,
      scale: 1.5,
      duration: 0.4,
      ease: "power2.in",
    });

    // Unfurl the newspaper from a 3D rolled state
    tl.to(paperRef.current, {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      yPercent: 0,
      duration: 2.8,
      ease: "expo.inOut",
    }, "-=0.1");

    // Hold for a beat, then dissolve the overlay
    tl.to(containerRef.current, {
      autoAlpha: 0,
      duration: 1,
      delay: 0.6,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = "none";
        }
      },
    });
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
      style={{ perspective: "1200px" }}
    >
      {/* Percentage counter */}
      <div
        ref={percentRef}
        className="absolute inset-0 flex items-center justify-center font-mono font-black text-white/[0.04] select-none"
        style={{ fontSize: "clamp(8rem, 25vw, 28rem)" }}
      >
        0%
      </div>

      {/* Newspaper card */}
      <div
        ref={paperRef}
        className="w-[92vw] md:w-[68vw] max-w-5xl aspect-[3/4] md:aspect-[4/3] bg-[#f4f1ea] flex flex-col items-center justify-center p-10 md:p-16 border-[6px] border-[#1a1a1a]"
        style={{
          boxShadow: "0 0 120px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.5)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Decorative rule */}
        <div className="w-full border-t-[3px] border-b-[1px] border-[#1a1a1a] py-1 mb-4">
          <div className="w-full border-t-[1px] border-[#1a1a1a]" />
        </div>

        <h1
          className="font-serif font-black tracking-tighter uppercase text-center text-[#1a1a1a] leading-[0.85] w-full"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          The Hypertext Herald
        </h1>

        {/* Sub-rule */}
        <div className="w-full border-t-[1px] border-b-[3px] border-[#1a1a1a] py-1 mt-4 mb-6">
          <div className="w-full border-t-[1px] border-[#1a1a1a]" />
        </div>

        <div className="flex w-full justify-between items-center font-sans text-[10px] md:text-xs uppercase font-bold tracking-[0.25em] text-[#1a1a1a]/70">
          <span>Vol. I</span>
          <span>Est. 1969</span>
          <span>Late Edition</span>
        </div>

        <div className="mt-10 text-center font-serif italic text-xl md:text-2xl text-[#1a1a1a]/60 animate-pulse">
          Initializing Genesis Block…
        </div>
      </div>
    </div>
  );
}
