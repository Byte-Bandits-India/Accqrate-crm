"use client";

import React from "react";
import Link from "next/link";

interface Button {
  text: string;
  href?: string;
  variant?: "filled" | "outlined";
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

interface ButtonGroupProps {
  buttons?: Button[];
  className?: string;
}

export default function ButtonGroup({ buttons = [], className = "" }: ButtonGroupProps) {
  return (
    <div
      className={`my-8 md:my-[40px] lg:mt-[60px] flex flex-col md:flex-row gap-[12px] md:text-lg ${className}`}
    >
      {buttons.map((btn, index) => (
        <Link
          key={index}
          href={btn.href || "#"}
          className={`
            px-16 py-4 rounded-full font-semibold text-center
            ${
              btn.variant === "filled"
                ? `${btn.bgColor || "bg-[#1976D2]"} ${btn.textColor || "text-white"}`
                : `border ${btn.borderColor || "border-[#1976D2]"} ${
                    btn.textColor || "text-[#7B1FA2]"
                  }`
            }`}
        >
          {btn.text}
        </Link>
      ))}
    </div>
  );
}
