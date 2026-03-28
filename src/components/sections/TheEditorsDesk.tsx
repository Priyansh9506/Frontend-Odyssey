"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Tilt3D from "../Tilt3D";

gsap.registerPlugin(ScrollTrigger);

const TheEditorsDesk = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isAnimatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const flipContainerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".desk-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleFlip = () => {
    if (!flipContainerRef.current || !frontRef.current || !backRef.current) return;
    if (isAnimatingRef.current) return; // prevent double-clicks
    isAnimatingRef.current = true;

    const nextFlippedState = !isFlipped;

    // Measure BOTH heights BEFORE changing state, using temporary position:relative
    // so we always get the natural content height regardless of current DOM state.
    const frontOrigPos = frontRef.current.style.position;
    frontRef.current.style.position = "relative";
    const measuredFrontHeight = frontRef.current.offsetHeight || 600;
    frontRef.current.style.position = frontOrigPos;

    const backOrigPos = backRef.current.style.position;
    const backOrigVis = backRef.current.style.visibility;
    backRef.current.style.position = "relative";
    backRef.current.style.visibility = "hidden";
    const measuredBackHeight = backRef.current.offsetHeight;
    backRef.current.style.position = backOrigPos;
    backRef.current.style.visibility = backOrigVis;

    const targetHeight = nextFlippedState ? measuredBackHeight : measuredFrontHeight;

    // Now update React state
    setIsFlipped(nextFlippedState);

    const tl = gsap.timeline({
      onComplete: () => {
        if (flipContainerRef.current) {
          flipContainerRef.current.style.height = nextFlippedState ? 'auto' : measuredFrontHeight + 'px';
        }
        ScrollTrigger.refresh();
        if (lenis) {
          lenis.resize();
          requestAnimationFrame(() => lenis.resize());
        }
        isAnimatingRef.current = false;
      }
    });

    // Perfectly synchronized, ultra-smooth Expo easing prevents out-of-bounds 
    // rotation values that break backface-visibility when sweeping past 180 degrees.
    tl.to(flipContainerRef.current, {
      height: targetHeight,
      rotateY: nextFlippedState ? 180 : 0,
      duration: 1.2,
      ease: "expo.inOut"
    });
  };

  return (
    <section ref={containerRef} className="relative w-full pt-16 md:pt-20 pb-8 md:pb-12 px-4 md:px-12 flex flex-col items-center bg-paper text-ink border-x-[8px] md:border-x-[40px] border-paper z-20 overflow-hidden" style={{ perspective: "2000px" }}>
      
      {/* Newspaper Footer Header */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-t-[8px] border-ink pt-8 pb-10 mb-8 desk-reveal">
        <h2 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-center">
          The Editor&apos;s Desk
        </h2>
      </header>

      {/* The Flipping Newspaper Block */}
      <div 
        ref={flipContainerRef}
        className="relative w-full max-w-7xl mx-auto desk-reveal group will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* ======================================= */}
        {/* FRONT FACE                              */}
        {/* ======================================= */}
        <div 
          ref={frontRef}
          className="w-full bg-[#f4ebd0] border-[4px] border-ink flex flex-col items-center justify-center p-6 md:p-8 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.15)] z-20 hover:bg-[#eaddba] transition-colors overflow-hidden"
          onClick={toggleFlip}
          style={{ 
            backfaceVisibility: "hidden", 
            pointerEvents: isFlipped ? "none" : "auto",
            position: isFlipped ? "absolute" : "relative",
            inset: isFlipped ? 0 : undefined,
          }}
        >
          {/* Decorative Classifieds Background Pattern */}
          <div className="absolute inset-0 opacity-[0.06] flex gap-2 w-full" style={{ writingMode: 'vertical-rl' }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <p key={i} className="font-newspaper text-[10px] uppercase leading-none break-all text-justify h-full border-l border-ink/20 pl-1">
                CLASSIFIEDS {"//"} HISTORICAL ARCHIVE SECTION 0{i} {"//"} THE HYPERTEXT HERALD EST. 2026 {"//"} FROM ARPANET TO WEB3 {"//"} 
                WANTED: WEB DEVELOPERS FOR THE NEXT FRONTIER {"//"} LOST: 1 MILLION BITCOIN ON A HARD DRIVE {"//"} 
                FOUND: THE MEANING OF DECENTRALIZATION {"//"} 
              </p>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 max-w-lg text-center mt-8 relative z-20 bg-[#f4ebd0]/90 p-8 md:p-10 border-2 border-ink shadow-[8px_8px_0_0_#1a1a1a] transform transition-transform group-hover:-translate-y-2">
            
            {/* Top Secret Stamp */}
            <div className="absolute -top-8 -left-4 md:-top-10 md:-left-8 w-24 h-24 md:w-32 md:h-32 border-[4px] md:border-[6px] border-double border-[#DC2626] rounded-full flex flex-col items-center justify-center rotate-[-25deg] opacity-80 overflow-hidden mix-blend-multiply bg-transparent pointer-events-none">
              <span className="text-[#DC2626] font-black text-lg md:text-xl uppercase tracking-tighter leading-none mt-1">Classified</span>
              <span className="text-[#DC2626] font-bold text-[7px] md:text-[9px] tracking-widest border-t-[2px] border-dashed border-[#DC2626] mt-1 pt-0.5">DO NOT DISTRIBUTE</span>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC41JyBudW1PY3RhdmVzPScxJyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzEwMCcgaGVpZ2h0PScxMDAnIGZpbHRlcj0ndXJsKCNuKScgb3BhY2l0eT0nMC4yNScvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay"></div>
            </div>

            <h3 className="font-serif text-4xl md:text-6xl font-black uppercase text-ink mt-4 md:mt-6">
              Turn to the<br/>Back Page
            </h3>
            
            <p className="font-newspaper text-lg md:text-xl text-ink/80 border-y-[1px] border-ink/40 py-4">
              A brief word on the architecture, the aesthetic philosophy, and the architect behind The Hypertext Herald.
            </p>
            
            <div className="mt-4 px-6 py-3 bg-[#DC2626] text-paper font-sans font-black uppercase tracking-[0.2em] transition-all hover:bg-ink cursor-pointer">
              Read Manifesto
            </div>
          </div>
        </div>

        {/* ======================================= */}
        {/* BACK FACE                               */}
        {/* ======================================= */}
        <div 
          ref={backRef}
          className="w-full bg-paper border-[4px] border-ink shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-6 md:p-12 flex flex-col z-10 overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            position: isFlipped ? "relative" : "absolute",
            inset: isFlipped ? undefined : 0,
            pointerEvents: isFlipped ? "auto" : "none" 
          }}
        >
          <h3 className="font-serif text-3xl md:text-6xl font-black uppercase border-b-4 border-ink pb-4 mb-6 md:mb-8 text-center md:text-left">
            The Publishing Manifesto
          </h3>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 font-newspaper">
            
            {/* Left Column */}
            <div className="xl:col-span-8 flex flex-col gap-8 xl:pr-10 xl:border-r-[2px] xl:border-ink/40">
              
              <div>
                <h4 className="font-sans text-lg md:text-xl font-black uppercase tracking-widest text-[#DC2626] mb-4">I. About the Site</h4>
                <p className="text-base md:text-lg leading-relaxed text-justify first-letter:text-[3rem] md:first-letter:text-[4rem] first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] mb-4">
                  The Hypertext Herald is a passion project built to chronicle the monumental shifts of the internet generation. From the cold war bunkers of ARPANET to the speculative frenzy of Web 3.0, the web&apos;s history isn&apos;t just about technology—it&apos;s about culture, power, and human connection.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-justify">
                  Every era demands a different lens. This interactive documentary strips away modern UI conveniences to force a direct confrontation with the raw, textural history of the medium.
                </p>
              </div>

              <div className="w-full h-[2px] bg-ink/20"></div>

              <div>
                <h4 className="font-sans text-lg md:text-xl font-black uppercase tracking-widest text-[#DC2626] mb-4">II. Design Philosophy</h4>
                <div className="text-base md:text-lg leading-relaxed text-justify gap-4 flex flex-col">
                  <p className="font-bold italic text-lg md:text-xl border-l-[4px] border-[#DC2626] pl-4">
                    &quot;Breathing Soul Into The Broadsheet&quot;
                  </p>
                  <p>
                    Before the internet, the world connected through ink and paper. We are bringing that soul back to the digital age. By employing bleeding-edge web technology, we&apos;ve made the static broadsheet feel alive.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li><strong>Depth &amp; Perspective:</strong> Interactive 3D tilt cards blur the line between screen and paper.</li>
                    <li><strong>Living History:</strong> Animated SVG timelines trace the actual growth of the network and corporate acquisitions.</li>
                    <li><strong>Cinematic Motion:</strong> Videos embed seamlessly into custom &apos;Daily Prophet&apos; moving photographs.</li>
                  </ul>
                  <p className="mt-2 font-bold uppercase tracking-wider text-sm">
                    It is a love letter to the past, built entirely with the tools of the future.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="xl:col-span-4 flex flex-col justify-start h-full mt-6 xl:mt-0">
              <div className="flex flex-col gap-6">
                <h4 className="font-sans text-lg md:text-xl font-black uppercase tracking-widest bg-ink text-paper inline-block px-3 py-1 self-center xl:self-start">
                  The Architect
                </h4>
                
                <Tilt3D intensity={10}>
                  <div className="w-64 xl:w-full mx-auto aspect-square border-[4px] border-ink overflow-hidden grayscale contrast-125 relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/images/Priyansh.webp" 
                      alt="Priyansh - System Architect" 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-ink/20 mix-blend-color pointer-events-none"></div>
                  </div>
                </Tilt3D>

                <div className="flex flex-col gap-2 font-sans items-center xl:items-start text-center xl:text-left mt-2">
                  <p className="font-black uppercase text-2xl tracking-tighter">Priyansh</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">Frontend Odyssey Hacker</p>
                  <p className="font-newspaper text-base md:text-lg mt-2 leading-tight px-4 xl:px-0">
                    A specialized artisan of the digital frontier, merging raw code with cinematic storytelling.
                  </p>
                  <div className="flex flex-col gap-3 mt-6 w-full max-w-[240px]">
                    <a 
                      href="https://github.com/Priyansh9506" 
                      target="_blank" 
                      rel="noreferrer"
                      className="border-[3px] border-ink w-full text-center px-10 py-3 font-black text-sm uppercase hover:bg-[#DC2626] hover:border-[#DC2626] hover:text-white transition-colors"
                    >
                      GitHub Archives
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/priyansh-patel-046190264/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="border-[3px] border-[#0A66C2] text-[#0A66C2] w-full text-center px-10 py-3 font-black text-sm uppercase hover:bg-[#0A66C2] hover:text-white transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <div className="w-full border-t-4 border-ink mt-8 md:mt-12 pt-6 md:pt-8 flex justify-center pb-2 md:pb-4">
            <button 
              onClick={toggleFlip}
              className="font-sans text-xs md:text-lg uppercase font-black bg-[#DC2626] text-paper px-6 md:px-8 py-3 hover:bg-ink transition-colors cursor-pointer w-full md:w-auto text-center"
            >
              Close Editor&apos;s Notes
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheEditorsDesk;
