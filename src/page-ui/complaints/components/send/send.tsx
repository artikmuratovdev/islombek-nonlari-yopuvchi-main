/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetMyComplaintsQuery } from "@/integration/api/complaintApi";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

export const Sent = () => {
  const [open, setOpen] = useState(false);
  const { data: complaints } = useGetMyComplaintsQuery();

  console.log(complaints);

  return (
    <section>
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => setOpen(value === "item-1")}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-white text-2xl font-semibold">
            Yuborilganlar
            <button aria-label="Toggle" onClick={() => setOpen(!open)}>
              <ArrowDown
                className={`transition-transform text-[#FFCC15] ${
                  open ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
          </AccordionTrigger>
          {complaints?.map((complaint) => (
            <AccordionContent>
              <div className="flex flex-col gap-y-7">
                <div className="w-full px-4 pt-[10px] pb-[14px] bg-white rounded-lg border border-[#ffcb15]  flex flex-col">
                  <h4 className="text-[#c61a1a] text-base font-extrabold font-inter capitalize">
                    {complaint.to.role}ga
                  </h4>
                  <h5 className="text-[#1b2b56] text-sm mt-3 font-bold font-['Inter Tight'] leading-snug">
                    {complaint.content}
                  </h5>
                </div>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </section>
  );
};
