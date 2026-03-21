"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide default cursor across the viewport
    document.body.style.cursor = "none";
    
    // QuickTo for ultra-performant dragging
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0, ease: "none" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0, ease: "none" });
    
    // Slight lag on the follower ring for the classic Awwwards trailing effect
    const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3" });
    const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Mutation observer to handle elements added to DOM later
    const attachHoverEvents = () => {
      const interactiveElements = document.querySelectorAll("a, button, [data-cursor='hover']");
      
      const onMouseEnter = () => {
        gsap.to(followerRef.current, { scale: 3, backgroundColor: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(2px)", duration: 0.3 });
        gsap.to(cursorRef.current, { scale: 0, duration: 0.2 });
      };
      
      const onMouseLeave = () => {
        gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent", backdropFilter: "none", duration: 0.3 });
        gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
      };

      interactiveElements.forEach((el) => {
        // Prevent adding multiple listeners
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
        (el as HTMLElement).style.cursor = "none";
      });
    };

    attachHoverEvents();
    
    // Periodically re-attach for lazy-rendered GSAP scroll items
    const interval = setInterval(attachHoverEvents, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 bg-red-600 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      ></div>
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-red-600 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-colors"
      ></div>
    </>
  );
}
