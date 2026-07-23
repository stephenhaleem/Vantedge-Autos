import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Sale — Chrono Value Auto" },
      {
        name: "description",
        content: "The terms and conditions that apply to vehicle purchases from Chrono Value Auto.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Terms,
});

const sections = [
  {
    title: "Vehicle Condition",
    body: "All vehicles are sold as inspected and described at the time of listing. Any known mechanical issues, prior damage, or title status will be disclosed to you before purchase. We encourage every buyer to review the vehicle history report and, where desired, arrange an independent inspection prior to completing a purchase.",
  },
  {
    title: "Pricing",
    body: "Listed prices reflect the vehicle price only and do not include applicable taxes, title, registration, or documentation fees, which will be itemized separately at the time of sale. Prices are subject to change until a purchase agreement is signed.",
  },
  {
    title: "Deposits & Reservations",
    body: "A deposit may be taken to hold a vehicle pending completion of financing or paperwork. Deposits are refundable up to the point a purchase agreement is signed, except where otherwise stated in writing at the time the deposit is taken.",
  },
  {
    title: "Financing",
    body: "Financing offers are subject to credit approval by the lending partner. Chrono Value Auto is not a lender and does not guarantee approval or specific terms. Final APR, term length, and monthly payment are determined by the financing institution.",
  },
  {
    title: "Trade-Ins",
    body: "Trade-in values are estimates based on the information you provide and are subject to confirmation upon physical inspection of the vehicle. The final trade-in value may differ from an initial online or verbal estimate.",
  },
  {
    title: "Returns & Warranty",
    body: "Used vehicle sales are final except where a warranty is explicitly included in the purchase agreement. Any included warranty terms, coverage period, and exclusions will be provided in writing at the time of sale.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of the State of Texas. Any disputes arising from a vehicle purchase will be handled in accordance with applicable Texas consumer protection statutes.",
  },
];

function Terms() {
  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16">
        <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Legal</p>
        <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter md:text-6xl">
          Terms of Sale.
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-onyx/60">
          Last updated July 2026. This is placeholder terms language provided for template
          purposes — please have it reviewed by legal counsel before relying on it as your
          dealership's actual terms of sale.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-32 space-y-14">
        {sections.map((s) => (
          <div key={s.title} className="border-t border-onyx/10 pt-8">
            <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-silver">
              {s.title}
            </h2>
            <p className="text-sm leading-relaxed text-onyx/75">{s.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
