import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useRef, useState } from "react";
import { sendContactEmail } from "@/lib/send-contact";

const contactSearchSchema = z.object({
  car: fallback(z.string(), "").default(""),
  interest: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(contactSearchSchema),
  head: () => ({
    meta: [
      { title: "Concierge & Showrooms — Chrono Value Auto" },
      {
        name: "description",
        content:
          "Contact Chrono Value Auto. Private viewings in Los Angeles, London, and Milan. Concierge available 24 hours.",
      },
      { property: "og:title", content: "Concierge & Showrooms — Chrono Value Auto" },
      {
        property: "og:description",
        content:
          "Reach the Chrono Value Auto concierge and book a private viewing at one of our global showrooms.",
      },
    ],
  }),
  component: Contact,
});

const showrooms = [
  {
    city: "Texas",
    address: "2425 W Loop S Fwy",
    region: "Houston, TX 77027",
    hours: "By Appointment",
  },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { car, interest } = Route.useSearch();
  const carName = car || "";
  const interestVal = interest || "";

  const defaultMessage = carName
    ? `I would like to arrange a viewing for the ${carName}. Please let me know available times.`
    : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const result = await sendContactEmail({
      data: {
        name: (formData.get("name") as string) || "",
        email: (formData.get("email") as string) || "",
        phone: (formData.get("phone") as string) || "",
        country: (formData.get("country") as string) || "",
        interest: (formData.get("interest") as string) || "",
        message: (formData.get("message") as string) || "",
      },
    });

    if (result.success) {
      setSent(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
    setSending(false);
  };

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 animate-reveal">
        <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Concierge</p>
        <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter md:text-7xl">
          Speak with us.
        </h1>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-onyx/75">
          Enquire about a specific vehicle, arrange a private viewing, or begin a bespoke
          commission. A member of our concierge team will reply within 24 hours.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
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
                  defaultValue={interestVal}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
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
                  defaultValue={defaultMessage}
                />
              </div>

              <button
                type="submit"
                disabled={sent || sending}
                className="group relative inline-flex h-14 items-center overflow-hidden bg-onyx px-10 text-[11px] font-medium uppercase tracking-[0.25em] text-ghost disabled:opacity-70"
              >
                <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-onyx">
                  {sending ? "Sending..." : sent ? "Message Received" : "Send Enquiry"}
                </span>
              </button>

              {error && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-red-500 animate-reveal">
                  {error}
                </p>
              )}

              {sent && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-silver animate-reveal">
                  Thank you — our concierge will be in touch shortly.
                </p>
              )}
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-onyx/10 pt-10">
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em]">Showrooms</h2>
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
                <p>chronovaluemotor@gmail.com</p>
                <p>+1 (347) 666 1572</p>
                <a
                  href="https://wa.me/13476661572"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 border border-onyx/15 text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-onyx hover:text-ghost transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
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
