"use client";

import React, { useContext, useState, useEffect, JSX } from "react";
import Skeleton from "../components/ui/skeleton";
import { LoadingContext } from "../utils/LoadingContext";
import { motion, Variants } from "framer-motion";
import AccordionCard from "../components/ui/AccordionSilverCard";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import ScrollReveal from "../components/ui/ScrollReveal";

export default function Capture(): JSX.Element {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to trigger animation
  useEffect(() => {
    const el = document.getElementById("posSection");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px", threshold: 0.3 }
    );

    observer.observe(el);

    // SAFER CLEANUP: DISCONNECT THE OBSERVER INSTEAD OF CALLING unobserve WITH A MAYBE-NULL ELEMENT
    return () => {
      observer.disconnect();
    };
  }, []);

  if (loading || !isVisible) {
    return (
      <>
        {/* POS Section Skeleton */}
        <section id="posSection" className="px-24px rounded-xl mt-48px">
          <div className="max-w-[1000px] mx-auto">
            <Skeleton height="220px" width="100%" className="rounded-lg mb-6" />

            <div
              className="flex flex-col gap-[24px]
              sm:grid sm:grid-cols-2
              md:grid md:grid-cols-3 md:max-w-5xl mx-auto mt-24px"
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 w-full h-auto rounded-lg p-[24px] flex flex-col gap-4"
                >
                  <Skeleton height="45px" width="45px" className="mb-2" />
                  <Skeleton height="24px" width="80%" className="mb-2" />
                  <Skeleton height="16px" width="60%" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ERP Section Skeleton */}
        <section
          id="erpSection"
          className="px-24px max-w-[1200px] mx-auto text-center mt-48px"
        >
          <Skeleton height="36px" width="70%" className="mb-6 mx-auto" />
          <Skeleton height="20px" width="90%" className="mb-4 mx-auto" />

          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mt-24px"
            >
              <div className="flex-1">
                <Skeleton
                  height="20px"
                  width="80%"
                  className="mb-3 mx-auto lg:mx-0"
                />
                <Skeleton
                  height="20px"
                  width="60%"
                  className="mb-3 mx-auto lg:mx-0"
                />
              </div>

              <div className="flex-1 flex justify-center">
                <Skeleton
                  height="220px"
                  width="100%"
                  className="max-w-md rounded-lg"
                />
              </div>
            </div>
          ))}
        </section>
      </>
    );
  }

  // TYPED VARIANTS (THIS IS THE KEY FIX)
  const variant: Variants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Pos Section */}
      <section
        id="posSection"
        className=" px-24px md:px-[32px] rounded-xl  mt-48px md:mt-[56px] lg:mt-[80px] text-[#333333]"
      >
        <ScrollReveal
          as="h1"
          containerClassName="text-center text-fluid-h2 leading-tight max-w-[340px] sm:max-w-[800px] mx-auto tracking--5 font-semibold  mt-48px px-24px"
        >
          Capture, Track, and <span className="text-[#7B1FA2]"> Convert Leads </span>
        </ScrollReveal>

        <ScrollReveal
          as="p"
          containerClassName="text-center text-gray-500 text-fluid-caption md:max-w-[1062px] mx-auto mt-16px px-24px font-light tracking--2"
        >
          Accqrate CRM ensures you never lose a lead again. From the moment they
          enter your system to the moment they convert, Accqrate CRM tracks and
          nurtures leads seamlessly, so your team can focus on closing sales
          rather than tracking down prospects.
        </ScrollReveal>

        <motion.div
          variants={variant}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-[1000px] mx-auto"
        >
          <div>
            <video
              src="/videos/barcode.mp4"
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-auto object-contain rounded-lg mt-24px md:mt-[32px] lg:mt-[40px]"
            />
          </div>

          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-[24px]
              sm:grid sm:grid-cols-2
              md:grid md:grid-cols-3 md:max-w-5xl mx-auto mt-24px md:mt-[32px] lg:mt-[40px]"
          >
            <AccordionCard
              value="card-1"
              icon="/images/instant.png"
              title="Instant Lead Capture"
            >
              <>
                Extra details about <b>Instant Lead Capture</b> will appear here
                when expanded.
              </>
            </AccordionCard>

            <AccordionCard
              value="card-2"
              icon="/images/instant.png"
              title="Comprehensive Lead Tracking"
            >
              <>
                Extra details about <b>Comprehensive Lead Tracking</b> will be
                shown here.
              </>
            </AccordionCard>

            <AccordionCard
              value="card-3"
              icon="/images/instant.png"
              title="Custom Lead Statuses"
            >
              <>
                Extra details about <b>Role-Based User Setup</b> will go here.
              </>
            </AccordionCard>
          </Accordion>
        </motion.div>
      </section>

      {/* Erp Section */}
      <section
        id="erpSection"
        className="px-24px md:px-[32px] max-w-[1200px] mx-auto text-center mt-48px md:mt-[56px] text-[#333333] lg:mt-[80px]"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollReveal
            as="h2"
            containerClassName="text-fluid-h2 font-medium tracking--5 leading-tight "
          >
            Automate Your <span className="text-[#7B1FA2]">Sales Pipeline</span>
          </ScrollReveal>

          <ScrollReveal
            as="p"
            containerClassName="text-fluid-caption text-[#737373] mt-16px md:mt-[24px] lg:mt-[32px] md:max-w-[1062px] tracking--2 max-w-4xl mx-auto"
          >
            Stop wasting time on manual tasks. Accqrate CRM automates everything
            from lead capture to conversion, giving your sales team more time to
            do what they do best — close deals.
          </ScrollReveal>

          {[
            {
              text: "Automated Lead Assignment:",
              desc: "Automatically assign leads based on predefined criteria.",
              video: "/videos/pos.mp4",
            },
            {
              text: "Automated Follow-Ups:",
              desc: "Ensure that no lead is forgotten with automated reminders for your sales reps.",
              video: "/videos/dashboard.mp4",
            },
            {
              text: "Custom Workflows:",
              desc: "Design workflows to match your business processes, ensuring every action is streamlined and efficient.",
              video: "/videos/crm.mp4",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 mt-24px md:mt-[32px] lg:mt-[40px]"
            >
              <div className="flex-1">
                <p className="md:block hidden text-left leading-snug text-fluid-h3 text-[#7B1FA2] font-light max-w-lg">
                  {feature.text} {feature.desc}
                </p>
                <p className="md:hidden text-left tracking--2 leading-snug text-fluid-h3 text-[#7B1FA2] font-light">
                  {feature.text} <br />
                  <span className="text-gray-700 text-fluid-caption">
                    {feature.desc}
                  </span>
                </p>
              </div>

              <div className="flex-1 flex justify-center">
                <video
                  src={feature.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls={false}
                  preload="auto"
                  className="w-full max-w-md h-auto"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
