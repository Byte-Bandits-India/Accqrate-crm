import React, { useContext, useState, useEffect, FC } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, easeOut } from "framer-motion";
import AccordionCard from "../components/ui/accordion";
import ScrollReveal from "../components/ui/ScrollReveal";

interface Card {
  title: string;
  desc: string;
  video: string;
  bgColor?: string;
}

const Smart: FC = () => {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const transformElement = document.getElementById("transformSection");
    const ownerElement = document.getElementById("ownerSection");

    const elements = [transformElement, ownerElement].filter(
      (el): el is HTMLElement => el !== null
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px", threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const sectionPadding = "mt-6 px-6 md:px-8 md:mt-8 lg:mt-10 max-w-[1200px] mx-auto";

  if (loading || !isVisible) {
    return (
      <>
        <section className="mt-12 px-6 text-center max-w-[1200px] mx-auto">
          <Skeleton height="36px" width="70%" className="mx-auto mb-6" />
          <Skeleton height="20px" width="90%" className="mx-auto mb-3" />
          <Skeleton height="20px" width="80%" className="mx-auto" />
        </section>

        <section id="transformSection" className={sectionPadding}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg w-full sm:h-[280px] md:h-[320px] lg:h-[340px] p-4 flex flex-col justify-start"
              >
                <Skeleton height="20px" width="70%" className="mb-4" />
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <Skeleton height="16px" width="80%" />
                  <Skeleton height="120px" width="100%" className="rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="ownerSection"
          className="bg-[#F2F2F2] w-full max-w-[1280px] h-auto md:h-[190px] mx-auto flex items-center justify-center mt-6 rounded-lg px-6 py-8 md:py-0"
        >
          <div className="flex items-center justify-center text-center md:text-left max-w-2xl w-full">
            <div className="w-full">
              <Skeleton height="28px" width="90%" className="mb-5 mx-auto md:mx-0" />
              <Skeleton height="16px" width="40%" className="mx-auto md:mx-0" />
            </div>
          </div>
        </section>
      </>
    );
  }

  const cards: Card[] = [
    {
      title: "Disjointed communication",
      desc: "Works instantly on Android, iOS, Windows, and Mac",
      video: "/videos/card1.mp4",
    },
    {
      title: "Lost leads",
      desc: "Cloud-based and ready to use — no installations or IT assistance needed.",
      video: "/videos/card2.mp4",
    },
    {
      title: "Inconsistent data",
      desc: "No drivers, no manual setup—automatic detection and configuration",
      video: "/videos/card3.mp4",
    },
    {
      title: "Inefficiency",
      desc: "Receipts print, cut and display for customers instantly.",
      video: "/videos/card4.mp4",
    },
  ];

  const variant = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <>
      <div className="w-full max-w-[1280px] mx-auto text-[#333333]">
        <ScrollReveal
          as="h1"
          containerClassName="text-center text-fluid-h2 leading-tight tracking--5 font-semibold mt-12 md:mt-14 px-6 md:px-8"
        >
          A Smart, Scalable Solution for <span className="text-[#7B1FA2]"> Every Sales Team </span>
        </ScrollReveal>

        <ScrollReveal
          as="p"
          containerClassName="text-center text-fluid-caption px-6 md:px-8 font-light tracking--2"
        >
          Every sales team faces common obstacles: 
        </ScrollReveal>
      </div>

      <section id="transformSection" className={sectionPadding}>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {cards.map((card, idx) => (
            <AccordionCard
              key={idx}
              title={card.title}
              desc={card.desc}
              video={card.video}
              bgColor={card.bgColor} // NOW ACCEPTED
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      <section
        id="ownerSection"
        className="w-full max-w-[1280px] text-[#333333] mx-auto flex items-center justify-center mt-6 md:mt-8 lg:mt-10 rounded-lg px-6 md:px-8 lg:px-10"
      >
        <motion.div
          className="flex items-center justify-center"
          variants={variant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="text-center tracking--2">
            <ScrollReveal
              as="p"
              containerClassName="font-light leading-snug md:max-w-6xl text-fluid-caption md:text-fluid-body lg:text-fluid-h3"
            >
              Accqrate CRM was meticulously designed to solve these problems.
              With its intelligent workflows, deep data insights, and seamless integrations,
              it enables your team to focus on building relationships and closing deals,
              not on administrative tasks.
            </ScrollReveal>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Smart;
