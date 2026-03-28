"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopyReveal from "@/components/CopyReveal";
import Tilt3D from "@/components/Tilt3D";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Era4_Web2() {
  const sectionRef = useRef<HTMLElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animations for newspaper elements
      gsap.utils.toArray(".era4-reveal").forEach((elem: any) => {
        gsap.fromTo(
          elem,
          { y: 60, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            },
          }
        );
      });


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full flex flex-col items-center"
    >
      {/* ── CINEMATIC TRANSITION ── */}
      <div ref={transitionRef} className="w-full min-h-[120vh] bg-ink flex flex-col items-center justify-center px-4 md:px-12 relative z-10 border-x-[8px] md:border-x-[40px] border-ink pb-24">

        <div className="w-full max-w-5xl z-10 text-center flex flex-col gap-6 items-center">
          <CopyReveal blockColor="#cc0000" stagger={0.15} duration={1}>
            <h2 
              className="text-[20vw] md:text-[14vw] uppercase text-paper leading-[0.75] tracking-tighter"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              2004
            </h2>
          </CopyReveal>
          
          <div className="w-full h-[2px] bg-[#cc0000]/50 my-2"></div>

          <CopyReveal blockColor="#cc0000" stagger={0.1} duration={0.8} delay={0.4}>
            <h3 
              className="text-[8vw] md:text-[5vw] uppercase text-zinc-400 leading-none tracking-widest pl-2"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              The Social Web
            </h3>
          </CopyReveal>
        </div>
      </div>

      {/* ── NEWSPAPER CONTENT ── */}
      <div className="w-full bg-paper text-ink pt-24 md:pt-32 pb-32 px-2 md:px-12 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper relative overflow-hidden">

      {/* ── NEWSPAPER HEADER ── */}
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[8px] border-ink pb-6 mb-16 relative z-10">
        <h1 className="font-serif text-[11vw] leading-[0.8] uppercase font-black tracking-tighter text-ink text-center flex flex-col w-full px-4 era4-reveal">
          <div className="w-full text-center border-b-4 border-ink pb-4 mb-4">
            READ-WRITE
          </div>
          <div className="text-[#DC2626]">
            SOCIETY
          </div>
        </h1>
        <div className="w-full mt-8 flex justify-between items-center border-y-[4px] border-ink py-3 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.2em] px-4 era4-reveal">
          <span>Vol. 4 • February 2004</span>
          <span className="hidden md:inline-block outline-text text-center text-[#DC2626]">THE ARCHITECTS OF OUR TIME</span>
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

      {/* ── NEWSPAPER GRID ── */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-16 relative z-10 px-4">
        
        {/* CENTER COLUMN: The Birth of The Protagonist */}
        <div className="md:col-span-12 xl:col-span-8 flex flex-col font-newspaper text-xl leading-relaxed">
          <h2 className="text-5xl md:text-[5rem] font-black uppercase leading-[0.85] tracking-tighter border-b-4 border-ink pb-4 mb-6 era4-reveal">
            The Harvard<br/>Experiment
          </h2>

          <Tilt3D intensity={8}>
            <div className="w-full relative border-[2px] border-ink overflow-hidden group era4-reveal mb-8">
              <img 
                src="/images/mark-.zukerberg-old-days.png" 
                alt="Young Mark Zuckerberg" 
                className="w-full min-h-[300px] object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 bg-ink text-paper font-sans text-xs uppercase font-bold tracking-widest px-4 py-2">
                19-Year-Old Mark Zuckerberg, 2004
              </div>
            </div>
          </Tilt3D>

          <div className="columns-1 md:columns-2 gap-8 text-justify era4-reveal">
            <p className="first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.75]">
              In a crammed dorm room in Kirkland House at Harvard University, an empire was quietly compiling. It wasn’t a search engine, nor was it a marketplace to sell old electronics. It was a digital directory of faces.
            </p>
            <p className="mt-4 md:mt-0">
              They called it "ThefaceBook". What began as an exclusive network for ivy-league students fundamentally rewired how humanity interacts. For the first time, users weren't anonymous avatars behind screen names; they were forced to use their real identities. 
            </p>
            <p className="mt-4 font-bold border-l-4 border-[#1877F2] pl-4 italic">
              "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough." — M. Zuckerberg
            </p>
            <p className="mt-4">
              He became the undisputed protagonist of Web 2.0. As others fell away, Zuckerberg evolved from a hacker in a hoodie to the architect of a platform that would soon dwarf the global population of most continents, setting the stage for total digital consolidation.
            </p>
          </div>

          {/* Daily Prophet Effect: Video + Description grid aligned with text columns */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 era4-reveal mt-12 relative">
            
            {/* Left Column: Video exact match with upper text left column */}
            <div className="w-full flex flex-col items-center justify-center">
              <Tilt3D intensity={5}>
                <div className="w-full relative border-[2px] border-ink overflow-hidden group">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    preload="auto"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/video/mark-zukerberg-giving-demo.mp4" type="video/mp4" />
                  </video>
                </div>
              </Tilt3D>
              <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-center mt-2 w-full">Zuckerberg demonstrates TheFacebook on CNBC, 2004</p>
            </div>
            
            {/* Right Column: Text article inset bordered matching upper right column */}
            <div className="w-full flex flex-col justify-between border-y-[2px] border-ink py-4 font-newspaper text-lg text-justify h-full">
              <div>
                <h4 className="font-serif text-2xl font-black uppercase leading-[1.1] mb-4 text-center border-b-[2px] border-ink pb-3">The Demo That Changed Everything</h4>
                <p>
                  A young Mark Zuckerberg showing off <span className="font-bold">Facebook</span> on CNBC. What started in a Harvard dorm room was about to consume the entire planet. The interviewer had no idea they were looking at the future of human communication.
                </p>
              </div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-ink/70 font-bold mt-4 text-center">
                Source: CNBC Archives
              </p>
            </div>
            
          </div>
        </div>

        {/* SIDEBAR: YouTube & Twitter */}
        <div className="md:col-span-12 xl:col-span-4 flex flex-col gap-12 border-t-[4px] xl:border-t-0 xl:border-l-[4px] border-ink pt-12 xl:pt-0 xl:pl-10">
          
          {/* YouTube Story */}
          <div className="flex flex-col gap-4 era4-reveal">
            <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
              Broadcast<br/>Yourself
            </h3>
            
            <Tilt3D intensity={12}>
              <div className="w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group">
                <img 
                  src="/images/youtube-founders.png" 
                  alt="YouTube Founders" 
                  className="w-full aspect-square object-cover contrast-125 object-top group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 right-2 bg-[#FF0000] text-white text-[10px] font-sans font-bold px-2 py-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> REC
                </div>
              </div>
            </Tilt3D>
            
            <p className="font-newspaper text-lg text-justify mt-2">
              Before 2005, sharing a video on the internet meant painfully downloading a `.wmv` file. Then <span className="text-[#FF0000] font-bold">YouTube</span> changed everything. Founded by Jawed Karim, Steve Chen, and Chad Hurley, they introduced embedded Flash video to the masses. Their first upload, &quot;Me at the zoo,&quot; went live in April 2005. Just 18 months later, Google acquired <span className="text-[#FF0000] font-bold">YouTube</span> for $1.65 billion.
            </p>
          </div>

          <div className="w-full h-[4px] bg-ink/30 border-dashed border-y-[1px] border-ink/40 my-2"></div>

          {/* Twitter Story */}
          <div className="flex flex-col gap-4 era4-reveal">
            <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
              140 Characters
            </h3>
            
            <Tilt3D intensity={12}>
              <div className="w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group">
                <img 
                  src="/images/jack-dorsey.png" 
                  alt="Jack Dorsey" 
                  className="w-full aspect-[4/3] object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-2 left-2 bg-[#1DA1F2] text-white text-[10px] font-sans font-bold px-2 py-1">
                  @jack
                </div>
              </div>
            </Tilt3D>

            <p className="font-newspaper text-lg text-justify mt-2">
              Born from a podcasting startup called Odeo, Jack Dorsey's "twttr" forced the world into brevity. SMS-based status updates became the global town square, giving real-time voice to revolutions, celebrities, and presidents alike, restricted simply to 140 bytes of data.
            </p>
            <div className="bg-zinc-200 border-[2px] border-ink p-4 font-sans text-sm italic font-medium opacity-80 era4-reveal">
              "just setting up my twttr"<br/>— March 21, 2006
            </div>
          </div>

        </div>
      </div>

      {/* End of Volume 4 Marker */}
      <div className="w-full max-w-7xl mx-auto border-t-[12px] border-ink mt-24 md:mt-32 mb-16 relative era4-reveal">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-8 text-ink font-sans font-black tracking-[0.5em] text-sm py-2 border-4 border-ink whitespace-nowrap">END OF VOL. 4</div>
      </div>

    </div>
    </section>
  );
}
