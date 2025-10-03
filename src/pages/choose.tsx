"use client";

import React from "react";
import { useContext, useState, useEffect, JSX } from "react";
import Skeleton from "../components/ui/skeleton";
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
        {/* Choose Section Skeleton */}
        <section
          id="chooseSection"
          className="bg-[#f2f2f2] font-sans min-h-full m-0 py-8 px-6"
        >
          <div className="max-w-6xl mx-auto">
            {/* Title Skeleton */}
            <div className="text-center mb-8">
              <Skeleton height="48px" width="400px" className="mx-auto mb-4 rounded-lg" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Image Container Skeleton */}
              <div className="flex-1 max-w-[500px]">
                <div className="relative">
                  <Skeleton height="350px" width="100%" className="rounded-lg mb-4" />
                  {/* Animated character skeleton */}
                  <Skeleton height="80px" width="80px" className="absolute -bottom-4 -right-4 rounded-full" />
                </div>
              </div>

              {/* Text Content Skeleton */}
              <div className="flex-1 max-w-[500px] space-y-4">
                <Skeleton height="32px" width="80%" className="rounded-md lg:hidden" />
                <Skeleton height="24px" width="90%" className="rounded-md lg:hidden" />

                <div className="space-y-3">
                  <Skeleton height="20px" width="100%" className="rounded-md" />
                  <Skeleton height="20px" width="95%" className="rounded-md" />
                  <Skeleton height="20px" width="90%" className="rounded-md" />
                  <Skeleton height="20px" width="85%" className="rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready Section Skeleton */}
        <section
          id="readySection"
          className="bg-white mt-12 px-6 min-h-full"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Title Skeleton */}
            <Skeleton height="48px" width="500px" className="mx-auto mb-8 rounded-lg" />

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {buttons.map((_, idx) => (
                <Skeleton
                  key={idx}
                  height="56px"
                  width="200px"
                  className="rounded-lg mx-auto sm:mx-0"
                />
              ))}
            </div>
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