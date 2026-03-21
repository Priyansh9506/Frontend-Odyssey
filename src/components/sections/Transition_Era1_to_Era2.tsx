"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Transition_Era1_to_Era2 = () => {
  const containerRef = useRef<HTMLElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef({ value: 1969 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.8,
        },
      });

      // 1. Tick the year counter from 1969 → 1995
      tl.to(counterRef.current, {
        value: 1995,
        duration: 5,
        ease: "power1.inOut",
        onUpdate: () => {
          if (yearRef.current) {
            yearRef.current.textContent = Math.round(counterRef.current.value).toString();
          }
        },
      });

      // 2. Morph backgrounds: paper → teal
      tl.to(".bg-transition-overlay", {
        opacity: 1,
        duration: 4,
        ease: "sine.inOut",
      }, "<");

      // 3. CRT scanlines fade in
      tl.to(".crt-overlay", {
        opacity: 0.25,
        duration: 3,
      }, "<0.5");

      // 4. Boot sequence text reveals
      tl.fromTo(
        ".boot-line",
        { opacity: 0, x: -30, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          stagger: 0.6,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=4"
      );

      // 5. Slight camera shake at the end
      tl.to(containerRef.current, {
        x: 3,
        yoyo: true,
        repeat: 5,
        duration: 0.08,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#f4f1ea] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Win95 teal fade layer */}
      <div className="bg-transition-overlay absolute inset-0 bg-[#008080] opacity-0 z-0" />

      {/* CRT Scanlines */}
      <div
        className="crt-overlay absolute inset-0 pointer-events-none z-30 opacity-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl text-center px-6">
        <h2 className="font-sans text-lg md:text-2xl uppercase tracking-[0.6em] font-bold mb-6 text-[#1a1a1a]/60 mix-blend-difference">
          Dialing the Future
        </h2>

        {/* Massive year */}
        <div
          ref={yearRef}
          className="font-mono font-black tracking-tighter leading-none tabular-nums text-[#1a1a1a] mix-blend-difference"
          style={{ fontSize: "clamp(6rem, 28vw, 22rem)" }}
        >
          1969
        </div>

        {/* Boot sequence terminal */}
        <div className="mt-10 flex flex-col gap-3 font-mono text-base md:text-xl text-left w-full max-w-xl bg-black/80 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-green-500/20 shadow-[0_0_40px_rgba(0,255,0,0.05)]">
          <span className="boot-line text-yellow-400 opacity-0">
            &gt; 1989: Tim Berners-Lee proposes World Wide Web…
          </span>
          <span className="boot-line text-green-400 opacity-0">
            &gt; 1991: CERN opens HTTP to the public…
          </span>
          <span className="boot-line text-green-400 opacity-0">
            &gt; 1993: Mosaic browser catalyzes web adoption…
          </span>
          <span className="boot-line text-red-400 font-bold opacity-0">
            &gt; 1995: The Browser Wars begin. Commercialization hits.
          </span>
          <span className="boot-line text-white animate-pulse opacity-0">█</span>
        </div>
      </div>
    </section>
  );
}


export default Transition_Era1_to_Era2;
