import React, { useContext, useState, useEffect, FC } from "react";
import Skeleton from "../components/ui/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, easeOut } from "framer-motion";
import FadeUp from "../components/ui/FadeUp";

interface Section {
  title: string;
  text: string;
  video: string;
}

const Tools: FC = () => {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toolsElement = document.getElementById("toolsSection");
    const onboardingElement = document.getElementById("onboardingSection");

    const elements = [toolsElement, onboardingElement].filter(
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
            <div
              key={i}
              className="flex flex-col md:flex-row items-center gap-4 mb-8"
            >
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

        <section
          id="onboardingSection"
          className="px-5 max-w-6xl mx-auto mt-12"
        >
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
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } },
  };

  const sections: Section[] = [
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
  ];

  return (
    <section
      id="toolsSection"
      className="bg-white mt-48px md:mt-[56px] lg:mt-[80px] px-24px md:px-[32px] max-w-[1200px] mx-auto text-[#333333]"
    >
      <FadeUp>
        <h2 className="text-center text-fluid-h2 font-medium tracking-heading mb-[24px] md:mb-[32px] lg:mb-[40px]"
        >
          Actionable Insights at{" "}
          <span className="text-[#7B1FA2] font-medium">Your Fingertips</span>
        </h2>

        <p className="text-center text-[#000000B2] tracking-para text-fluid-caption 
          max-w-lg leading-tight mx-auto mb-[24px] md:mb-[32px] lg:mb-[40px] 
          md:max-w-[600px] lg:max-w-[800px]"
        >
          With Accqrate CRM, you gain real-time insights into <br className="md:hidden" /> your sales
          pipeline and lead conversion metrics, <br className="md:hidden" /> allowing you to make informed
          decisions and optimize <br className="md:hidden" /> your strategy quickly.
        </p>
      </FadeUp>

      {sections.map((section, idx) => (
        <div
          key={idx}
          className="flex flex-col lg:flex-row lg:items-start gap-[24px] mt-[30px] md:mt-[40px] lg:mt-[56px] tracking--5"
        >
          <FadeUp className="flex-1">
            <h3 className="text-[#7B1FA2] font-semibold tracking-heading text-fluid-h3">
              {section.title}
            </h3>
            <p className="text-fluid-body leading-tight tracking-para mt-[16px]">{section.text}</p>
          </FadeUp>
          <FadeUp className="flex-1 flex justify-center">
            <video
              src={section.video}
              muted
              autoPlay
              loop
              playsInline
              className="w-full max-w-md rounded-lg"
            />
          </FadeUp>
        </div>
      ))}
    </section>
  );
};

export default Tools;
