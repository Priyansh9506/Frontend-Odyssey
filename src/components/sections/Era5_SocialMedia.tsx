"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CopyReveal from "@/components/CopyReveal";
import Tilt3D from "@/components/Tilt3D";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Era5_SocialMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.utils.toArray<HTMLElement>(".era5-reveal").forEach((elem) => {
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

      // SVG acquisition timeline draw
      setTimeout(() => {
        const isTablet = window.innerWidth < 1280;
        
        if (svgLineRef.current) {
          const length = svgLineRef.current.getTotalLength();
          gsap.set(svgLineRef.current, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(svgLineRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".era5-timeline",
              start: isTablet ? "top 85%" : "top 80%",
              end: isTablet ? "bottom 95%" : "bottom 70%",
              scrub: isTablet ? 0.1 : 0.3,
            },
          });
        }

        // Timeline nodes pop — synced with SVG line
        gsap.from(".era5-node", {
          scale: 0,
          opacity: 0,
          duration: isTablet ? 0.4 : 0.8,
          ease: "back.out(2)",
          stagger: isTablet ? 0.15 : 0.3,
          scrollTrigger: {
            trigger: ".era5-timeline",
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
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center"
    >
      {/* ── CINEMATIC TRANSITION ── */}
      <div className="w-full min-h-[120vh] bg-ink flex flex-col items-center justify-center px-4 md:px-12 relative z-10 border-x-[8px] md:border-x-[40px] border-ink pb-24">
        <div className="w-full max-w-5xl z-10 text-center flex flex-col gap-6 items-center">
          <CopyReveal blockColor="#cc0000" stagger={0.15} duration={1}>
            <h2
              className="text-[20vw] md:text-[14vw] uppercase text-paper leading-[0.75] tracking-tighter"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              2008
            </h2>
          </CopyReveal>

          <div className="w-full h-[2px] bg-accent/50 my-2"></div>

          <CopyReveal blockColor="#cc0000" stagger={0.1} duration={0.8} delay={0.4}>
            <h3
              className="text-[8vw] md:text-[5vw] uppercase text-zinc-400 leading-none tracking-widest pl-2"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              Digital Consolidation
            </h3>
          </CopyReveal>
        </div>
      </div>

      {/* ── NEWSPAPER CONTENT ── */}
      <div className="w-full bg-paper text-ink pt-24 md:pt-32 pb-32 px-2 md:px-12 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper relative overflow-hidden">

        {/* ── NEWSPAPER HEADER ── */}
        <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[8px] border-ink pb-6 mb-16 relative z-10">
          <h1 className="font-serif text-[11vw] leading-[0.8] uppercase font-black tracking-tighter text-ink text-center flex flex-col w-full px-4 era5-reveal">
            <div className="w-full text-center border-b-4 border-ink pb-4 mb-4">
              ZUCKERBERG&apos;S
            </div>
            <div className="text-accent">
              EMPIRE
            </div>
          </h1>
          <div className="w-full mt-8 flex justify-between items-center border-y-[4px] border-ink py-3 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.2em] px-4 era5-reveal">
            <span>Vol. 5 • 2008–2016</span>
            <span className="hidden md:inline-block outline-text text-center text-accent">THE ACQUISITION CHRONICLES</span>
            <button 
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.share) navigator.share({ title: 'The Hypertext Herald', url: window.location.href }).catch(() => {});
                else if (typeof navigator !== 'undefined') { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
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

          {/* CENTER COLUMN: The Rise */}
          <div className="md:col-span-12 xl:col-span-8 flex flex-col font-newspaper text-xl leading-relaxed">
            <h2 className="text-5xl md:text-[5rem] font-black uppercase leading-[0.85] tracking-tighter border-b-4 border-ink pb-4 mb-6 era5-reveal">
              The Youngest<br />Billionaire
            </h2>

            <Tilt3D intensity={8} className="block w-full">
              <div className="w-full relative border-[2px] border-ink overflow-hidden group era5-reveal mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/facebook-popularity.png"
                  alt="Facebook's explosive popularity"
                  className="w-full min-h-[300px] object-cover object-[70%_center] md:object-center contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-ink text-paper font-sans text-xs uppercase font-bold tracking-widest px-4 py-2">
                  Facebook&apos;s meteoric rise, 2004–2008
                </div>
              </div>
            </Tilt3D>

            <div className="columns-1 md:columns-2 gap-8 text-justify era5-reveal">
              <p className="first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.75]">
                In <span className="text-accent font-bold">2008</span>, at the age of just <span className="text-accent font-bold">23</span>, Mark Zuckerberg became the world&apos;s youngest self-made billionaire. Facebook had exploded from a college network to a global platform with over <span className="text-accent font-bold">100 million</span> active users.
              </p>
              <p className="mt-4 md:mt-0">
                The platform&apos;s valuation soared to <span className="text-accent font-bold">$15 billion</span>{" "}after Microsoft invested $240 million for a 1.6% stake. What started in a Harvard dorm room was now worth more than most Fortune 500 companies. Zuckerberg wasn&apos;t just building a social network—he was building an empire.
              </p>
              <p className="mt-4 font-bold border-l-4 border-accent pl-4 italic">
                &quot;In a world that&apos;s changing really quickly, the only strategy that is guaranteed to fail is not taking risks.&quot; — Mark Zuckerberg
              </p>
            </div>
          </div>

          {/* SIDEBAR: The Acquisition Timeline */}
          <div className="md:col-span-12 xl:col-span-4 flex flex-col gap-8 border-t-[4px] xl:border-t-0 xl:border-l-[4px] border-ink pt-12 xl:pt-0 xl:pl-10 era5-timeline">

            <Tilt3D intensity={8} glare={false}>
              <h3 className="text-xl md:text-2xl font-black uppercase text-center tracking-widest bg-ink text-paper py-4 px-2 mb-4 md:rotate-2 hover:rotate-0 transition-all duration-300 ease-in-out cursor-default shadow-lg era5-reveal" data-cursor="hover">
                The Acquisitions
              </h3>
            </Tilt3D>

            <div className="relative pl-6">
              {/* Animated SVG line */}
              <svg className="absolute left-[5px] top-0 bottom-0 w-[40px] h-full pointer-events-none overflow-visible" viewBox="0 -5 40 610" preserveAspectRatio="none">
                <path
                  ref={svgLineRef}
                  d="M0,0 C20,60 -20,90 0,150 C20,210 -20,240 0,300 C20,360 -20,390 0,450 C20,510 -20,540 0,600"
                  fill="none"
                  stroke="#cc0000"
                  strokeWidth="3"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="drop-shadow-sm"
                />
              </svg>

              <ul className="flex flex-col gap-16 relative">
                {/* 2012: Instagram */}
                <li className="flex flex-col relative z-10 pl-6 group era5-reveal">
                  <div className="era5-node absolute -left-0.5 top-1.5 w-4 h-4 bg-accent border-[3px] border-paper rounded-full shadow-[0_0_15px_rgba(204,0,0,0.4)]"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">2012</span>
                  <span className="text-lg leading-snug font-bold">Instagram acquired for <span className="text-accent">$1 Billion</span></span>
                  <span className="text-base leading-snug mt-1 opacity-80">13 employees. 30 million users. Facebook saw the future of mobile photo-sharing and struck before anyone else could.</span>
                </li>

                {/* 2013: Snapchat Rejection */}
                <li className="flex flex-col relative z-10 pl-6 group era5-reveal">
                  <div className="era5-node absolute -left-0.5 top-1.5 w-4 h-4 bg-ink border-[3px] border-paper rounded-full"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">2013</span>
                  <span className="text-lg leading-snug font-bold">Snapchat rejects <span className="text-accent">$3 Billion</span> offer</span>
                  <span className="text-base leading-snug mt-1 opacity-80">Evan Spiegel, just 23 years old, turned down Zuckerberg. The X-factor? Disappearing &quot;Stories&quot;. Facebook would never forget this rejection.</span>
                </li>

                {/* 2014: WhatsApp */}
                <li className="flex flex-col relative z-10 pl-6 group era5-reveal">
                  <div className="era5-node absolute -left-0.5 top-1.5 w-4 h-4 bg-accent border-[3px] border-paper rounded-full shadow-[0_0_15px_#f25042]"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">2014</span>
                  <span className="text-lg leading-snug font-bold">WhatsApp acquired for <span className="text-accent">$19 Billion</span></span>
                  <span className="text-base leading-snug mt-1 opacity-80">The largest tech acquisition in history at the time. 450 million users. $4B cash + $12B stock + $3B restricted units. The messaging wars were won overnight.</span>
                </li>

                {/* 2016: The Clone Wars */}
                <li className="flex flex-col relative z-10 pl-6 group era5-reveal">
                  <div className="era5-node absolute -left-0.5 top-1.5 w-4 h-4 bg-accent border-[3px] border-paper rounded-full"></div>
                  <span className="font-sans font-black text-ink text-2xl tracking-widest mb-1 group-hover:text-accent transition-colors">2016</span>
                  <span className="text-lg leading-snug font-bold">Instagram Stories launch</span>
                  <span className="text-base leading-snug mt-1 opacity-80">If you can&apos;t buy them, copy them. Instagram CEO Kevin Systrom openly admitted copying Snapchat&apos;s Stories. Within a year, Instagram Stories surpassed Snapchat&apos;s daily users.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── ACQUISITION SHOWCASE GRID ── */}
        <div className="w-full max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-16 relative z-10 px-4">

          {/* Instagram Acquisition Image */}
          <div className="md:col-span-6 xl:col-span-4 flex flex-col gap-4 era5-reveal">
            <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
              The Instagram<br />Deal
            </h3>
            <Tilt3D intensity={12} className="block w-full">
              <div className="w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/instagram-logo.png"
                  alt="Instagram Acquisition"
                  className="w-full aspect-square object-cover contrast-125 object-left group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 right-2 bg-accent text-white text-[10px] font-sans font-bold px-2 py-1">
                  $1B • 2012
                </div>
              </div>
            </Tilt3D>
            <p className="font-newspaper text-lg text-justify mt-2">
              When Facebook acquired Instagram in April <span className="text-accent font-bold">2012</span> for <span className="text-accent font-bold">$1 billion</span>, the photo-sharing app had just 13 employees and 30 million users. Critics called it overpaying. Today, Instagram generates over $20 billion annually in ad revenue. It may be the greatest tech acquisition ever made.
            </p>
          </div>

          {/* Snapchat Rejection */}
          <div className="md:col-span-6 xl:col-span-4 flex flex-col gap-4 era5-reveal">
            <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
              The Snapchat<br />Rejection
            </h3>
            <Tilt3D intensity={12} className="block w-full">
              <div className="w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/snapchat-logo.png"
                  alt="Snapchat"
                  className="w-full aspect-square object-cover contrast-125 object-top group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 right-2 bg-[#FFFC00] text-ink text-[10px] font-sans font-bold px-2 py-1">
                  REJECTED • 2013
                </div>
              </div>
            </Tilt3D>
            <p className="font-newspaper text-lg text-justify mt-2">
              In <span className="text-accent font-bold">2013</span>, Zuckerberg offered Evan Spiegel <span className="text-accent font-bold">$3 billion</span> for Snapchat—some reports suggest the real offer was <span className="text-accent font-bold">$6 billion</span>. Spiegel refused. The X-factor was Snapchat&apos;s &quot;Stories&quot;—ephemeral content that vanished after 24 hours. Unable to acquire, Facebook was alleged to have directly copied the feature onto Instagram in August <span className="text-accent font-bold">2016</span>.
            </p>
          </div>

          {/* WhatsApp Mega-Deal */}
          <div className="md:col-span-12 xl:col-span-4 flex flex-col gap-4 era5-reveal">
            <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
              The WhatsApp<br />Mega-Deal
            </h3>
            <Tilt3D intensity={12} className="block w-full">
              <div className="w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/whatsapp-logo.png"
                  alt="WhatsApp Acquisition"
                  className="w-full aspect-square object-contain p-8 md:p-12 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 right-2 bg-[#25D366] text-white text-[10px] font-sans font-bold px-2 py-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  $19B • 2014
                </div>
              </div>
            </Tilt3D>
            <p className="font-newspaper text-lg text-justify mt-2">
              Facebook acquired WhatsApp in February <span className="text-accent font-bold">2014</span> for an initial <span className="text-accent font-bold">$16 billion</span> ($4B cash + $12B stock), plus $3B in restricted stock units. By the time the deal closed in October 2014, rising share prices pushed the total to nearly <span className="text-accent font-bold">$19 billion</span>—the largest tech acquisition in history at the time. WhatsApp had 450 million users and just 55 employees.
            </p>
          </div>
        </div>

        {/* ── THE DOMINANCE ── */}
        <div className="w-full mt-24 era5-reveal">

          {/* Full-width Dominance Image */}
          <div className="w-full max-w-7xl mx-auto px-4">
            <Tilt3D intensity={6} className="block w-full mx-auto">
              <div className="w-full relative border-[4px] border-ink overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Mark-Z-dominence.png"
                  alt="Mark Zuckerberg's Digital Dominance"
                  className="w-full min-h-[300px] md:min-h-[500px] object-cover object-top contrast-110 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <h3 className="font-serif text-3xl md:text-5xl font-black uppercase text-paper leading-[0.9] tracking-tight mb-2">
                    Total Digital<br />Consolidation
                  </h3>
                  <p className="font-newspaper text-paper/80 text-lg md:text-xl max-w-2xl">
                    By 2016, Facebook controlled <span className="text-accent font-bold">Facebook</span>, <span className="text-accent font-bold">Instagram</span>, <span className="text-accent font-bold">WhatsApp</span>, and <span className="text-accent font-bold">Messenger</span>—four of the world&apos;s five most-used social apps. One man. One company. Billions of users.
                  </p>
                </div>
              </div>
            </Tilt3D>
          </div>
          {/* Editorial Text Below Image */}
          <div className="w-full max-w-7xl mx-auto px-4 mt-10 era5-reveal">
            <h3 className="text-4xl md:text-5xl font-black uppercase leading-[0.85] tracking-tighter border-b-4 border-ink pb-4 mb-8 text-center">
              Is This Dominance Dangerous?
            </h3>

            <Tilt3D intensity={6} glare={false}>
              <div className="bg-ink text-paper p-6 md:p-8 mb-10 relative group overflow-hidden cursor-pointer" data-cursor="hover">
                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <p className="relative z-10 italic font-newspaper text-lg md:text-xl text-center">
                  &quot;When one company controls Facebook, Instagram, WhatsApp, and Messenger—the four apps where billions spend their daily digital lives—that is not innovation. That is a monopoly wearing a hoodie.&quot;
                </p>
                <p className="text-zinc-400 relative z-10 text-xs font-sans uppercase tracking-widest text-center mt-4">— Editorial Board Opinion</p>
              </div>
            </Tilt3D>

            <div className="columns-1 md:columns-2 gap-10 font-newspaper text-xl leading-relaxed text-justify era5-reveal">
              <p className="first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.75]">
                By <span className="text-accent font-bold">2016</span>, one man controlled the communication channels of nearly <span className="text-accent font-bold">3 billion people</span>. Supporters called it visionary consolidation—bringing the world&apos;s social fabric under one efficient roof. Critics saw something far darker: an unprecedented <span className="text-accent font-bold">monopoly on human attention</span>.
              </p>
              <p className="mt-4">
                The acquisitions weren&apos;t just about growth. They were about <span className="font-bold">eliminating competition</span>. Instagram was bought before it could challenge Facebook Mobile. WhatsApp was bought before it could become the world&apos;s default messaging layer outside of Facebook. And when Snapchat refused to sell? Its core feature was cloned within months.
              </p>
              <p className="mt-4">
                Privacy advocates raised alarms as user data from all four platforms was gradually merged. The Cambridge Analytica scandal of <span className="text-accent font-bold">2018</span> would later reveal the true cost: personal data weaponized for political manipulation, affecting elections worldwide.
              </p>
              <p className="mt-4">
                Antitrust investigations launched across the US, EU, and India. The FTC filed a landmark lawsuit in <span className="text-accent font-bold">2020</span>, arguing Facebook had maintained its monopoly through anticompetitive acquisitions. The trial, stretching into 2025, remains one of the most consequential tech cases in history.
              </p>
            </div>

            <div className="border-[4px] border-accent p-4 md:p-6 mt-10 era5-reveal">
              <p className="text-2xl md:text-3xl font-black uppercase leading-[0.9] tracking-tight text-center text-accent">
                Should any single entity control how billions communicate, share, and perceive reality?
              </p>
            </div>
          </div>
        </div>

        {/* End of Volume 5 Marker */}
        <div className="w-full max-w-7xl mx-auto border-t-[12px] border-ink mt-24 md:mt-32 mb-16 relative era5-reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-8 text-ink font-sans font-black tracking-[0.5em] text-sm py-2 border-4 border-ink whitespace-nowrap text-center"><span className="ml-[0.5em]">END OF VOL. 5</span></div>
        </div>

      </div>
    </section>
  );
}
