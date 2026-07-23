import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import silverstone from "@/assets/car-silverstone.jpg";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Chrono Value Auto" },
      {
        name: "description",
        content:
          "Answers to common questions about viewing, inspection, delivery, and ownership at Chrono Value Auto.",
      },
    ],
  }),
  component: Faq,
});

const sections = [
  {
    title: "Viewing & Appointments",
    items: [
      {
        q: "Can I test drive a vehicle before buying?",
        a: "Absolutely. Stop by our Houston lot any day we're open, no appointment needed, and take any vehicle for a spin.",
      },
      {
        q: "Do you offer virtual walkarounds?",
        a: "Yes — if you can't make it in person, we can arrange a live video walkaround of any vehicle on our lot.",
      },
    ],
  },
  {
    title: "Vehicle Condition & Inspection",
    items: [
      {
        q: "How is each vehicle inspected before listing?",
        a: "Every car undergoes a minimum 60-hour preparation and inspection process by our master technicians, covering mechanical, cosmetic, and provenance checks before it enters the collection.",
      },
      {
        q: "Can I bring my own independent inspector?",
        a: "Absolutely. We welcome pre-purchase inspections by a third party of your choosing at any of our showrooms.",
      },
    ],
  },
  {
    title: "Delivery & Shipping",
    items: [
      {
        q: "Do you deliver internationally?",
        a: "Yes. All vehicles include enclosed, insured shipping worldwide as standard. Typical delivery windows range from 5–20 business days depending on destination and customs clearance.",
      },
      {
        q: "Is delivery tracked?",
        a: "Your concierge will provide shipment tracking and coordinate customs documentation for international deliveries.",
      },
    ],
  },
  {
    title: "Financing & Trade-Ins",
    items: [
      {
        q: "Do you work with financing partners?",
        a: "We can introduce you to a small panel of specialist financing partners for collector and performance vehicles. Terms and approval are handled directly between you and the partner institution.",
      },
      {
        q: "Do you accept trade-ins?",
        a: "Yes, trade-ins are considered on a case-by-case basis. Share your current vehicle's details with your concierge for a preliminary valuation.",
      },
    ],
  },
  {
    title: "Warranty & After-Sale",
    items: [
      {
        q: "Is there a warranty included?",
        a: "Modern-era vehicles include a complimentary limited mechanical warranty; heritage and collector vehicles are sold with full disclosure of condition in lieu of warranty. Extended coverage is available on request.",
      },
      {
        q: "Do you offer ongoing servicing?",
        a: "Our Atelier network can service and maintain your vehicle post-purchase, including scheduled maintenance and concours-level detailing.",
      },
    ],
  },
];

function Faq() {
  return (
    <div className="bg-ghost">
      <section className="relative -mt-[110px] flex items-center overflow-hidden bg-onyx min-h-[55vh] md:min-h-[65vh] pt-[110px]">
        <div className="absolute inset-0 z-0">
          <img src={silverstone} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/40 to-onyx/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/60 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ghost/60">Good to Know</p>
          <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter text-ghost md:text-7xl">
            Frequently Asked.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-32 space-y-16">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-silver">
              {section.title}
            </h2>
            <Accordion type="single" collapsible className="border-t border-onyx/10">
              {section.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-left font-heading text-lg font-normal">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-onyx/75">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </section>
    </div>
  );
}
