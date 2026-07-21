import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Concierge & Showrooms — Vantedge Automotive" },
      { name: "description", content: "Contact Vantedge Automotive. Private viewings in Los Angeles, London, and Milan. Concierge available 24 hours." },
      { property: "og:title", content: "Concierge & Showrooms — Vantedge Automotive" },
      { property: "og:description", content: "Reach the Vantedge concierge and book a private viewing at one of our global showrooms." },
    ],
  }),
  component: Contact,
});

const showrooms = [
  { city: "Los Angeles", address: "8420 Melrose Ave", region: "West Hollywood, CA", hours: "By Appointment" },
  { city: "London", address: "12 Berkeley Square", region: "Mayfair, W1J", hours: "By Appointment" },
  { city: "Milan", address: "Via della Spiga 22", region: "Quadrilatero, 20121", hours: "By Appointment" },
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 animate-reveal">
        <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Concierge</p>
        <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter md:text-7xl">
          Speak with us.
        </h1>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-onyx/75">
          Enquire about a specific vehicle, arrange a private viewing, or begin
          a bespoke commission. A member of our concierge team will reply within
          24 hours.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-8 border-t border-onyx/10 pt-10"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Field label="Full Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" />
                <Field label="Country" name="country" />
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                  Interest
                </label>
                <select
                  name="interest"
                  className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none focus:border-onyx"
                  defaultValue=""
                >
                  <option value="" disabled>Select an option</option>
                  <option>Purchase Enquiry</option>
                  <option>Private Viewing</option>
                  <option>Bespoke Commission</option>
                  <option>Consignment</option>
                </select>
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full resize-none border-b border-onyx/15 bg-transparent py-3 text-sm outline-none focus:border-onyx"
                  placeholder="Tell us what you're looking for."
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="group relative inline-flex h-14 items-center overflow-hidden bg-onyx px-10 text-[11px] font-medium uppercase tracking-[0.25em] text-ghost disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-onyx">
                  {sent ? "Message Received" : "Send Enquiry"}
                </span>
              </button>

              {sent && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-silver animate-reveal">
                  Thank you — our concierge will be in touch shortly.
                </p>
              )}
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-onyx/10 pt-10">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em]">
                Showrooms
              </h2>
              <div className="mt-10 space-y-10">
                {showrooms.map((s) => (
                  <div key={s.city}>
                    <h3 className="font-heading text-2xl font-light tracking-tight">{s.city}</h3>
                    <p className="mt-3 text-sm text-onyx/75">{s.address}</p>
                    <p className="text-sm text-onyx/75">{s.region}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-silver">
                      {s.hours}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 border-t border-onyx/10 pt-8 space-y-2 text-sm">
                <p className="text-[10px] uppercase tracking-[0.25em] text-silver">Concierge</p>
                <p>concierge@vantedge.auto</p>
                <p>+1 (310) 555 0184</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx"
      />
    </div>
  );
}
