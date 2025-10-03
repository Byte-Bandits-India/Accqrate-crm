import {
  AccordionItem,
  AccordionContent,
} from "../ui/accordion";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  className?: string;
  children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-start justify-between text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-6 w-6 shrink-0 text-[#979797] text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionCardProps {
  value: string;
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function AccordionCard({
  value,
  icon,
  title,
  children,
}: AccordionCardProps) {
  return (
    <AccordionItem
      value={value}
      className="bg-gradient-to-r from-[#E6E6E6] to-[#C8C8C8] w-full h-auto rounded-lg p-[24px]"
    >
      <AccordionTrigger className="w-full hover:no-underline">
        <div className="grid grid-rows-[auto_1fr] justify-items-start gap-[16px]">
          <img
            src={icon}
            alt={title}
            className="w-[45px] h-[45px] md:h-[34.56px] md:w-[31.75px]"
          />
          <span className="text-[#333333] text-fluid-body font-normal leading-6 text-left">
            {title}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-1 pb-2 text-gray-700 text-sm">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
