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

export default function AccordionCard({ title, desc, video, isOpen, onToggle }) {
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024)
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])
  return (
    <motion.div
      layout
      initial={false}
      animate={{ height: isOpen ? "auto" : 126 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      // 👇 default gray background on desktop, pink otherwise
      className={cn(
        "rounded-lg w-full overflow-hidden transition-colors duration-300 md:!h-[299px] lg:!h-[350px]",
        isDesktop
          ? isOpen
            ? "bg-[#7B1FA2] text-white"
            : "bg-[#7B1FA2] text-white hover:bg-[#7B1FA2]"
          : "bg-[#7B1FA2] text-white"
      )}
      onMouseEnter={() => isDesktop && onToggle(true)}
      onMouseLeave={() => isDesktop && onToggle(false)}
    >
      <div
        className="flex justify-between items-center px-10 py-6 cursor-pointer"
        onClick={() => !isDesktop && onToggle(!isOpen)}
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
              className="w-full h-[200px] md:h-[157px] rounded-lg object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionCard }