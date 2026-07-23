import { createFileRoute, Link } from "@tanstack/react-router";
import showroom from "@/assets/yellow-sport-car-with-black-autotuning-bridge (1).jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Atelier — Chrono Value Auto" },
      {
        name: "description",
        content:
          "Chrono Value Auto is a private atelier curating exceptional automobiles. Meet the team, philosophy, and process behind the collection.",
      },
      { property: "og:title", content: "The Atelier — Chrono Value Auto" },
      {
        property: "og:description",
        content: "The philosophy and process behind Chrono Value Auto.",
      },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    {
      n: "01",
      t: "Curated, Never Sourced",
      d: "Every vehicle is personally inspected by our director before entering the collection.",
    },
    {
      n: "02",
      t: "Discretion by Default",
      d: "Viewings are private, records confidential, and transactions handled by a dedicated concierge.",
    },
    {
      n: "03",
      t: "Prepared, Not Polished",
      d: "Our master technicians spend a minimum of 60 hours preparing each car for its next owner.",
    },
  ];

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        <div className="max-w-3xl animate-reveal">
          <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Established 2024</p>
          <h1 className="mt-6 font-heading text-5xl font-light leading-[1.02] tracking-tighter md:text-7xl">
            An atelier for the <span className="italic">quietly obsessed.</span>
          </h1>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-onyx/75">
            Chrono Value Auto began as the private collection of a single family. Today it is a
            curated house serving a small circle of collectors who value provenance, preparation,
            and privacy over showroom theatre.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <img
          src={showroom}
          alt="The Chrono Value Auto showroom"
          width={1600}
          height={1000}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover"
        />
      </section>

      <section className="bg-onyx px-6 py-32 text-ghost">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.n} className="border-t border-ghost/15 pt-8">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                {v.n}
              </span>
              <h3 className="mt-6 font-heading text-2xl font-light tracking-tight">{v.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-silver">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-heading text-4xl font-light leading-tight tracking-tight">
              Ready to be introduced?
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-base leading-relaxed text-onyx/75">
              Whether you're building a collection, seeking a specific chassis, or considering a
              bespoke commission, our concierge will guide you through every step — from private
              viewing to enclosed delivery.
            </p>
            <Link
              to="/contact"
              className="group mt-10 inline-flex h-14 items-center gap-4 border border-onyx px-8 text-[11px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
            >
              Speak With Concierge
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
