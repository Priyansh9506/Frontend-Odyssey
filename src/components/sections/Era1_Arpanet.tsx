"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt3D from "@/components/Tilt3D";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Utility for splitting text into animated characters
const SplitTextChars = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <span className="char-anim inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
};

const Era1_Arpanet = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mobile animations enabled

      // 1. Initial Hero Text Reveal
      const tl = gsap.timeline();
      tl.from(".char-anim", {
        yPercent: 120,
        rotate: 10,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2, // slight delay for load
      });

      tl.from(".meta-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      }, "-=0.8");


      // 3. Article content reveal on scroll
      gsap.fromTo(
        ".article-reveal",
        { y: 80, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );

      // 4. Timeline SVG Draw
      setTimeout(() => {
        const isTablet = window.innerWidth < 1280;
        
        if (svgLineRef.current) {
          const length = svgLineRef.current.getTotalLength();
          gsap.set(svgLineRef.current, { 
            strokeDasharray: length, 
            strokeDashoffset: length 
          });

          gsap.to(svgLineRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: isTablet ? "top 85%" : "top 80%",
              end: isTablet ? "bottom 95%" : "bottom 70%",
              scrub: isTablet ? 0.1 : 0.3,
            },
          });
        }

        // 5. Timeline Nodes pop
        gsap.from(".timeline-node", {
          scale: 0,
          opacity: 0,
          duration: isTablet ? 0.4 : 0.8,
          ease: "back.out(2)",
          stagger: isTablet ? 0.15 : 0.3,
          scrollTrigger: {
            trigger: ".timeline-container",
            start: isTablet ? "top 75%" : "top 60%",
            end: isTablet ? "bottom 85%" : "bottom 60%",
            scrub: isTablet ? 0.5 : 1,
          },
        });
      }, 100);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[180vh] bg-paper pt-24 md:pt-32 px-2 md:px-12 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper overflow-hidden">
      
      {/* Newspaper Header */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[4px] md:border-b-[8px] border-ink pb-4 md:pb-6 mb-10 md:mb-16 relative z-10">
        <h1 
          ref={titleRef} 
          className="font-serif text-[13vw] md:text-[11vw] leading-[0.8] uppercase font-bold tracking-tighter text-ink text-center flex flex-col w-full px-2 md:px-4"
        >
          <div className="w-full text-center border-b-[2px] md:border-b-4 border-ink pb-2 md:pb-4 mb-2 md:mb-4" data-cursor="hover">
            <span className="block md:inline"><SplitTextChars text="The" /></span>
            <span className="hidden md:inline">&nbsp;</span>
            <span className="block md:inline"><SplitTextChars text="Hypertext" /></span>
          </div>
          <div className="text-[#DC2626]" data-cursor="hover">
            <SplitTextChars text="Herald" />
          </div>
        </h1>
        <div className="w-full mt-4 md:mt-6 flex justify-between items-center border-t-[2px] md:border-t-[4px] border-ink pt-3 md:pt-4 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] px-2 md:px-4 meta-fade">
          <span>Vol. 1 Oct 29, 1969</span>
          <span className="hidden md:inline-block outline-text text-center mx-2 text-[#DC2626]">The Dawn of Packet Switching</span>
          <button 
            onClick={() => {
              if (navigator.share) navigator.share({ title: 'The Hypertext Herald', url: window.location.href }).catch(() => {});
              else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
            }}
            className="text-paper bg-ink px-4 py-1 text-[10px] md:text-sm hover:bg-[#cc0000] transition-colors whitespace-nowrap" 
            data-cursor="hover"
          >
            Share
          </button>
        </div>
      </header>

      {/* Hero Content Grid (Multi-column) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 relative z-10">
        
        {/* Left Column (Main Article) */}
        <div className="xl:col-span-4 flex flex-col gap-6 font-newspaper text-lg md:text-xl leading-relaxed border-r-0 xl:border-r-[2px] xl:border-ink/60 pr-0 xl:pr-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter border-b-[2px] md:border-b-4 border-ink pb-3 md:pb-4 article-reveal">
            A Network is Born in the Shadows
          </h2>
          <p className="first-letter:text-[4rem] md:first-letter:text-[7rem] first-letter:font-black first-letter:float-left first-letter:mr-3 md:first-letter:mr-4 first-letter:mt-1 md:first-letter:mt-2 first-letter:leading-[0.75] text-justify article-reveal">
            At 10:30 PM on October 29, 1969, history was quietly made. A computer at UCLA&apos;s Network Measurement Center attempted to send a message to the Stanford Research Institute across the newly formed ARPANET.
          </p>
          <p className="text-justify article-reveal">
            The intended message was &quot;LOGIN&quot;. The system spectacularly crashed after transmitting just two letters: <strong>&quot;LO&quot;</strong>. Yet, this humble failure marked the successful deployment of packet-switching technology—a breakthrough conceptualized by Paul Baran and Donald Davies that would eventually connect humanity across a unified digital plane.
          </p>
          
          <Tilt3D intensity={6}>
            <div className="mt-4 md:mt-8 p-6 md:p-8 bg-ink text-paper font-sans text-xs md:text-sm font-bold uppercase tracking-widest article-reveal relative group overflow-hidden cursor-pointer" data-cursor="hover">
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
              <p className="relative z-10">&quot;We were supposed to transmit &apos;LOGIN&apos;. We typed the L, and they got the L. We typed the O, and they got the O. Then we typed the G, and the system crashed.&quot;</p>
              <br/><br/><span className="text-zinc-400 relative z-10">Leonard Kleinrock</span>
            </div>
          </Tilt3D>
        </div>

        {/* Center Column (Featured Image) */}
        <div className="xl:col-span-5 flex flex-col items-center">
          <div 
            className="w-full h-[35vh] md:h-[50vh] xl:h-[70vh] overflow-hidden border-[2px] md:border-[4px] border-ink bg-zinc-200 relative transform transition-transform hover:-translate-y-2 duration-500 article-reveal"
            data-cursor="hover"
          >
            <div 
              className="w-full h-full bg-[url('/images/imp-processor.png')] bg-cover bg-center"
            ></div>
            {/* Vintage Scanline Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHBhdGggZD0iTTAgMEg0djFIMHoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] pointer-events-none opacity-30 mix-blend-overlay"></div>
          </div>
          <p className="font-sans text-xs uppercase font-bold tracking-widest mt-8 w-full text-right border-b-2 border-ink pb-4 article-reveal">
            Fig 1. The Interface Message Processor (IMP).
          </p>
          
          <div className="w-full mt-10 text-justify font-newspaper text-lg leading-relaxed article-reveal">
            <h3 className="text-3xl font-bold uppercase mb-4 leading-none bg-ink text-paper inline-block px-3 py-1">The @ Symbol Arrives</h3>
            <p>In 1971, Ray Tomlinson developed the first network email system. To distinguish the user from the host computer, he elegantly chose the &quot;@&quot; symbol. Electronic mail rapidly became the network&apos;s most essential application, turning data lines into lifelines of communication.</p>
          </div>
          
          <div className="w-full mt-6 md:mt-8 overflow-hidden border-[2px] md:border-[4px] border-ink article-reveal bg-zinc-200" data-cursor="hover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/email.png" 
              alt="The first network email system" 
              className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105" 
            />
          </div>
        </div>

        {/* Right Column (Sidebar Timeline) */}
        <div className="xl:col-span-3 flex flex-col gap-10 font-newspaper border-l-0 xl:border-l-[2px] xl:border-ink/60 pl-0 xl:pl-10 timeline-container">
          <div className="sticky top-10">
            <Tilt3D intensity={8} glare={false}>
              <h3 className="text-xl md:text-2xl font-black uppercase text-center tracking-widest bg-ink text-paper py-4 px-2 mb-10 md:rotate-3 hover:rotate-0 transition-all duration-300 ease-in-out cursor-default shadow-lg" data-cursor="hover">
                Timeline of the Nodes
              </h3>
            </Tilt3D>
            
            <div className="relative pl-6">
              {/* Animated SVG Path for timeline connection */}
              <svg className="absolute left-[5px] top-0 bottom-0 w-[40px] h-full pointer-events-none overflow-visible" viewBox="0 -5 40 760" preserveAspectRatio="none">
                <path 
                  ref={svgLineRef}
                  d="M0,0 C20,60 -20,90 0,150 C20,210 -20,240 0,300 C20,360 -20,390 0,450 C20,510 -20,540 0,600 C20,660 -20,690 0,750" 
                  fill="none" 
                  stroke="#1a1a1a" 
                  strokeWidth="3" 
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                  className="drop-shadow-sm"
                />
              </svg>
              
              <ul className="flex flex-col gap-16 relative">
                <li className="flex flex-col relative z-10 pl-6 group">
                  <div className="timeline-node absolute -left-0.5 top-1.5 w-4 h-4 bg-accent border-[3px] border-paper rounded-full"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">1969</span>
                  <span className="text-lg leading-snug">First ARPANET node connected. &quot;LO&quot; message sent.</span>
                </li>
                
                <li className="flex flex-col relative z-10 pl-6 group">
                  <div className="timeline-node absolute -left-0.5 top-1.5 w-4 h-4 bg-accent border-[3px] border-paper rounded-full shadow-[0_0_15px_rgba(204,0,0,0.4)]"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">1973</span>
                  <span className="text-lg leading-snug">Global networking achieved. The term &quot;internet&quot; is coined.</span>
                </li>
                
                <li className="flex flex-col relative z-10 pl-6 group">
                  <div className="timeline-node absolute -left-0.5 top-1.5 w-4 h-4 bg-ink border-[3px] border-paper rounded-full"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">1974</span>
                  <span className="text-lg leading-snug">Vint Cerf & Bob Kahn publish the design for TCP (Transmission Control Protocol).</span>
                </li>
                
                <li className="flex flex-col relative z-10 pl-6 group">
                  <div className="timeline-node absolute -left-0.5 top-1.5 w-4 h-4 bg-accent border-[3px] border-paper rounded-full shadow-[0_0_15px_#f25042]"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">1983</span>
                  <span className="text-lg leading-snug font-bold">ARPANET transitions to TCP/IP. The modern internet is officially born.</span>
                </li>
                
                <li className="flex flex-col relative z-10 pl-6 group">
                  <div className="timeline-node absolute -left-0.5 top-1.5 w-4 h-4 bg-ink border-[3px] border-paper rounded-full"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">1989</span>
                  <span className="text-lg leading-snug">Tim Berners-Lee circulates the &quot;informational management proposal&quot; at CERN.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto border-t-[12px] border-ink mt-32 mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-8 text-ink font-sans font-black tracking-[0.5em] text-sm py-2 border-4 border-ink">END OF VOL. 1</div>
      </div>
    </section>
  );
}


export default Era1_Arpanet;
