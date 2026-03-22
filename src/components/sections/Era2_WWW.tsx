"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopyReveal from "@/components/CopyReveal";
import Tilt3D from "@/components/Tilt3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Era2_WWW() {
  const sectionRef = useRef<HTMLElement>(null);
  const newspaperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade newspaper articles in on scroll
      gsap.fromTo(
        ".era2-reveal",
        { y: 80, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: newspaperRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col items-center">
      
      {/* ── Black Screen Transition: The Revolution ── */}
      <div className="w-full min-h-[120vh] bg-black flex flex-col items-center justify-center px-4 md:px-12 relative z-10 border-x-[8px] md:border-x-[40px] border-black pb-24">
        
        {/* A gritty, almost invisible grid background to give the black void texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

        <div className="w-full max-w-5xl z-10 text-center flex flex-col gap-6 items-center">
          <CopyReveal blockColor="#cc0000" stagger={0.15} duration={1}>
            <h2 
              className="text-[20vw] md:text-[14vw] uppercase text-paper leading-[0.75] tracking-tighter"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              1989
            </h2>
          </CopyReveal>
          
          <div className="w-full h-[2px] bg-accent/50 my-2"></div>
          
          <CopyReveal blockColor="#cc0000" stagger={0.1} duration={0.8} delay={0.4}>
            <h3 
              className="text-[8vw] md:text-[5vw] uppercase text-zinc-400 leading-none tracking-widest pl-2"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              The Revolution
            </h3>
          </CopyReveal>
        </div>
      </div>

      {/* ── Transition back to Newspaper ── */}
      <div 
        ref={newspaperRef}
        className="w-full bg-paper text-ink pt-24 md:pt-32 pb-32 px-2 md:px-12 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper relative"
      >
        {/* Subtle top border separating black void and paper */}
        <div className="absolute top-0 left-0 w-full h-[10px] bg-gradient-to-b from-black/20 to-transparent"></div>

        {/* Newspaper Header */}
        <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[4px] md:border-b-[8px] border-ink pb-4 md:pb-6 mb-10 md:mb-16 relative z-10 era2-reveal">
          <h1 className="font-serif text-[12vw] md:text-[9vw] leading-[0.85] uppercase font-bold tracking-tighter text-ink text-center flex flex-col w-full px-2 md:px-4">
            <div className="w-full text-center pb-2 md:pb-4 mb-2 md:mb-4">
              The World Wide Web
            </div>
          </h1>
          <div className="w-full mt-4 md:mt-6 flex justify-between items-center border-t-[2px] md:border-t-[4px] border-ink pt-3 md:pt-4 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.1em] md:tracking-[0.2em] px-2 md:px-4">
            <span>Vol. 2 August 06, 1991</span>
            <span className="hidden md:inline-block outline-text text-center mx-2">Birth of the Browser</span>
            <Tilt3D intensity={8} glare={false}><button className="text-paper bg-accent px-3 py-1 text-[10px] md:text-sm hover:bg-ink transition-colors whitespace-nowrap">Free Access</button></Tilt3D>
          </div>
        </header>

        {/* Hero Content Grid (Multi-column) */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
          
          {/* Left Column (Tim Berners-Lee & WWW) */}
          <div className="lg:col-span-7 flex flex-col gap-6 font-newspaper text-lg md:text-xl leading-relaxed border-r-0 lg:border-r-[2px] lg:border-ink/60 pr-0 lg:pr-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter border-b-[2px] md:border-b-4 border-ink pb-3 md:pb-4 era2-reveal">
              A Web of Information at CERN
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 mt-4 era2-reveal">
              {/* Image of Tim Berners-Lee / CERN */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <Tilt3D intensity={4}>
                  <div className="w-full border-[2px] md:border-[4px] border-ink overflow-hidden bg-zinc-200">
                    {/* Tim Berners Lee / First Server Image */}
                    <img 
                      src="/images/NeXT-computer.png" 
                      alt="The NeXT Computer used as the world's first web server" 
                      className="w-full h-auto object-contain" 
                    />
                  </div>
                </Tilt3D>
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-center mt-2">The NeXT Computer used as the world's first web server</p>
                
                {/* Tim Berners-Lee Image */}
                <Tilt3D intensity={4}>
                  <div className="w-full border-[2px] md:border-[4px] border-ink overflow-hidden bg-zinc-200 mt-6 md:mt-8">
                    <img 
                      src="/images/time-burners-lee.png" 
                      alt="Tim Berners-Lee, inventor of the World Wide Web" 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                </Tilt3D>
                <p className="font-sans text-xs font-bold uppercase tracking-wider text-center mt-2">Tim Berners-Lee, Inventor of the World Wide Web</p>
              </div>
              
              <div className="w-full flex-col gap-4">
                <p className="first-letter:text-[4rem] md:first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-3 md:first-letter:mr-4 first-letter:mt-1 first-letter:leading-[0.75] text-justify">
                  While ARPANET laid the physical cables, the digital landscape remained fractured and difficult to navigate. In 1989, British computer scientist <strong>Tim Berners-Lee</strong> drafted a proposal at CERN to manage general information alongside a tangled web of linked documents.
                </p>
                <p className="text-justify mt-4">
                  By 1990, he had coded the first web browser and server. When the WWW software was put into the public domain in 1993, the internet was suddenly democratized. Anyone could create a "page," linking humanity's collective knowledge using HTTP and HTML.
                </p>
              </div>
            </div>
            
            <div className="w-full h-[2px] bg-ink/20 my-4 era2-reveal"></div>
            
            <h3 className="text-2xl font-bold uppercase era2-reveal text-center mt-4">"Vague but exciting..."</h3>
            <p className="font-sans text-sm text-center uppercase tracking-widest text-zinc-500 era2-reveal">- Mike Sendall (Berners-Lee's boss on the original proposal)</p>
          </div>

          {/* Right Column (.com Trend) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="p-6 md:p-8 bg-zinc-200 border-[2px] md:border-[4px] border-ink era2-reveal">
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-none inline-block bg-accent text-paper px-2 py-1">The .com Gold Rush</h3>
              <p className="font-newspaper text-lg text-justify">
                With the web open to the public, businesses flooded the network. The domain name ".com" (commercial) became the most valuable real estate of the decade.
              </p>
              <ul className="mt-6 flex flex-col gap-4 font-sans text-sm md:text-base font-bold uppercase tracking-wider">
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-ink flex-shrink-0"></span>
                  1994: Netscape Navigator launches
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-accent flex-shrink-0"></span>
                  1995: Amazon.com sells its first book
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-ink flex-shrink-0"></span>
                  1995: eBay (AuctionWeb) is founded
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-accent flex-shrink-0"></span>
                  1998: Google fundamentally changes search
                </li>
              </ul>
            </div>
            
            <div className="w-full flex-1 flex items-center justify-center p-8 border-[2px] md:border-[4px] border-ink era2-reveal bg-ink text-paper relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2071&auto=format&fit=crop')] bg-cover mix-blend-overlay"></div>
              <h3 className="font-serif text-3xl font-bold text-center relative z-10 mix-blend-difference group-hover:scale-110 transition-transform duration-500">
                A NEW DIGITAL FRONTIER AWAITS
              </h3>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* End of Volume 2 Marker */}
      <div className="w-full bg-paper px-4 md:px-12 border-x-[8px] md:border-x-[40px] border-paper">
        <div className="w-full max-w-7xl mx-auto border-t-[8px] md:border-t-[12px] border-ink mt-16 md:mt-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-4 md:px-8 text-ink font-sans font-black tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm py-2 border-[2px] md:border-4 border-ink whitespace-nowrap">
            PREPARING TO SURF THE WEB
          </div>
        </div>
      </div>
      
    </section>
  );
}
