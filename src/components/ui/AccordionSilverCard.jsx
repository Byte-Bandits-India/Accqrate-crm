import {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/src/components/ui/accordion";

export default function AccordionCard({ value, icon, title, children }) {
    return (
        <AccordionItem
            value={value}
            className="flex flex-col justify-center bg-gradient-to-r from-[#E6E6E6] to-[#C8C8C8]
        w-full h-auto rounded-lg p-[24px]"
        >
            <AccordionTrigger className="flex justify-between items-start w-full hover:no-underline">
                <div className="flex flex-col items-start gap-[24px]">
                    <img src={icon} alt={title} className="w-[45px] h-[45px]" />
                    <span className="text-black text-fluid-h3 text-left font-normal">
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
