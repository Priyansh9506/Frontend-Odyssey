"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Era1_Arpanet() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup ScrollTrigger for parallax and fade reveals
    const ctx = gsap.context(() => {
      // Parallax on image
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade up articles
      gsap.from(".article-reveal", {
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
    <section ref={sectionRef} className="relative w-full min-h-[180vh] bg-paper pt-32 px-4 md:px-12 flex flex-col items-center border-x-[16px] md:border-x-[40px] border-paper">
      
      {/* Newspaper Header */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[8px] border-ink pb-6 mb-12">
        <h1 
          ref={titleRef} 
          className="font-serif text-[12vw] leading-[0.85] uppercase font-black tracking-tighter text-ink text-center flex flex-col w-full"
        >
          <span className="w-full text-center border-b-2 border-ink pb-2 mb-2">The Hypertext</span>
          <span>Herald</span>
        </h1>
        <div className="w-full mt-4 flex justify-between items-center border-t-[4px] border-ink pt-3 font-sans text-xs md:text-sm uppercase font-bold tracking-[0.2em] px-4">
          <span>Vol. 1 — October 29, 1969</span>
          <span className="hidden md:inline-block">The Dawn of Packet Switching</span>
          <span className="text-accent">Two Cents</span>
        </div>
      </header>

      {/* Hero Content Grid (Multi-column) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (Main Article) */}
        <div className="lg:col-span-4 flex flex-col gap-6 font-serif text-lg leading-relaxed border-r-0 lg:border-r-[2px] lg:border-ink/60 pr-0 lg:pr-10 article-reveal">
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter border-b-4 border-ink pb-4">
            A Network is Born in the Shadows
          </h2>
          <p className="first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.8] text-justify text-xl">
            At 10:30 PM on October 29, 1969, history was quietly made. A computer at UCLA's Network Measurement Center attempted to send a message to the Stanford Research Institute across the newly formed ARPANET.
          </p>
          <p className="text-justify text-xl">
            The intended message was "LOGIN". The system spectacularly crashed after transmitting just two letters: <strong>"LO"</strong>. Yet, this humble failure marked the successful deployment of packet-switching technology—a breakthrough conceptualized by Paul Baran and Donald Davies that would eventually connect humanity across a unified digital plane.
          </p>
          <div className="mt-8 p-6 bg-ink text-paper font-sans text-sm font-bold uppercase tracking-widest border-l-[8px] border-accent">
            "We were supposed to transmit 'LOGIN'. We typed the L, and they got the L. We typed the O, and they got the O. Then we typed the G, and the system crashed."
            <br/><br/><span className="text-zinc-400">— Leonard Kleinrock</span>
          </div>
        </div>

        {/* Center Column (Featured Image) */}
        <div className="lg:col-span-5 flex flex-col items-center article-reveal">
          <div className="w-full h-[65vh] overflow-hidden border-[4px] border-ink bg-zinc-200 relative shadow-[12px_12px_0px_#1a1a1a]">
            {/* Using a vintage tech lab placeholder image */ }
            <div 
              ref={imageRef} 
              className="w-full h-[130%] bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center absolute top-[-15%] left-0 sepia-[0.8] grayscale-[0.5] contrast-150"
            ></div>
            {/* Vintage CRT print overlay effect */}
            <div className="absolute inset-0 bg-ink/20 mix-blend-color-burn pointer-events-none"></div>
          </div>
          <p className="font-sans text-xs uppercase font-bold tracking-widest mt-6 w-full text-right border-b-2 border-ink pb-4">
            Fig 1. — The Interface Message Processor (IMP).
          </p>
          
          <div className="w-full mt-6 text-justify font-serif text-lg leading-relaxed">
            <h3 className="text-3xl font-bold uppercase mb-4 leading-none">The @ Symbol Arrives</h3>
            <p>In 1971, Ray Tomlinson developed the first network email system. To distinguish the user from the host computer, he elegantly chose the "@" symbol. Electronic mail rapidly became the network's most essential application, turning data lines into lifelines of communication.</p>
          </div>
        </div>

        {/* Right Column (Sidebar Timeline) */}
        <div className="lg:col-span-3 flex flex-col gap-8 font-serif border-l-0 lg:border-l-[2px] lg:border-ink/60 pl-0 lg:pl-10 article-reveal">
          <h3 className="text-2xl font-black uppercase border-y-[4px] border-ink py-3 text-center tracking-widest bg-zinc-200">
            Timeline of the Nodes
          </h3>
          
          <ul className="flex flex-col gap-8 relative">
            <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-ink/30 z-0"></div>
            
            <li className="flex flex-col relative z-10 pl-10">
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 bg-accent border-[2px] border-paper rounded-full"></div>
              <span className="font-sans font-black text-ink text-xl tracking-widest mb-1 shadow-sm">1969</span>
              <span className="text-lg leading-snug">First ARPANET node connected. "LO" message sent.</span>
            </li>
            
            <li className="flex flex-col relative z-10 pl-10">
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 bg-ink border-[2px] border-paper rounded-full"></div>
              <span className="font-sans font-black text-ink text-xl tracking-widest mb-1 shadow-sm">1973</span>
              <span className="text-lg leading-snug">Global networking achieved. The term "internet" is coined.</span>
            </li>
            
            <li className="flex flex-col relative z-10 pl-10">
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 bg-ink border-[2px] border-paper rounded-full"></div>
              <span className="font-sans font-black text-ink text-xl tracking-widest mb-1 shadow-sm">1974</span>
              <span className="text-lg leading-snug">Vint Cerf & Bob Kahn publish the design for TCP (Transmission Control Protocol).</span>
            </li>
            
            <li className="flex flex-col relative z-10 pl-10">
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 bg-accent border-[2px] border-paper rounded-full"></div>
              <span className="font-sans font-black text-ink text-xl tracking-widest mb-1 shadow-sm">1983</span>
              <span className="text-lg leading-snug font-bold">ARPANET transitions to TCP/IP. The modern internet is officially born.</span>
            </li>
            
            <li className="flex flex-col relative z-10 pl-10">
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 bg-ink border-[2px] border-paper rounded-full"></div>
              <span className="font-sans font-black text-ink text-xl tracking-widest mb-1 shadow-sm">1989</span>
              <span className="text-lg leading-snug">Tim Berners-Lee circulates the "informational management proposal" at CERN.</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto border-t-[8px] border-ink mt-20"></div>
    </section>
  );
}
