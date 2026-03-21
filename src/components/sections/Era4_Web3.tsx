"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Stars() {
  const ref = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const count = 6000;
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2.0 * Math.PI * u;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.5;

      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#a78bfa"
          size={0.004}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

const Era4_Web3 = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered text reveal
      gsap.from(".web3-reveal", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });

      // Glow pulse on the title
      gsap.to(".web3-title", {
        textShadow: "0 0 80px rgba(168,85,247,0.4), 0 0 160px rgba(236,72,153,0.2)",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[140vh] bg-black text-white flex flex-col items-center justify-start overflow-hidden"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <Stars />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.6}
            enablePan={false}
          />
        </Canvas>
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-8 pt-[20vh] md:pt-[25vh] flex flex-col items-center pointer-events-none">
        <h2
          className="web3-title web3-reveal text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 text-center uppercase font-sans font-black tracking-tight leading-[0.9]"
          style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
        >
          Into the<br />Metaverse
        </h2>

        <p className="web3-reveal mt-10 text-lg md:text-2xl font-sans text-zinc-300 max-w-2xl text-center leading-relaxed backdrop-blur-lg bg-white/[0.04] p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_8px_60px_rgba(168,85,247,0.1)]">
          The boundaries of the screen dissolve. Web3 points toward a
          decentralized, spatial internet powered by immersive tech. The
          journey of connection is no longer just flat pages — it&apos;s
          entire worlds.
        </p>

        <div className="web3-reveal mt-16 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">5B+</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-sans font-bold">Users Online</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">$3T</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-sans font-bold">Digital Economy</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">∞</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 mt-2 font-sans font-bold">Possibilities</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full flex flex-col items-center mt-auto pb-20 pointer-events-none">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-zinc-700 mb-6" />
        <p className="text-zinc-600 font-sans tracking-[0.4em] uppercase text-[10px] font-bold">
          End of Volume I
        </p>
        <p className="mt-3 text-zinc-500 font-sans tracking-[0.2em] uppercase text-xs font-bold">
          The Hypertext Herald — 2026
        </p>
      </div>
    </section>
  );
}


export default Era4_Web3;
