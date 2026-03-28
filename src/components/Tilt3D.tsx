"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Tilt3D - Premium 3D perspective tilt on hover.
 * Elements rotate in 3D space tracking the mouse position,
 * with a moving light glare overlay for that holographic feel.
 */
const Tilt3D = ({
  children,
  intensity = 12,
  glare = true,
  className = "inline-block",
}: {
  children: React.ReactElement;
  intensity?: number;
  glare?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const glareEl = glareRef.current;
    if (!element || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = element.getBoundingClientRect();

      // Normalize mouse position to -1...1
      const xNorm = ((clientX - left) / width - 0.5) * 2;
      const yNorm = ((clientY - top) / height - 0.5) * 2;

      // Rotate opposite to mouse direction for natural feel
      const rotateY = xNorm * intensity;
      const rotateX = -yNorm * intensity;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
        transformOrigin: "center center",
      });

      // Move the glare highlight to follow the mouse
      if (glareEl && glare) {
        gsap.to(glareEl, {
          opacity: 0.15,
          x: xNorm * 40,
          y: yNorm * 40,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });

      if (glareEl && glare) {
        gsap.to(glareEl, {
          opacity: 0,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, glare]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      data-cursor="hover"
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
          }}
        />
      )}
    </div>
  );
};

export default Tilt3D;
