import React, { useContext, useState, useEffect } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion } from "framer-motion";

export default function Tools() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById("toolsSection", "onboardingSection");
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

  if (loading || !isVisible) {
    return (
      <>
      <section
        id="toolsSection"
        className="bg-white py-8 px-4 max-w-[1200px] mx-auto"
      >
        <Skeleton height="36px" width="60%" className="mx-auto mb-4" />
        <Skeleton height="20px" width="80%" className="mx-auto mb-8" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <div className="flex-1">
              <Skeleton height="24px" width="60%" className="mb-2" />
              <Skeleton height="16px" width="80%" />
            </div>
            <div className="flex-1 flex justify-center">
              <Skeleton height="120px" width="100%" />
            </div>
          </div>
        ))}
      </section>

      {/* onboardingSection skeleton */}
      <section id="onboardingSection" className="px-5 max-w-6xl mx-auto mt-12">
        <Skeleton height="36px" width="60%" className="mx-auto mb-6 rounded-md" />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-100 border border-pink-700 rounded-xl p-8 mb-8 shadow-sm w-11/12 max-w-3xl mx-auto"
          >
            <Skeleton height="24px" width="40%" className="mb-3 rounded-md" />
            <Skeleton height="180px" width="100%" className="mb-3 rounded-lg" />
            <Skeleton height="20px" width="80%" className="rounded-md" />
          </div>
        ))}
      </section>
      </>
    );
  }

  const containerVariant = {
    hidden: { x: -100, opacity: 0 }, // start offscreen left
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariant = {
    hidden: { x: 100, opacity: 0 }, // start offscreen right
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
    <motion.section
      id="toolsSection"
      className="bg-white mt-48px px-24px max-w-[1200px] mx-auto"
      variants={containerVariant}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <h2 className="text-center text-fluid-h2 font-medium tracking--5">
        Actionable Insights at{" "}
        <span className="text-[#7B1FA2] font-medium">Your Fingertips</span>
      </h2>
      <p className="text-center text-[#000000B2] tracking--2 text-fluid-caption max-w-lg mt-12px leading-tight mx-auto">
         With Accqrate CRM, you gain real-time insights into your sales pipeline and lead conversion metrics, allowing you to make informed decisions and optimize your strategy quickly.
      </p>

      {/* Sections */}
      {[
        {
          title: "Lead Conversion Metrics:",
          text: "See exactly where each lead is in your pipeline and optimize your approach accordingly",
          video: "/videos/manageroles.mp4",
        },
        {
          title: "Customizable Reports:",
          text: "Generate detailed reports tailored to your needs, tracking everything from lead sources to campaign performance.",
          video: "/videos/dayclosure.mp4",
        },
        {
          title: "Campaign Analytics:",
          text: "Measure which campaigns are converting the most leads and adjust your strategies in real time.",
          video: "/videos/productsearch.mp4",
        },
      ].map((section, idx) => (
        <motion.div
          key={idx}
          className="flex flex-col lg:flex-row lg:items-start gap-[24px]  mt-24px tracking--5"
          initial={{ x: -100, opacity: 0 }}
          animate={isVisible ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: idx * 0.2 }}
        >
          <div className="flex-1">
            <h3 className="text-[#7B1FA2] font-semibold tracking--5 text-fluid-h3 ">
              {section.title} 
            </h3>
            <p className="text-fluid-body leading-tight tracking--2">{section.text}</p>
          </div>
          <div className="flex-1 flex justify-center">
            <video
              src={section.video}
              muted
              autoPlay
              loop
              playsInline
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </motion.div>
      ))}
    </motion.section>


  
        </>
  );
}
