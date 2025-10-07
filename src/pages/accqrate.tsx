"use client";

import { CustomImage } from "../components/CommonComponents";
import { JSX, useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/ui/skeleton";
import ButtonGroup from "../components/ui/ButtonGroup";
import React from "react";
import FadeUp from "../components/ui/FadeUp";

// BUTTON PROPS INTERFACE
interface ButtonProps {
  text: string;
  href: string;
  variant: "filled" | "outlined"; // FIXED TYPE
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function Accqrate(): JSX.Element {
  const { loading } = useContext(LoadingContext);

  const sectionPadding: string = "px-4 py-8 md:py-12 md:px-[32px]";

  const sectionClasses: string =
    "w-full bg-[#F2F2F2] mt-32px pt-[32px] pt-[40px]";
  const containerClasses: string =
    "flex flex-col text-center lg:flex-row justify-between max-w-[1300px] mx-auto gap-[12px] md:px-[32px] px-24px md:px-[32px] lg:px-[40px] items-center";

  if (loading) {
    return (
      <>
        {/* ACCQRATE SECTION */}
        <section className="w-full px-24px flex flex-col items-center">
          <Skeleton height="48px" width="240px" className="mt-82px mb-8" />
          <Skeleton height="24px" width="60%" className="mb-4" />
          <Skeleton height="20px" width="70%" className="mb-4" />
          <Skeleton height="20px" width="50%" className="mb-6" />
          <Skeleton height="18px" width="80%" className="mb-12" />

          <div className="flex justify-center gap-4">
            <Skeleton height="44px" width="160px" />
            <Skeleton height="44px" width="160px" />
          </div>
        </section>

        {/* DASHBOARD SECTION */}
        <section className="w-full flex items-center justify-center mt-24px md:mt-[32px] lg:mt-[40px] box-border px-24px">
          <Skeleton
            height="400px"
            width="100%"
            className="mx-auto max-w-[1200px] rounded-lg"
          />
        </section>

        {/* BUILT SECTION */}
        <section className={sectionClasses}>
          <div className={containerClasses}>
            {/* TEXT SIDE */}
            <div className="flex flex-col justify-center flex-1">
              <Skeleton height="36px" width="70%" className="mb-6" />
              <Skeleton height="20px" width="80%" className="mb-3" />
              <Skeleton height="20px" width="60%" className="mb-3" />
            </div>

            {/* IMAGE SIDE */}
            <Skeleton
              height="250px"
              width="250px"
              className="mx-auto rounded-md"
            />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ACCQRATE SECTION */}
      <section
        className={`w-full px-24px md:px-[32px] flex flex-col items-center text-[#333333]`}
      >
        <h2 className="text-center text-[36px] md:text-fluid-h1 leading-tight tracking-heading font-semibold  mt-82px">
          <span className="text-[#333333] ">Accqrate</span>{" "}
          <span className="text-[#7B1FA2] ">CRM</span>
        </h2>

        <p className="text-center max-w-[300px] sm:max-w-[900px] text-[20px] md:text-fluid-h2  leading-tight tracking-para font-light mt-32px">
          Turn{" "}
          <span className="text-[#7B1FA2] font-medium text-fluid-h2">
            Every Lead
          </span>{" "}
          into a Customer Effortlessly
        </p>

        <p className="text-center text-[14px] md:text-fluid-body font-light tracking-para leading-tight md:font-semibold mt-32px">
          Empower Your Sales with Intelligent Lead <br /> Management & Conversion
        </p>

        <p className=" max-w-[700px] text-center text-fluid-caption tracking-para font-normal text-gray-400 mt-16px md:mt-[20px]">
          Accqrate CRM is not just a tool; it’s the heart of your <br className="md:hidden" /> sales engine.
          Powered by automation and real-time <br className="md:hidden" /> analytics, Accqrate CRM transforms
          your sales process <br className="md:hidden" /> making it smarter, faster, and more predictable.
        </p>

        <div className="flex justify-center">
          <ButtonGroup
            buttons={[
              {
                text: "REQUEST A DEMO",
                href: "/demo",
                variant: "filled",
                bgColor: "bg-[#7B1FA2]",
                textColor: "text-white",
              },
              {
                text: "CONTACT SALES",
                href: "/contact",
                variant: "outlined", // FIXED HERE
                borderColor: "border-[#7B1FA2]",
              },
            ] as ButtonProps[]}
          />
        </div>
      </section>

      {/* DASHBOARD SECTION */}
      <section className="w-full flex items-center justify-center box-border px-24px md:px-[32px] mt-8">
        <div className="relative w-full max-w-[1200px] overflow-visible">
          <video
            src="/videos/accqratedashboard.mp4"
            muted
            autoPlay
            loop
            playsInline
            controls={false}
            preload="auto"
            className="w-full h-auto block object-contain max-h-[60vh] sm:max-h-[60vh]"
          />
        </div>
      </section>

      {/* BUILT SECTION */}
      <section className={sectionClasses}>
        <div className={containerClasses}>
          {/* TEXT */}
          <FadeUp
            className="flex flex-col justify-center flex-1 text-[#333333]"
          >
            <h2 className="text-[20px] md:text-fluid-h2 font-semibold text-[#8A39AC] tracking-heading">
              Built-In{" "}
              <span className="text-[#8A39AC] font-semibold">
                E-Invoicing Compliance
              </span>
            </h2>
            <p className=" mx-auto mt-32px text-[16px] md:text-fluid-h3 sm:text-base tracking-para font-normal">
              <span className="font-semibold">100% ZATCA</span> phase 2
              compliance: Issue e-invoice receipts with <br className="hidden md:block" /> every sale, no extra
              fees
            </p>
          </FadeUp>

          {/* IMAGE */}
          <FadeUp
            className="sm:flex sm:justify-center w-auto"
          >
            <CustomImage
              src="/images/zatak.svg"
              alt="E-Invoice"
              width="350"
              height="350"
              className="h-[200px] md:h-[250px]"
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
