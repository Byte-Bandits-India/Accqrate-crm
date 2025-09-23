import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

import { cn } from "@/src/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        className="h-6 w-6 shrink-0 text-[#979797] text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export default function AccordionCard({ title, desc, video, isOpen, onToggle, bgColor }) {
  return (
    <motion.div
      layout
      initial={false}
      animate={{ height: isOpen ? 353 : 126 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`${bgColor} text-white rounded-lg w-full overflow-hidden`}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-10 py-6 cursor-pointer"
        onClick={onToggle}
      >
        <h1 className="font-medium text-[24px] leading-snug text-left">
          {title}
        </h1>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 ml-auto" />
        ) : (
          <ChevronDown className="w-5 h-5 ml-auto" />
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-10 pb-10 text-left"
          >
            <p className="text-sm">{desc}</p>
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[200px] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionCard }