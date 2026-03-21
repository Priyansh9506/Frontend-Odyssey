"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Era3_Web2() {
  const sectionRef = useRef<HTMLElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scroll the feed posts upward
      gsap.to(feedRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Left-side text entrance
      gsap.from(".web2-text-reveal", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-zinc-50 flex items-center justify-center overflow-hidden"
    >
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2
          className="font-sans font-black tracking-tighter text-black/[0.03]"
          style={{ fontSize: "clamp(10rem, 35vw, 40rem)" }}
        >
          WEB2
        </h2>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 px-6 md:px-12 items-center z-10">
        {/* Left: narrative */}
        <div className="flex flex-col gap-6 font-sans text-lg md:text-xl leading-relaxed text-zinc-700">
          <div className="web2-text-reveal">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 border-l-[6px] border-blue-500 pl-6 leading-[1.05]">
              The Rise of<br />the Platform
            </h2>
          </div>
          <p className="web2-text-reveal">
            The chaotic creativity of the 90s dissolved into clean grids,
            centralized platforms, and the endless scroll. We traded quirky
            homepages for uniform, algorithmic feeds.
          </p>
          <p className="web2-text-reveal text-zinc-500 font-medium">
            User-generated content exploded. The web was no longer read-only — it
            was a deeply interactive, mobile-first marketplace of attention.
          </p>

          <div className="web2-text-reveal flex gap-4 mt-6">
            <Magnetic>
              <button className="px-7 py-3 bg-blue-500 text-white rounded-full font-bold text-sm tracking-wider uppercase hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
                Like
              </button>
            </Magnetic>
            <Magnetic>
              <button className="px-7 py-3 bg-zinc-200 text-zinc-800 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-zinc-300 transition-all hover:scale-105">
                Share
              </button>
            </Magnetic>
            <Magnetic>
              <button className="px-7 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold text-sm tracking-wider uppercase hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105">
                Follow
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right: mock phone feed */}
        <div className="relative w-full h-[72vh] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-zinc-200/80 overflow-hidden flex flex-col">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-30" />

          {/* Header */}
          <div className="h-20 border-b border-zinc-100 flex items-center justify-between px-8 bg-white/90 backdrop-blur-xl z-20 absolute top-0 w-full">
            <div className="font-black text-xl tracking-tight text-black font-sans">
              Feed
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
          </div>

          {/* Scrollable content */}
          <div className="relative w-full h-full pt-20 overflow-hidden bg-zinc-50/50">
            <div ref={feedRef} className="flex flex-col gap-4 p-4">
              {/* Post 1 */}
              <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl shadow-sm border border-zinc-100">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                  <div>
                    <div className="font-bold text-sm text-zinc-900">
                      Tech Historian
                    </div>
                    <div className="text-xs text-zinc-400">2h ago</div>
                  </div>
                </div>
                <div className="w-full h-44 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center">
                  <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">
                    🖼 Image
                  </span>
                </div>
                <p className="font-medium text-zinc-700 text-sm">
                  Remember coding your own HTML for MySpace layouts? Good times.
                  #Web2 #Nostalgia
                </p>
                <div className="flex gap-6 text-zinc-400 text-xs font-bold pt-2 border-t border-zinc-100">
                  <span>♥ 2.4k</span>
                  <span>💬 128</span>
                  <span>↗ Share</span>
                </div>
              </div>

              {/* Post 2 */}
              <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl shadow-sm border border-zinc-100">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-rose-500" />
                  <div>
                    <div className="font-bold text-sm text-zinc-900">
                      Aesthetic Daily
                    </div>
                    <div className="text-xs text-zinc-400">4h ago</div>
                  </div>
                </div>
                <p className="font-medium text-base leading-relaxed text-zinc-700">
                  Minimalism is the new internet. Gone are the tables and marquee
                  tags. Enter: CSS Grids, rounded corners, and infinite scrolling.
                </p>
              </div>

              {/* Post 3 */}
              <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl shadow-sm border border-zinc-100">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                  <div>
                    <div className="font-bold text-sm text-zinc-900">
                      InfluencerX
                    </div>
                    <div className="text-xs text-zinc-400">8h ago</div>
                  </div>
                </div>
                <div className="w-full h-56 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center">
                  <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">
                    ▶ Video
                  </span>
                </div>
                <div className="flex gap-6 text-zinc-400 text-xs font-bold pt-2 border-t border-zinc-100">
                  <span>♥ 12.1k</span>
                  <span>💬 943</span>
                  <span>↗ Share</span>
                </div>
              </div>

              {/* Post 4 */}
              <div className="flex flex-col gap-3 p-5 bg-white rounded-2xl shadow-sm border border-zinc-100">
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
                  <div>
                    <div className="font-bold text-sm text-zinc-900">
                      DevNewsletter
                    </div>
                    <div className="text-xs text-zinc-400">12h ago</div>
                  </div>
                </div>
                <p className="font-medium text-base leading-relaxed text-zinc-700">
                  Twitter launched in 2006. Instagram in 2010. By 2015, 3.2 billion
                  people were online. The attention economy had arrived.
                </p>
              </div>
            </div>
          </div>

          {/* Floating reactions */}
          <div className="absolute bottom-6 right-6 z-30 pointer-events-none flex flex-col gap-2">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-lg shadow-lg animate-bounce" style={{ animationDelay: "0s" }}>
              ❤️
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg shadow-lg animate-bounce" style={{ animationDelay: "0.3s" }}>
              👍
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-lg shadow-lg animate-bounce" style={{ animationDelay: "0.6s" }}>
              🔥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
