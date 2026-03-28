"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

interface CopyRevealProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  stagger?: number;
  duration?: number;
}

export default function CopyReveal({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#cc0000",
  stagger = 0.15,
  duration = 0.75,
}: CopyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitText[]>([]);
  const lines = useRef<HTMLElement[]>([]);
  const blocks = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      // Small timeout to ensure font loading before SplitText measures
      const timeout = setTimeout(() => {
        if (!containerRef.current) return;

        splitRefs.current = [];
        lines.current = [];
        blocks.current = [];

        let elements: Element[] = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(containerRef.current.children);
        } else {
          elements = [containerRef.current];
        }

        elements.forEach((element) => {
          const split = new SplitText(element as HTMLElement, {
            type: "lines",
            linesClass: "block-line-inner relative block",
            lineThreshold: 0.1,
          });

          splitRefs.current.push(split);

          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.className = "block-line-wrapper relative w-max block mx-auto";
            
            if (line.parentNode) {
              line.parentNode.insertBefore(wrapper, line);
              wrapper.appendChild(line);
            }

            const block = document.createElement("div");
            block.className = "block-revealer absolute top-0 left-0 w-[101%] h-[101%] z-10 pointer-events-none will-change-transform";
            block.style.backgroundColor = blockColor;
            wrapper.appendChild(block);

            lines.current.push(line as HTMLElement);
            blocks.current.push(block);
          });
        });

        gsap.set(lines.current, { opacity: 0 });
        gsap.set(blocks.current, { scaleX: 0, transformOrigin: "left center" });

        const createBlockRevealAnimation = (block: HTMLElement, line: HTMLElement, index: number) => {
          const tl = gsap.timeline({ delay: delay + index * stagger });

          tl.to(block, { scaleX: 1, duration: duration, ease: "power4.inOut" });
          tl.set(line, { opacity: 1 });
          tl.set(block, { transformOrigin: "right center" });
          tl.to(block, { scaleX: 0, duration: duration, ease: "power4.inOut" });

          return tl;
        };

        if (animateOnScroll) {
          blocks.current.forEach((block, index) => {
            const tl = createBlockRevealAnimation(
              block,
              lines.current[index],
              index
            );
            tl.pause();

            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
              onEnter: () => tl.play(),
            });
          });
        } else {
          blocks.current.forEach((block, index) => {
            createBlockRevealAnimation(block, lines.current[index], index);
          });
        }
      }, 100);

      return () => {
        clearTimeout(timeout);
        splitRefs.current.forEach((split) => split?.revert());

        const wrappers = containerRef.current?.querySelectorAll(".block-line-wrapper");
        wrappers?.forEach((wrapper) => {
          if (wrapper.parentNode && wrapper.firstChild) {
            wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            wrapper.remove();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, stagger, duration],
    }
  );

  // Always wrap in a div to avoid React 19 ref access errors during render
  return (
    <div ref={containerRef} data-copy-wrapper="true" className="w-full">
      {children}
    </div>
  );
}
