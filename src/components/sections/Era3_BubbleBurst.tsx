"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt3D from "@/components/Tilt3D";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ticker data with realistic historical crash figures
const tickers = [
  { name: "NASDAQ", dir: "down", val: "78%" },
  { name: "PETS.COM", dir: "down", val: "99%" },
  { name: "AMAZON", dir: "up", val: "94%" },
  { name: "WEBVAN", dir: "down", val: "94%" },
  { name: "ETOYS", dir: "down", val: "99%" },
  { name: "EBAY", dir: "up", val: "SURVIVES" },
  { name: "INFOSEEK", dir: "down", val: "88%" },
  { name: "THEGLOBE.COM", dir: "down", val: "97%" },
  { name: "WORLDCOM", dir: "down", val: "99%" },
  { name: "GEOCITIES", dir: "down", val: "85%" },
];

const TickerRow = () => (
  <>
    {tickers.map((t, i) => (
      <span key={i} className="flex items-center shrink-0">
        <span className="px-6 md:px-10">
          {t.name}{" "}
          <span className={t.dir === "down" ? "text-accent" : "text-green-600"}>
            {t.dir === "down" ? "▼" : "▲"}
          </span>{" "}
          <span className="font-sans font-light">
            {t.val}
          </span>
        </span>
        <span className="text-ink/15 text-[4vw] md:text-[2.5vw] shrink-0">✦</span>
      </span>
    ))}
  </>
);

export default function Era3_BubbleBurst() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Shaky/Chaotic text reveal
      gsap.fromTo(
        ".crash-anim",
        { y: -20, opacity: 0, rotate: () => Math.random() * 10 - 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      gsap.fromTo(
        ".era3-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
      // (marquee is now pure CSS — no GSAP needed for it)
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-paper pt-32 pb-32 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper text-ink overflow-hidden"
    >
      {/* ── Chaotic Grid Background overlay ── */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M0 100L100 0M0 0L100 100\\' stroke=\\'rgba(26,26,26,0.02)\\' stroke-width=\\'2\\' fill=\\'none\\'%3E%3C/svg%3E')] opacity-30 pointer-events-none"></div>

      {/* Newspaper Header - Broken formatting */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[8px] border-ink border-dashed pb-6 mb-16 relative z-10">
        <h1 className="font-serif text-[11vw] leading-[0.8] uppercase font-black tracking-tighter text-ink text-center flex flex-col w-full px-4">
          <div className="w-full text-center border-b-4 border-ink pb-4 mb-4 transform -rotate-1 origin-bottom-left crash-anim">
            THE BUBBLE
          </div>
          <div className="text-accent transform rotate-1 origin-top-right crash-anim pb-2">
            BURSTS
          </div>
        </h1>
        <div className="w-full mt-6 flex justify-between items-center border-t-[4px] border-ink pt-4 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.2em] px-4">
          <span>Vol. 3 March 10, 2000</span>
          <span className="hidden md:inline-block outline-text text-center text-[#DC2626]">TRILLIONS ERASED OVERNIGHT</span>
          <button 
            onClick={() => {
              if (navigator.share) navigator.share({ title: 'The Hypertext Herald', url: window.location.href }).catch(() => {});
              else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
            }}
            className="text-paper bg-ink px-4 py-1 hover:bg-[#cc0000] transition-colors" 
            data-cursor="hover"
          >
            Share
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12 relative z-10 px-4 md:px-12">
        
        {/* Left Column (The Crash) */}
        <div className="xl:col-span-5 flex flex-col gap-6 font-newspaper text-lg md:text-xl leading-relaxed border-r-0 xl:border-r-[4px] xl:border-ink/20 pr-0 xl:pr-10">
          <Tilt3D intensity={5} className="block w-full">
            <div className="w-full overflow-hidden border-[4px] border-ink era3-reveal bg-zinc-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/stock-crash.png" 
                alt="Stock market crash symbolism"
                className="w-full h-auto object-cover" 
              />
            </div>
          </Tilt3D>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter border-b-[2px] border-ink pb-4 mt-4 era3-reveal">
            &quot;Get Big Fast&quot;<br/><span className="text-accent text-3xl md:text-4xl">Go Broke Faster.</span>
          </h2>
          
          <p className="first-letter:text-[5rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:leading-[0.75] text-justify era3-reveal">
            Between 1995 and its peak in March 2000, the NASDAQ composite stock market index surged 400%, fueled by unprecedented speculation in web-based companies. 
          </p>
          <p className="text-justify era3-reveal">
            Investors poured millions into any startup ending in &quot;.com&quot;, ignoring traditional metrics like profit, P/E ratios, or even viable business models. Throwing parties was standard; turning a profit was an afterthought.
          </p>
          <p className="text-justify font-bold mt-2 era3-reveal">
            When capital dried up in late 2000, the implosion was total. Companies like Pets.com, Webvan, and eToys burned through hundreds of millions before abruptly shutting off their servers forever.
          </p>
        </div>

        {/* Right Column (The Survivors) */}
        <div className="xl:col-span-7 flex flex-col gap-10">
          <h3 className="text-4xl font-serif font-bold border-b-4 border-ink pb-2 uppercase tracking-tight era3-reveal">From the Ashes: The Survivors</h3>
          
          <div className="flex flex-col gap-8">
            {/* Amazon Section */}
            <div className="flex flex-col md:flex-row gap-6 p-6 border-[2px] border-ink bg-white shadow-[8px_8px_0_0_#1a1a1a] mr-2 mb-2 era3-reveal group">
              <a href="https://en.wikipedia.org/wiki/Jeff_Bezos" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/3 border-[2px] border-ink overflow-hidden block group/img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/jeff-bezos-amazon.png" 
                  alt="Jeff Bezos in early Amazon days" 
                  className="w-full h-full object-cover min-h-[180px]"
                />
              </a>
              <div className="w-full md:w-2/3 font-newspaper text-lg flex flex-col justify-center">
                <p className="text-justify">
                  Founded by Jeff Bezos as an online bookstore, Amazon famously told investors they wouldn&apos;t see profits for years. Their stock plummeted from $107 to $6 during the crash. 
                </p>
                <p className="mt-2 text-justify">
                  By strictly prioritizing market share and infrastructure over short-term returns, they survived the purge to become the largest online retailer in the world.
                </p>
              </div>
            </div>

            {/* eBay Section */}
            <div className="flex flex-col md:flex-row gap-6 p-6 border-[2px] border-ink bg-white shadow-[8px_8px_0_0_#cc0000] mr-2 mb-2 era3-reveal group">
              <a href="https://en.wikipedia.org/wiki/EBay" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/3 border-[2px] border-ink overflow-hidden block group/img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/ebay-founders.png" 
                  alt="eBay founders in the early days" 
                  className="w-full h-full object-cover min-h-[180px]"
                />
              </a>
              <div className="w-full md:w-2/3 font-newspaper text-lg flex flex-col justify-center">
                <p className="text-justify">
                  Starting simply as &quot;AuctionWeb&quot; by Pierre Omidyar, eBay was unique: it was genuinely profitable from day one. Instead of holding massive inventory, they simply connected buyers with sellers for a tiny fee.
                </p>
                <p className="mt-2 text-justify">
                  While others burned cash on Super Bowl ads, eBay quietly built a monopoly on digital auctions, weathering the storm with incredibly high margins.
                </p>
              </div>
            </div>
            
            {/* Google / Web 2.0 Tease */}
            <div className="w-full mt-4 p-8 bg-ink border-[4px] border-ink text-paper text-center era3-reveal">
               <h4 className="font-sans text-xl md:text-2xl font-black uppercase tracking-widest mb-4">The Next Paradigm</h4>
               <p className="font-newspaper text-lg max-w-2xl mx-auto">
                 The crash wiped the slate clean. The gimmicks died, but the infrastructure—thousands of miles of fiber-optic cable laid during the boom—remained. The surviving algorithms, search engines, and social protocols quietly laid the bedrock for what was coming next: <span className="text-accent underline">Web 2.0</span>.
               </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* ── STOCK CRASH MARQUEE (pure CSS, GPU accelerated) ── */}
      <div className="w-full border-y-[1px] border-ink/30 mt-16 md:mt-24 overflow-hidden bg-transparent text-ink relative z-10 py-5 md:py-7">
        <div className="marquee-track font-serif text-[8vw] md:text-[5vw] leading-none tracking-tight uppercase whitespace-nowrap">
          <TickerRow />
          <TickerRow />
        </div>
      </div>

      {/* End of Volume 3 Marker */}
      <div className="w-full max-w-7xl mx-auto border-t-[12px] border-ink mt-12 mb-16 relative era3-reveal">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-8 text-ink font-sans font-black tracking-[0.5em] text-sm py-2 border-4 border-ink">END OF VOL. 3</div>
      </div>
    </section>
  );
}
