"use client";

import { useContext, useState, useEffect, JSX } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const buttons: string[] = ["REQUEST A DEMO", "CONTACT SALES", "LEARN MORE"];

export default function Choose(): JSX.Element {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const chooseElement = document.getElementById("chooseSection");
    const readyElement = document.getElementById("readySection");
    if (!chooseElement || !readyElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { rootMargin: "0px", threshold: 0.3 }
    );

    observer.observe(chooseElement);
    observer.observe(readyElement);

    return () => {
      observer.unobserve(chooseElement);
      observer.unobserve(readyElement);
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <>
        <section
          id="chooseSection"
          className="bg-[#f2f2f2] text-center font-sans min-h-full m-0 py-8"
        >
          <Skeleton height="36px" width="60%" className="mb-6 mx-auto" />
          <Skeleton height="300px" width="700px" className="mb-6 mx-auto" />
          <Skeleton height="80px" width="80px" className="mb-6 mx-auto" />
          <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
          <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
          <Skeleton height="20px" width="80%" className="mb-3 mx-auto" />
        </section>

        <section
          id="readySection"
          className="bg-gray-200 mt-12 px-6 text-center min-h-full"
        >
          <Skeleton height="36px" width="60%" className="mb-8 mx-auto rounded-md" />
          <div className="flex flex-wrap justify-center gap-4">
            {buttons.map((_, idx) => (
              <Skeleton key={idx} height="44px" width="180px" className="rounded-full" />
            ))}
          </div>
        </section>
      </>
    );
  }

  const fadeInLeft: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInRight: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      <motion.section
        id="chooseSection"
        className="bg-[#F2F2F2] text-center font-sans min-h-full m-0 mt-12 md:mt-14 md:px-8 py-6 md:py-8 px-6 text-[#333333]"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.h2
          className="text-fluid-h2 font-semibold pb-6 md:pb-8 tracking--5"
          variants={fadeInLeft}
        >
          Why Choose <span className="text-[#7B1FA2]">Accqrate Retail?</span>
        </motion.h2>

        <motion.div
          className="flex flex-col gap-12 items-center md:flex-row md:justify-center md:items-center"
          variants={fadeInLeft}
          transition={{ delay: 0.2 }}
        >
          <div className="relative inline-block max-w-[600px] md:max-w-[400px]">
            <Image
              src="/images/choose.svg"
              alt="Why Choose Accqrate Retail"
              width={700}
              height={300}
              className="w-full h-auto md:h-[450px] lg:h-[350px] block"
              loading="lazy"
            />
            <Image
              src="/gif/Shopping.gif"
              alt="Animated Character"
              width={80}
              height={80}
              className="absolute right-0 bottom-0 md:bottom-16 md:right-[-10px] w-[100px] h-auto pointer-events-none"
              loading="lazy"
            />
          </div>

          <div className="max-w-[600px] text-left md:max-w-[500px]">
            <p className="text-black font-light text-fluid-h3 leading-tight lg:hidden">
              <span className="font-semibold tracking--2">Compliance by design:</span>
            </p>
            <p className="text-fluid-caption tracking--2 mt-3 lg:hidden">
              Stay ready for every regulation no last-minute changes.
            </p>
            <ol className="md:pl-4 md:pr-20 font-light tracking--2 mb-8 space-y-4 text-fluid-caption mt-3">
              <li>1. Device & vendor freedom: Use any hardware, any printer, no lock-in.</li>
              <li>2. Future-proof scaling: Grow from single store POS to a full ERP suite, no re-implementation.</li>
              <li>3. Total control: See your data, operations, and compliance in real time.</li>
            </ol>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        id="readySection"
        className="my-12 md:my-14 md:px-8 px-6 text-center min-h-full text-[#333333] mt-8"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.h2 className="font-semibold text-fluid-h2" variants={fadeInRight}>
          Ready to accelerate your retail business?
        </motion.h2>
        <motion.div
          className="flex flex-col md:flex-row md:max-w-[700px] mx-auto justify-center gap-5 mt-8"
          variants={fadeInRight}
          transition={{ delay: 0.2 }}
        >
          {buttons.map((label, idx) => (
            <motion.button
              key={idx}
              className="bg-[#7B1FA2] text-fluid-caption hover:bg-pink-800 text-white font-light rounded-lg px-6 py-4 w-[260px] md:w-[300px] mx-auto text-center transition-colors"
              variants={fadeInRight}
              transition={{ delay: 0.3 + idx * 0.2 }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      </motion.section>
    </>
  );
}
