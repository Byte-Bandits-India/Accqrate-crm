import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";

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
  wordAnimationEnd = "bottom 60%", // better end for smoothness
  as = "h2", // dynamic tag
}) => {
  const containerRef = useRef(null);

  // Split text into words if children is string
  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ SSR safe

    let triggers = [];

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = containerRef.current;
      if (!el) return;

      const scroller = scrollContainerRef?.current || window;

      // Ensure refresh after layout ready
      ScrollTrigger.refresh();

      // Rotation effect on the whole container
      triggers.push(
        gsap.fromTo(
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
        ).scrollTrigger
      );

      // Target words (if string) or the container itself
      const targets =
        typeof children === "string"
          ? el.querySelectorAll(".word")
          : [el];

      // Sequential word reveal animation
      triggers.push(
        gsap.fromTo(
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
            stagger: 0.08, // 👈 appear one by one
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom-=10%",
              end: wordAnimationEnd,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        ).scrollTrigger
      );
    })();

    return () => {
      triggers.forEach((t) => t.kill());
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

  const Component = as;

  return (
    <Component ref={containerRef} className={`my-5 ${containerClassName}`}>
      {typeof children === "string" ? (
        <span className={`inline-block ${textClassName}`}>{splitText}</span>
      ) : (
        children
      )}
    </Component>
  );
};

export default ScrollReveal;
