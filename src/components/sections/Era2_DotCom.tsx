"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Era2_DotCom() {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Marquee scroll tied to vertical scroll
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
      
      gsap.from(".dotcom-card", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="retro-cursor relative w-full min-h-[140vh] bg-[#008080] text-white flex flex-col items-center overflow-hidden border-t-[30px] border-[#c0c0c0] pb-32"
    >
      {/* Y2K Windows-like UI Header */}
      <div className="w-full h-14 bg-[#000080] flex items-center px-4 border-b-[4px] border-white justify-between shadow-2xl z-20 sticky top-0">
        <span className="font-sans text-white text-xl font-bold tracking-widest uppercase flex items-center gap-3">
          <div className="w-6 h-6 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e1/Netscape_Navigator_logo.svg')] bg-cover"></div>
          Netscape Navigator v4.0
        </span>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-[#c0c0c0] border-2 border-white border-b-black border-r-black flex items-center justify-center font-black text-black">_</div>
          <div className="w-8 h-8 bg-[#c0c0c0] border-2 border-white border-b-black border-r-black flex items-center justify-center font-black text-black">□</div>
          <div className="w-8 h-8 bg-red-600 border-2 border-white border-b-black border-r-black flex items-center justify-center font-black text-white">X</div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-24 px-8 max-w-6xl text-center w-full z-10">
        <h2 className="font-sans text-[10vw] md:text-[8rem] leading-[0.8] font-black text-yellow-400 drop-shadow-[6px_6px_0_#cc0000] mb-12 uppercase italic transform -skew-x-12">
          The Dot-Com<br/>Boom
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 w-full">
          {/* Timeline Info Card */}
          <div className="dotcom-card col-span-1 lg:col-span-1 bg-[#c0c0c0] p-1 border-[4px] border-white border-b-[#808080] border-r-[#808080] shadow-[12px_12px_0_black]">
            <div className="bg-[#000080] text-white font-sans p-2 border-b-2 border-white font-bold flex justify-between">
              <span>Timeline.exe</span>
              <span className="bg-[#c0c0c0] text-black px-1 font-bold">X</span>
            </div>
            <div className="bg-white text-black font-sans p-6 text-left h-full flex flex-col gap-4 text-lg">
              <p><strong>1994:</strong> Commercialization surges. Amazon.com launches, and 'Yahoo' organizes the vast web directory.</p>
              <p><strong>1995:</strong> The "Browser Wars" ignite as Microsoft releases Internet Explorer to battle Netscape. eBay enables online auctions.</p>
              <p><strong>1999:</strong> Peak euphoria. Global web users reach 150 million. Speculative investments in .com domains reach billions.</p>
            </div>
          </div>
          
          {/* Main Info Card */}
          <div className="dotcom-card col-span-1 lg:col-span-2 flex flex-col gap-6 font-sans text-xl leading-relaxed text-left bg-[#ff00ff] text-white p-8 border-[6px] border-[#00ffff] shadow-[12px_12px_0_#ffff00]">
            <h3 className="text-4xl font-black uppercase text-[#ffff00] drop-shadow-[3px_3px_0_black]">Irrational Exuberance!</h3>
            <p className="bg-black/50 p-4 font-bold border-l-4 border-[#ffff00]">
              The World Wide Web transitioned from a decentralized academic tool to a commercial gold rush. Startups with "dot-com" in their name raised ridiculous amounts of venture capital.
            </p>
            <p className="font-bold drop-shadow-[1px_1px_0_black]">
              Visitor counters, flashing marquees, and "Under Construction" GIFs defined this vibrant, messy era of web design. It was a digital Wild West of GeoCities pages and howling 56k dial-up modems.
            </p>
            <Magnetic>
              <button className="mt-auto block bg-black text-[#00ffff] py-4 px-8 text-2xl font-black border-4 border-[#ffff00] hover:bg-yellow-400 hover:text-black transition-colors uppercase cursor-pointer shadow-[0_0_20px_#ff00ff] mx-auto w-full" data-cursor="hover">
                Buy Pets.com Stock Now!
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="absolute bottom-12 w-[200vw] left-0 flex overflow-hidden bg-black py-6 border-y-[8px] border-yellow-400 shadow-[0_0_30px_yellow] z-20">
        <div ref={marqueeRef} className="flex font-mono text-4xl md:text-6xl font-black whitespace-nowrap text-[#00ffff] uppercase tracking-[0.2em] gap-16">
          <span>INVEST NOW</span>
          <span className="text-[#ff00ff]">THE INFO SUPERHIGHWAY</span>
          <span>YOU'VE GOT MAIL!</span>
          <span className="text-[#ffff00]">SURF THE WEB</span>
          <span>INVEST NOW</span>
          <span className="text-[#ff00ff]">THE INFO SUPERHIGHWAY</span>
          <span>YOU'VE GOT MAIL!</span>
          <span className="text-[#ffff00]">SURF THE WEB</span>
        </div>
      </div>
    </section>
  );
}
