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

export default function Era6_Web3() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".era6-reveal").forEach((elem) => {
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
              2009
            </h2>
          </CopyReveal>

          <div className="w-full h-[2px] bg-[#cc0000]/50 my-2"></div>

          <CopyReveal blockColor="#cc0000" stagger={0.1} duration={0.8} delay={0.4}>
            <h3
              className="text-[8vw] md:text-[5vw] uppercase text-zinc-400 leading-none tracking-widest pl-2"
              style={{ fontFamily: "'OldNewspaperTypes', serif", fontWeight: "normal" }}
            >
              The Decentralized Web
            </h3>
          </CopyReveal>
        </div>
      </div>

      {/* ── NEWSPAPER CONTENT ── */}
      <div className="w-full bg-paper text-ink pt-24 md:pt-32 pb-32 px-2 md:px-12 flex flex-col items-center border-x-[8px] md:border-x-[40px] border-paper relative overflow-hidden">

        {/* ── NEWSPAPER HEADER ── */}
        <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-b-[8px] border-ink pb-6 mb-16 relative z-10">
          <h1 className="font-serif text-[11vw] leading-[0.8] uppercase font-black tracking-tighter text-ink text-center flex flex-col w-full px-4 era6-reveal">
            <div className="w-full text-center border-b-4 border-ink pb-4 mb-4">
              TRUSTLESS
            </div>
            <div className="text-[#DC2626]">
              TIMES
            </div>
          </h1>
          <div className="w-full mt-8 flex justify-between items-center border-y-[4px] border-ink py-3 font-sans text-[10px] md:text-sm uppercase font-bold tracking-[0.2em] px-4 era6-reveal">
            <span>Vol. 6 • 2009-2022</span>
            <span className="hidden md:inline-block outline-text text-center text-[#DC2626]">CODE IS LAW</span>
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

          {/* LEFT COLUMN: Bitcoin & The Genesis Block */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">

            <h2 className="font-serif text-4xl md:text-5xl font-black uppercase leading-[1.05] border-b-[4px] border-ink pb-4 era6-reveal">
              The Genesis Block:<br/>A Ghost Writes The Future
            </h2>

            {/* Newspaper float: Satoshi portrait with text wrapping */}
            <div className="text-justify font-newspaper text-lg era6-reveal">
              <div className="float-left mr-6 mb-4 w-[45%] md:w-[40%]">
                <Tilt3D intensity={8}>
                  <a href="https://en.wikipedia.org/wiki/Satoshi_Nakamoto" target="_blank" rel="noopener noreferrer" className="block relative border-[2px] border-ink overflow-hidden group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/satoshi-nakamoto.png"
                      alt="Satoshi Nakamoto Statue"
                      className="w-full h-auto object-contain contrast-125 group-hover:scale-105 transition-all duration-700"
                    />
                  </a>
                </Tilt3D>
                <p className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center mt-2 leading-tight">The Anonymous Creator: Satoshi Nakamoto</p>
              </div>
              <p className="first-letter:text-[6rem] first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-[0.75]">
                On January 3rd, 2009, a pseudonymous figure known only as Satoshi Nakamoto mined the first block of a radical new technology called Bitcoin. Embedded in that genesis block was a message from The Times: &quot;Chancellor on brink of second bailout for banks.&quot; It was a declaration of war against centralized finance.
              </p>
              <p className="mt-4">
                Nine days later, Nakamoto sent 10 BTC to cryptographer Hal Finney — the first peer-to-peer digital currency transaction in history. There were no banks, no middlemen, no permission required. The code was the law, and the blockchain was the judge.
              </p>
              <p className="mt-4 font-bold border-l-4 border-[#F7931A] pl-4 italic">
                &quot;If you don&apos;t believe it or don&apos;t get it, I don&apos;t have the time to try to convince you, sorry.&quot; — Satoshi Nakamoto
              </p>
              <p className="mt-4">
                On May 22, 2010, programmer Laszlo Hanyecz paid 10,000 BTC for two pizzas — a transaction worth over $700 million at Bitcoin&apos;s peak. It became known as Bitcoin Pizza Day, the most expensive meal in human history.
              </p>
            </div>

            {/* Bitcoin & Ethereum Image */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 era6-reveal mt-4">
              <div className="w-full">
                <Tilt3D intensity={5}>
                  <div className="w-full border-[2px] border-ink overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/bitcoin-ethereum.png"
                      alt="Bitcoin and Ethereum"
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </Tilt3D>
                <p className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-center mt-2">Bitcoin & Ethereum: The Twin Pillars of Web 3.0</p>
              </div>
              <div className="w-full flex flex-col justify-between border-y-[2px] border-ink py-4 font-newspaper text-lg text-justify h-full">
                <div>
                  <h4 className="font-serif text-2xl font-black uppercase leading-[1.1] mb-4 text-center border-b-[2px] border-ink pb-3">Smart Contracts & DApps</h4>
                  <p>
                    In 2015, 21-year-old <span className="font-bold">Vitalik Buterin</span>launched Ethereum — a programmable blockchain that could execute &quot;smart contracts.&quot; Suddenly, developers could build decentralized applications without anyone&apos;s permission. DeFi (Decentralized Finance) was born: lending, borrowing, and trading without a single bank involved.
                  </p>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-ink/70 font-bold mt-4 text-center">
                  Ethereum Launch: July 30, 2015
                </p>
              </div>
            </div>

            {/* Record-Breaking NFT Sales */}
            <div className="w-full era6-reveal mt-6">
              <h3 className="font-serif text-3xl font-black uppercase leading-[1.05] border-b-[4px] border-ink pb-3 mb-6">
                The Most Expensive JPEGs In History
              </h3>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full flex flex-col">
                  <a href="https://opensea.io/item/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/8585" target="_blank" rel="noopener noreferrer" className="block w-full relative border-[2px] border-ink overflow-hidden group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/most-expensive-bored-ape.png"
                      alt="Bored Ape #8585"
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 bg-[#F7931A] text-white text-[10px] font-sans font-bold px-2 py-1">
                      #8585
                    </div>
                  </a>
                  <div className="border-x-[2px] border-b-[2px] border-ink p-3 bg-zinc-100">
                    <h4 className="font-serif text-lg font-black uppercase leading-tight">Bored Ape #8585</h4>
                    <p className="font-sans text-xs mt-1"><span className="font-bold text-[#F7931A]">696.969 ETH (~$2.7M)</span> • Oct 2021</p>
                    <p className="font-newspaper text-sm text-justify mt-2">
                      One of the rarest apes in the collection, #8585 shattered records when it sold for nearly 697 ETH. Its gold fur and laser eyes made it a trophy for the crypto elite.
                    </p>
                  </div>
                </div>

                <div className="w-full flex flex-col">
                  <a href="https://opensea.io/item/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/5822" target="_blank" rel="noopener noreferrer" className="block w-full relative border-[2px] border-ink overflow-hidden group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/most-expensive-cryptopunk.png"
                      alt="CryptoPunk #5822"
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 bg-[#638596] text-white text-[10px] font-sans font-bold px-2 py-1">
                      #5822
                    </div>
                  </a>
                  <div className="border-x-[2px] border-b-[2px] border-ink p-3 bg-zinc-100">
                    <h4 className="font-serif text-lg font-black uppercase leading-tight">CryptoPunk #5822</h4>
                    <p className="font-sans text-xs mt-1"><span className="font-bold text-[#638596]">8,000 ETH (~$23.7M)</span> • Feb 12, 2022</p>
                    <p className="font-newspaper text-sm text-justify mt-2">
                      One of only 9 &quot;Alien&quot; CryptoPunks ever minted, #5822 was purchased by Deepak Thapliyal, CEO of Chain, setting the all-time CryptoPunk sales record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR: NFTs & Metaverse */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-12 border-t-[4px] xl:border-t-0 xl:border-l-[4px] border-ink pt-12 xl:pt-0 xl:pl-10">

            {/* NFT Explosion */}
            <div className="flex flex-col gap-4 era6-reveal">
              <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
                The NFT<br/>Explosion
              </h3>

              <div className="w-full flex flex-col gap-4">
                <Tilt3D intensity={12}>
                  <a href="https://boredapeyachtclub.com/" target="_blank" rel="noopener noreferrer" className="block w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/bored-ape-fun.png"
                      alt="Bored Ape Yacht Club"
                      className="w-full aspect-[4/3] object-cover contrast-125 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-2 right-2 bg-[#F7931A] text-white text-[10px] font-sans font-bold px-2 py-1 flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> BAYC
                    </div>
                  </a>
                </Tilt3D>

                <div className="w-full grid grid-cols-2 gap-3">
                  <Tilt3D intensity={12}>
                    <a href="https://opensea.io/" target="_blank" rel="noopener noreferrer" className="block w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group cursor-pointer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/opensea.png"
                        alt="OpenSea NFT Marketplace"
                        className="w-full aspect-square object-cover contrast-125 object-top group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute bottom-1 left-1 bg-[#2081E2] text-white text-[8px] font-sans font-bold px-1.5 py-0.5">
                        OpenSea
                      </div>
                    </a>
                  </Tilt3D>

                  <Tilt3D intensity={12}>
                    <a href="https://fr.wikipedia.org/wiki/Rarible" target="_blank" rel="noopener noreferrer" className="block w-full relative border-[2px] border-ink p-1 bg-white overflow-hidden group cursor-pointer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/rariable.png"
                        alt="Rarible NFT Marketplace"
                        className="w-full aspect-square object-cover contrast-125 object-top group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute bottom-1 left-1 bg-[#FEDA03] text-black text-[8px] font-sans font-bold px-1.5 py-0.5">
                        Rarible
                      </div>
                    </a>
                  </Tilt3D>
                </div>
              </div>

              <p className="font-newspaper text-lg text-justify mt-2">
                In March 2021, digital artist <span className="font-bold text-[#F7931A]">Beeple</span> sold an NFT titled &quot;Everydays: The First 5000 Days&quot; for a staggering <span className="font-bold">$69.3 million</span> at Christie&apos;s auction house. The Bored Ape Yacht Club hit a floor price of $420,000. Trading volume on platforms like <span className="font-bold text-[#2081E2]">OpenSea</span> and <span className="font-bold text-[#FEDA03]">Rarible </span>peaked at $17 billion in January 2022. Digital art wasn&apos;t just pixels anymore — it was gold.
              </p>
            </div>

            <div className="w-full h-[4px] bg-ink/30 border-dashed border-y-[1px] border-ink/40 my-2"></div>

            {/* Metaverse & Facebook → Meta */}
            <div className="flex flex-col gap-4 era6-reveal">
              <h3 className="font-serif text-3xl font-black uppercase leading-none border-b-[2px] border-ink pb-2">
                Enter The<br/>Metaverse
              </h3>

              <p className="font-newspaper text-lg text-justify">
                On <span className="font-bold">October 28, 2021</span>, Mark Zuckerberg made the most audacious corporate rebrand in history. Facebook — the company that defined social media — renamed itself <span className="font-bold text-[#0668E1]">Meta</span>. Zuckerberg bet everything on the metaverse: a persistent, immersive virtual world where people would work, play, and live.
              </p>

              {/* Daily Prophet: Meta Rebrand Video */}
              <Tilt3D intensity={8}>
                <div className="w-full relative border-[2px] border-ink overflow-hidden group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/video/Meta-rebrand.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-0 left-0 bg-ink text-paper font-sans text-xs uppercase font-bold tracking-widest px-4 py-2">
                    Zuckerberg Announces Meta, Oct 2021
                  </div>
                </div>
              </Tilt3D>

              <p className="font-newspaper text-lg text-justify mt-2">
                The Sandbox was valued at <span className="font-bold">$4 billion</span>. Virtual land plots sold for millions. Celebrities, brands, and investors raced to stake their claim in the digital frontier. It felt like the dot-com boom all over again — but this time, everyone was sure it was different.
              </p>
              <div className="bg-zinc-200 border-[2px] border-ink p-4 font-sans text-sm italic font-medium opacity-80 era6-reveal">
                &quot;The metaverse is the next chapter for the internet.&quot;<br/>— Mark Zuckerberg, Oct 28, 2021
              </div>
            </div>
          </div>
        </div>

        {/* End of Volume 6 Marker */}
        <div className="w-full max-w-7xl mx-auto border-t-[12px] border-ink mt-24 md:mt-32 mb-16 relative era6-reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper px-8 text-ink font-sans font-black tracking-[0.5em] text-sm py-2 border-4 border-ink whitespace-nowrap text-center"><span className="ml-[0.5em]">END OF VOL. 6</span></div>
        </div>

      </div>
    </section>
  );
}
