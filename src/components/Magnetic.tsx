"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Pull element towards mouse based on distance
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      // Snap back to original position
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={ref} className="inline-block" data-cursor="hover">{children}</div>;
}
