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

export default function Era7_Web3Burst() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".era7-reveal").forEach((elem) => {
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
      <div className="w-full min-h-[120vh] bg-ink flex flex-col items-center justify-center px-4 md:px-12 relative z-10 border-x-[8px] md:border-x-[40px] border-ink pb-24">
        <div className="w-full max-w-5xl z-10 text-center flex flex-col gap-6 items-center">
          <CopyReveal blockColor="#cc0000" stagger={0.15} duration={1}>
            <h2
              className="text-[20vw] md:text-[14vw] uppercase text-paper leading-[0.75] tracking-tighter"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              2022
            </h2>
          </CopyReveal>

          <div className="w-full h-[2px] bg-[#cc0000]/50 my-2"></div>

          <CopyReveal blockColor="#cc0000" stagger={0.1} duration={0.8} delay={0.4}>
            <h3
              className="text-[8vw] md:text-[5vw] uppercase text-zinc-400 leading-none tracking-widest pl-2"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              The Reckoning
            </h3>
          </CopyReveal>
        </div>
      </div>

      {/* ── NEWSPAPER CONTENT ── */}
      <div className="w-full bg-paper text-ink pt-24 md:pt-32 pb-32 px-2 md:px-12 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper relative overflow-hidden">

        {/* ── NEWSPAPER HEADER ── */}
        <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[8px] border-ink pb-6 mb-16 relative z-10">
          <h1 className="font-serif text-[11vw] leading-[0.8] uppercase font-black tracking-tighter text-ink text-center flex flex-col w-full px-4 era7-reveal">
            <div className="w-full text-center border-b-4 border-ink pb-4 mb-4">
              DIGITAL ASHES
            </div>
            <div className="text-[#DC2626]">
              GAZETTE
            </div>
          </h1>
          <div className="w-full mt-8 flex justify-between items-center border-y-[4px] border-ink py-3 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.2em] px-4 era7-reveal">
            <span>Vol. 7 • 2022–2026</span>
            <span className="hidden md:inline-block outline-text text-center text-[#DC2626]">HISTORY REPEATS ITSELF</span>
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

        {/* ── MAIN ARTICLE GRID ── */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-6 md:gap-10 px-4 md:px-0">

          {/* LEFT COLUMN: NFT Crash & Meta Losses */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">

            <h2 className="font-serif text-4xl md:text-5xl font-black uppercase leading-[1.05] border-b-[4px] border-ink pb-4 era7-reveal">
              The $64 Billion<br/>Bonfire
            </h2>

            <Tilt3D intensity={8}>
              <div className="w-full relative border-[2px] border-ink overflow-hidden group era7-reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/meta-80-billion-loss.png"
                  alt="Meta Reality Labs Losses"
                  className="w-full aspect-video object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 bg-[#DC2626] text-paper font-sans text-xs uppercase font-bold tracking-widest px-4 py-2">
                  Meta Reality Labs: $64.35B in Cumulative Losses
                </div>
              </div>
            </Tilt3D>

            <div className="columns-1 md:columns-2 gap-8 font-newspaper text-xl text-justify leading-relaxed era7-reveal">
              <p className="first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.75]">
                Mark Zuckerberg&apos;s audacious bet on the metaverse became the most expensive corporate gamble in history. Meta&apos;s Reality Labs division hemorrhaged money at an accelerating pace: $6.62B in 2020, $10.19B in 2021, $13.71B in 2022, $16.12B in 2023, and a staggering $17.71B in 2024.
              </p>
              <p className="mt-4 md:mt-0">
                The total: <span className="font-bold text-[#DC2626]">$64.35 billion</span> burned in five years. Meta Horizon Worlds — the flagship virtual reality platform — is now being sunset. The VR version will be removed from the Quest store by March 2026, with no new VR games in development. The company pivoted to AI and smart glasses, quietly admitting the metaverse dream was premature.
              </p>
              <p className="mt-4 font-bold border-l-4 border-[#DC2626] pl-4 italic">
                &quot;We are shifting focus to mobile for Horizon Worlds and investing in AI.&quot; — Andrew Bosworth, Meta CTO
              </p>
            </div>

            {/* Meta Horizon Image + Losses Breakdown */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 era7-reveal mt-4">
              <div className="w-full">
                <Tilt3D intensity={5}>
                  <div className="w-full border-[2px] border-ink overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/meta-horizon.png"
                      alt="Meta Horizon Worlds"
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Tilt3D>
                <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-center mt-2">Meta Horizon Worlds: The Empty Promise</p>
              </div>
              <div className="w-full flex flex-col justify-between border-y-[2px] border-ink py-4 font-newspaper text-lg text-justify h-full">
                <div>
                  <h4 className="font-serif text-2xl font-black uppercase leading-[1.1] mb-4 text-center border-b-[2px] border-ink pb-3">Year-By-Year Losses</h4>
                  <table className="w-full font-sans text-sm">
                    <tbody>
                      <tr className="border-b border-ink/20"><td className="py-1 font-bold">2020</td><td className="text-right text-[#DC2626] font-bold">-$6.62B</td></tr>
                      <tr className="border-b border-ink/20"><td className="py-1 font-bold">2021</td><td className="text-right text-[#DC2626] font-bold">-$10.19B</td></tr>
                      <tr className="border-b border-ink/20"><td className="py-1 font-bold">2022</td><td className="text-right text-[#DC2626] font-bold">-$13.71B</td></tr>
                      <tr className="border-b border-ink/20"><td className="py-1 font-bold">2023</td><td className="text-right text-[#DC2626] font-bold">-$16.12B</td></tr>
                      <tr><td className="py-1 font-bold">2024</td><td className="text-right text-[#DC2626] font-bold">-$17.71B</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#DC2626] font-bold mt-4 text-center">
                  Total: $64.35 Billion
                </p>
              </div>
            </div>

            {/* Meme Coin Graveyard - Left Column */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 era7-reveal mt-8">
              <div className="w-full flex flex-col justify-between border-y-[2px] border-ink py-4 font-newspaper text-lg text-justify h-full">
                <div>
                  <h4 className="font-serif text-2xl font-black uppercase leading-[1.1] mb-4 text-center border-b-[2px] border-ink pb-3">Meme Coin Graveyard</h4>
                  <p>
                    Thousands of meme coins were minted and abandoned. Dogecoin clones, Shiba Inu derivatives, and countless &quot;next big thing&quot; tokens flooded the market. Rug pulls became routine &mdash; developers would hype a token, pump the price, then vanish with investor funds.
                  </p>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#DC2626] font-bold mt-4 text-center">
                  Zero Utility. Zero Future.
                </p>
              </div>
              <div className="w-full">
                <Tilt3D intensity={5}>
                  <div className="w-full relative border-[2px] border-ink overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/meme-coin.png"
                      alt="Meme Coins"
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 bg-[#DC2626] text-white text-[10px] font-sans font-bold px-2 py-1">
                      WORTHLESS
                    </div>
                  </div>
                </Tilt3D>
                <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-center mt-2">The Meme Coin Graveyard</p>
              </div>
            </div>
          </div>

          {/* SIDEBAR: Sandbox & NFT Crash */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-12 border-t-[4px] xl:border-t-0 xl:border-l-[4px] border-ink pt-12 xl:pt-0 xl:pl-10">

            {/* NFT Crash */}
            <div className="flex flex-col gap-4 era7-reveal">
              <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
                The NFT<br/>Graveyard
              </h3>

              <div className="bg-[#DC2626]/10 border-[2px] border-[#DC2626] p-4 font-sans text-sm">
                <div className="flex justify-between font-bold border-b border-[#DC2626]/30 pb-2 mb-2">
                  <span>NFT Trading Volume</span>
                  <span className="text-[#DC2626]">▼ 97%</span>
                </div>
                <p className="text-xs">$17 Billion (Jan 2022) → $466 Million (Sep 2022)</p>
                <div className="flex justify-between font-bold border-b border-[#DC2626]/30 pb-2 mb-2 mt-3">
                  <span>Avg NFT Price</span>
                  <span className="text-[#DC2626]">▼ 92%</span>
                </div>
                <p className="text-xs">$3,894 → $293</p>
                <div className="flex justify-between font-bold mt-3">
                  <span>Bored Ape Floor</span>
                  <span className="text-[#DC2626]">▼ 340%</span>
                </div>
                <p className="text-xs">$420,000 → $80,000</p>
              </div>

              <p className="font-newspaper text-lg text-justify mt-2">
                The speculative frenzy evaporated almost overnight. NFT trading volume crashed <span className="font-bold text-[#DC2626]">97%</span> in eight months. Profile pictures that sold for hundreds of thousands became worthless JPEGs. The Bored Ape Yacht Club, once the symbol of digital status, saw its floor price collapse from $420K to $80K.
              </p>
            </div>

            <div className="w-full h-[4px] bg-ink/30 border-dashed border-y-[1px] border-ink/40 my-2"></div>

            {/* Sandbox Ghost Town */}
            <div className="flex flex-col gap-4 era7-reveal">
              <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
                The Sandbox<br/>Ghost Town
              </h3>

              <Tilt3D intensity={12}>
                <div className="w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/sandbox-metaverse.png"
                    alt="The Sandbox Metaverse"
                    className="w-full aspect-[4/3] object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#DC2626] text-white text-[10px] font-sans font-bold px-2 py-1">
                    ABANDONED
                  </div>
                </div>
              </Tilt3D>

              <p className="font-newspaper text-lg text-justify mt-2">
                The Sandbox, once valued at <span className="font-bold">$4 billion</span>, cratered to $1 billion. Global brands like Atari and celebrities like Snoop Dogg had invested heavily in its virtual real estate. Yet, daily active users plummeted to a few hundred — many suspected to be bots. Over 50% of the workforce was laid off. The founders stepped back. Virtual land that sold for millions became worthless digital dirt.
              </p>

              <div className="bg-zinc-200 border-[2px] border-ink p-4 font-sans text-sm italic font-medium opacity-80 era7-reveal">
                &quot;Meme coins with no utility, rug pulls, and pump-and-dumps became the defining legacy of Web 3.0&apos;s speculative era.&quot;<br/>— The Digital Ashes Gazette
              </div>
            </div>
          </div>
        </div>

        {/* Concluding Question */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-16 era7-reveal">
          <div className="border-[4px] border-[#DC2626] p-4 md:p-6 mt-10">
            <p className="text-2xl md:text-3xl font-black uppercase leading-[0.9] tracking-tight text-center text-[#DC2626]">
              After the billions burned and the trust broken, does the decentralized dream still have a future, or was it just a digital mirage?
            </p>
          </div>
        </div>

        {/* End of Volume 7 Marker */}
        <div className="w-full max-w-7xl mx-auto border-t-[12px] border-ink mt-24 md:mt-32 mb-16 relative era7-reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-8 text-ink font-sans font-black tracking-[0.5em] text-sm py-2 border-4 border-ink whitespace-nowrap text-center"><span className="ml-[0.5em]">END OF VOL. 7</span></div>
        </div>

      </div>
    </section>
  );
}
