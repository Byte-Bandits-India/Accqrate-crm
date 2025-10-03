"use client";

import React, { useEffect, useRef, useMemo, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ========================
// TYPES
// ========================

interface ScrollRevealProps {
  children: string | React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  as?: ElementType;
}

// ========================
// COMPONENT
// ========================
const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.2,
  baseRotation = 2,
  blurStrength = 2,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom 60%",
  as: Component = "h2",
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text into words
  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.split(/(\s+)/).map((word, index) =>
      /^\s+$/.test(word) ? (
        <React.Fragment key={index}>{word}</React.Fragment>
      ) : (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      )
    );
  }, [children]);

  // ========================
  // GSAP EFFECT
  // ========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || undefined;

    // Rotation animation
    const rotationTrigger = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    if (rotationTrigger.scrollTrigger) {
      triggers.push(rotationTrigger.scrollTrigger);
    }

    // Opacity/Y/blur animation
    const targets = typeof children === "string" ? el.querySelectorAll<HTMLElement>(".word") : [el];

    const animationTrigger = gsap.fromTo(
      targets,
      {
        opacity: baseOpacity,
        y: 20,
        filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
        willChange: "opacity, transform, filter",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=10%",
          end: wordAnimationEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

    if (animationTrigger.scrollTrigger) {
      triggers.push(animationTrigger.scrollTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    children,
  ]);

  return (
    <Component
      ref={containerRef}
      className={containerClassName}
    >
      {typeof children === "string" ? (
        <span className={textClassName}>{splitText}</span>
      ) : (
        children
      )}
    </Component>
  );
};

export default ScrollReveal;