"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Image from "next/image";

export default function RetroWeb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hits, setHits] = useState(1995000);
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    // A funky 90s entrance animation
    const ctx = gsap.context(() => {
      gsap.from(".retro-element", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // Simple counter animation for the hit counter
      const interval = setInterval(() => {
        setHits(prev => prev + Math.floor(Math.random() * 5));
      }, 3000);

      return () => clearInterval(interval);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="retro-cursor w-full min-h-screen py-20 px-4 md:px-12 flex flex-col items-center justify-center"
      // Authentic 90s tiled background using CSS inline style pattern
      style={{
        backgroundColor: "#000080", // Classic Navy Blue 90s BG
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z\\' fill=\\'%230000ff\\' fill-opacity=\\'0.2\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')",
        fontFamily: "'Times New Roman', Times, serif"
      }}
    >
      {/* MOBILE / TABLET VIEW: System Error regarding mobile devices */}
      <div className="flex xl:hidden w-full max-w-sm md:max-w-lg lg:max-w-xl bg-[#c0c0c0] border-t-[4px] border-l-[4px] border-white border-b-[4px] border-r-[4px] border-[#808080] p-1 flex-col retro-element z-10 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)]">
        <div className="bg-[#000080] text-white font-bold px-2 md:px-4 py-1 md:py-2 flex justify-between items-center text-sm md:text-base font-sans mb-4">
          <span>Error - Unknown Device</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center justify-center text-black text-[10px] md:text-xs font-sans font-bold cursor-pointer hover:bg-red-500 hover:text-white">X</div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 md:gap-6 px-4 md:px-8 pb-6 md:pb-8 font-sans text-center">
          <div className="text-5xl md:text-7xl">🛑</div>
          <div>
            <p className="font-bold text-lg md:text-2xl mb-2 md:mb-3">UNSUPPORTED DEVICE</p>
            <p className="text-sm md:text-base">
              Our servers indicate you are attempting to access the World Wide Web from a &quot;mobile phone&quot; or &quot;tablet&quot;.
            </p>
            <p className="text-sm md:text-base mt-3 md:mt-4 font-bold text-red-600">
              * CRITICAL: These futuristic devices will not be invented for another decade!
            </p>
            <p className="text-sm md:text-base mt-3 md:mt-4">
              Please return to your 56k dial-up modem and bulky CRT monitor to view this 1995 website safely.
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center pb-4 md:pb-6">
          <div className="bg-[#c0c0c0] border-t-4 border-l-4 border-white border-b-4 border-r-4 border-[#808080] active:border-t-4 active:border-l-4 active:border-[#808080] active:border-b-4 active:border-r-4 active:border-white px-8 md:px-12 py-1 md:py-2 font-sans font-bold text-sm md:text-base hover:cursor-pointer mx-auto">
            OK
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW: Netscape Navigator */}
      <div className="hidden xl:flex w-full max-w-4xl bg-[#c0c0c0] border-t-[4px] border-l-[4px] border-white border-b-[4px] border-r-[4px] border-[#808080] p-1 flex-col retro-element">
        {/* Retro Window Header */}
        <div className="bg-[#000080] text-white font-bold px-2 py-1 flex justify-between items-center text-sm font-sans">
          <span>Netscape Navigator - Welcome to the World Wide Web</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center justify-center text-black text-xs font-sans">_</div>
            <div className="w-4 h-4 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center justify-center text-black text-[10px] font-sans">□</div>
            <div className="w-4 h-4 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] flex items-center justify-center text-black text-xs font-sans font-bold cursor-pointer hover:bg-red-500 hover:text-white">X</div>
          </div>
        </div>

        {/* Browser Toolbar Menu */}
        <div className="bg-[#c0c0c0] flex gap-4 px-2 py-1 text-sm font-sans border-b-2 border-[#808080]">
          <span className="cursor-pointer">File</span>
          <span className="cursor-pointer">Edit</span>
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Go</span>
          <span className="cursor-pointer">Bookmarks</span>
          <span className="cursor-pointer">Options</span>
          <span className="cursor-pointer">Directory</span>
          <span className="cursor-pointer">Help</span>
        </div>

        <div className="bg-white m-2 border-[inset] border-4 p-4 md:p-8 flex flex-col gap-6 relative overflow-hidden">
          
          <div className="text-center w-full relative">
            <div className="flex justify-center items-center gap-4 mb-4 retro-element">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/giphy.gif" alt="Spinning 3D Skull" className="w-12 md:w-16 h-12 md:h-16 pixelated inline-block" />
              <h1 className="text-3xl md:text-5xl font-bold text-[#0000ff] underline">
                Welcome to my Home Page!
              </h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/giphy.gif" alt="Spinning 3D Skull" className="w-12 md:w-16 h-12 md:h-16 pixelated inline-block" style={{ transform: "scaleX(-1)" }} />
            </div>
            
            {/* Authentic HTML Marquee implementation using CSS animation fallback */}
            <div className="w-full overflow-hidden bg-yellow-200 border border-black py-1 retro-element">
              <p className="whitespace-nowrap inline-block animate-[marquee_10s_linear_infinite] text-red-600 font-bold">
                ⚠️ This site is best viewed in Netscape Navigator 3.0 at 800x600 resolution! ⚠️
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 retro-element mt-4">
            <div className="col-span-1 md:col-span-2 text-black">
              <p className="mb-4">
                Hi! Welcome to my slice of the internet. The <strong>World Wide Web</strong> is growing so fast, and I wanted to make sure I claimed my domain before it was too late! 
              </p>
              <p className="mb-4">
                Did you hear about this new site called <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="text-[#0000ff] underline hover:text-purple-600">Amazon.com</a>? They sell books online, but honestly I don&apos;t see why I wouldn&apos;t just go to the bookstore. 
              </p>
              
              <div className="border-[outset] border-4 border-[#c0c0c0] bg-[#e0e0e0] p-4 text-center my-6 relative">
                
                <p className="font-bold text-red-600 animate-pulse text-xl">⭐⭐ NEW UPDATES ⭐⭐</p>
                <ul className="text-left mt-4 text-sm md:text-base list-disc list-inside">
                  <li>Added a Guestbook! Please sign it!</li>
                  <li>Updated my WebRing links.</li>
                  <li>Added sick MIDI background music (currently playing).</li>
                  <li className="flex items-center justify-start gap-2 mt-2">
                    Check out my cool 3D spinning skull GIF! 
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/giphy.gif" className="w-6 h-6 inline-block" alt="skull" />
                  </li>
                </ul>
              </div>

            </div>

            <div className="col-span-1 flex flex-col items-center gap-4 text-center border-2 border-dashed border-gray-400 p-4 bg-gray-100">
              <p className="font-bold">My Favorite Links:</p>
              <ul className="flex flex-col gap-2">
                <li><a href="https://www.yahoo.com" target="_blank" rel="noopener noreferrer" className="text-[#0000ff] underline hover:text-purple-600">Yahoo! Directory</a></li>
                <li><a href="https://en.wikipedia.org/wiki/AltaVista" target="_blank" rel="noopener noreferrer" className="text-[#0000ff] underline hover:text-purple-600">AltaVista Search</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Yahoo!_GeoCities" target="_blank" rel="noopener noreferrer" className="text-[#0000ff] underline hover:text-purple-600">GeoCities Neighborhoods</a></li>
                <li><a href="https://en.wikipedia.org/wiki/Pets.com" target="_blank" rel="noopener noreferrer" className="text-[#0000ff] underline hover:text-purple-600">Pets.com (Great stock!)</a></li>
              </ul>
              
              <div className="mt-auto w-full border-t-2 border-gray-400 pt-4 flex flex-col items-center">
                <span className="text-xs font-bold font-sans">You are visitor number:</span>
                <div className="bg-black text-[#00ff00] font-mono text-xl md:text-2xl px-2 py-1 tracking-[0.2em] border-2 border-gray-500 mt-1 shadow-inner">
                  {hits.toString().padStart(8, '0')}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive elements */}
          <div className="w-full flex justify-center gap-8 mt-4 retro-element">
            <button 
              onClick={() => {
                setButtonPressed(true);
                setTimeout(() => setButtonPressed(false), 2000);
              }}
              className="bg-[#c0c0c0] border-t-4 border-l-4 border-white border-b-4 border-r-4 border-[#808080] active:border-t-4 active:border-l-4 active:border-[#808080] active:border-b-4 active:border-r-4 active:border-white px-8 py-2 font-sans font-bold hover:cursor-pointer"
            >
              Sign my Guestbook!
            </button>
          </div>
          
          {buttonPressed && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#c0c0c0] border-[outset] border-4 p-4 z-50 font-sans text-center shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
              <div className="bg-[#000080] text-white px-2 py-1 font-bold mb-4 w-full text-left flex justify-between">
                <span>Alert</span>
                <span className="cursor-pointer">X</span>
              </div>
              <div className="flex items-center gap-4 px-4 pb-4">
                <div className="text-3xl">⚠️</div>
                <p>Error 404: Guestbook script crashed.<br/>The server is overwhelmed!</p>
              </div>
              <button className="bg-[#c0c0c0] border-[outset] border-2 px-6 py-1 mx-auto block" onClick={() => setButtonPressed(false)}>OK</button>
            </div>
          )}

          <div className="w-full flex justify-center mt-8 pt-4 border-t-4 border-black border-double retro-element">
            <p className="text-xs text-center font-sans">
              Copyright © 1996.<br/>
              Created with Microsoft FrontPage.<br/>
              Hosted on GeoCities Area 51.
            </p>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </section>
  );
}
