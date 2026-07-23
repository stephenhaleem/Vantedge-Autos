import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Chrono Value Auto" },
      {
        name: "description",
        content: "How Chrono Value Auto collects, uses, and protects your information.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

const sections = [
  {
    title: "Information We Collect",
    body: "When you visit our site, request a quote, or contact our sales team, we may collect information such as your name, email address, phone number, and any details you choose to share about the vehicle you're interested in. We also collect standard technical information (browser type, device, pages visited) to help us maintain and improve the site.",
  },
  {
    title: "How We Use Your Information",
    body: "We use the information you provide to respond to enquiries, schedule test drives, process financing applications, and send you updates about vehicles you've expressed interest in. We do not sell your personal information to third parties.",
  },
  {
    title: "Sharing With Third Parties",
    body: "We may share limited information with trusted partners who help us operate our business — for example, financing partners you've asked us to introduce you to, or service providers who host our website. These partners are only given the information they need to perform their function.",
  },
  {
    title: "Cookies",
    body: "Our site uses cookies to remember your preferences (such as items on your shortlist or comparison list) and to understand how visitors use our inventory search. You can disable cookies in your browser settings, though some features of the site may not work as intended.",
  },
  {
    title: "Your Rights",
    body: "You can ask us at any time what information we hold about you, request a correction, or ask us to delete it. Reach out to our team using the contact details below and we'll respond within a reasonable timeframe.",
  },
  {
    title: "Contact",
    body: "Questions about this policy can be directed to chronovaluemotor@gmail.com or +1 (347) 666 1572.",
  },
];

function Privacy() {
  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-4xl px-6 pt-24 pb-16">
        <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Legal</p>
        <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter md:text-6xl">
          Privacy Policy.
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-onyx/60">
          Last updated July 2026. This is placeholder policy language provided for template
          purposes — please have it reviewed by legal counsel before relying on it as your
          dealership's actual privacy policy.
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
