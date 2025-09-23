import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";
import AccordionCard from "../components/ui/accordion";
export default function Smart() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const element = document.getElementById("transformSection", "ownerSection");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px", threshold: 0.3 }
    );

    observer.observe(element);
    return () => element && observer.unobserve(element);
  }, []);

  const sectionPadding = "mt-24px px-24px max-w-[1200px] mx-auto";

  if (loading || !isVisible) {
    return (
      <>
        {/* Heading & Description */}
        <section className="mt-48px px-24px text-center max-w-[1200px] mx-auto">
          <Skeleton height="36px" width="70%" className="mx-auto mb-6" />
          <Skeleton height="20px" width="90%" className="mx-auto mb-3" />
          <Skeleton height="20px" width="80%" className="mx-auto" />
        </section>

        {/* Transform Section (Cards) */}
        <section id="transformSection" className={sectionPadding}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[24px]">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg w-full sm:h-[280px] md:h-[320px] lg:h-[340px] p-4 flex flex-col justify-start"
              >
                {/* Card header */}
                <Skeleton height="20px" width="70%" className="mb-4" />

                {/* Mobile/desktop simulated content */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <Skeleton height="16px" width="80%" />
                  <Skeleton
                    height="120px"
                    width="100%"
                    className="rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Owner Section */}
        <section
          id="ownerSection"
          className="bg-[#F2F2F2] w-full max-w-[1280px] h-auto md:h-[190px] mx-auto flex items-center justify-center mt-24px rounded-lg px-24px py-8 md:py-0"
        >
          <div className="flex items-center justify-center text-center md:text-left max-w-2xl w-full">
            <div className="w-full">
              <Skeleton
                height="28px"
                width="90%"
                className="mb-5 mx-auto md:mx-0"
              />
              <Skeleton height="16px" width="40%" className="mx-auto md:mx-0" />
            </div>
          </div>
        </section>
      </>
    );
  }

  // Framer Motion variants
  const containerVariant = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Framer Motion variants for right-to-left slide
  const variant = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cards = [
  {
    title: "Disjointed communication",
    desc: "Works instantly on Android, iOS, Windows, and Mac",
    video: "/videos/card1.mp4",
    bgColor: "bg-[#7B1FA2]",
  },
  {
    title: "Lost leads",
    desc: "Cloud-based and ready to use — no installations or IT assistance needed.",
    video: "/videos/card2.mp4",
    bgColor: "bg-[#7B1FA2]",
  },
  {
    title: "Inconsistent data",
    desc: "No drivers, no manual setup—automatic detection and configuration",
    video: "/videos/card3.mp4",
    bgColor: "bg-[#7B1FA2]",
  },
  {
    title: "Inefficiency",
    desc: "Receipts print, cut and display for customers instantly.",
    video: "/videos/card4.mp4",
    bgColor: "bg-[#7B1FA2]",
  },
]


  return (
    <>
      <h1 className="text-center text-fluid-h2 leading-tight max-w-[360px] sm:max-w-[800px] mx-auto tracking--5 font-semibold  mt-48px px-24px">
        A Smart, Scalable Solution for{" "}
        <span className="text-[#7B1FA2]"> Every Sales Team </span> 
      </h1>
      <p className="text-center text-fluid-caption mt-16px px-24px font-light tracking--2  text-black  ">
        Get up and running in minutes, not days. Accqrate Retail’s cloud-native
        architecture means you can onboard each outlet effortlessly—no dedicated
        POS hardware, no complex installations.
      </p>
      <section id="transformSection" className={sectionPadding}>
        {/* Grid Layout: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[24px]">
          {cards.map((card, idx) => (
            <AccordionCard
              key={idx}
              title={card.title}
              desc={card.desc}
              video={card.video}
              bgColor={card.bgColor}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </section>
      {/* Owner Section */}
      <section
        id="ownerSection"
        className=" w-full max-w-[1280px]  mx-auto flex items-center justify-center mt-24px rounded-lg px-24px  "
      >
        <motion.div
          className="flex items-center justify-center"
          variants={variant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className=" md:px-6 text-center tracking--2">
            <p className="font-light leading-snug  md:max-w-2xl text-fluid-caption md:text-fluid-body lg:text-fluid-h3 ">
             Accqrate CRM was meticulously designed to solve these problems. With its intelligent workflows, deep data insights, and seamless integrations, it enables your team to focus on building relationships and closing deals, not on administrative tasks.
            </p>
           
          </div>
        </motion.div>
      </section>
    </>
  );
}
