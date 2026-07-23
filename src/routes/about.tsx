import { createFileRoute, Link } from "@tanstack/react-router";
import showroom from "@/assets/yellow-sport-car-with-black-autotuning-bridge (1).jpg";
import heroImage from "@/assets/showroom.jpg";

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
      t: "Every Car Inspected",
      d: "A certified technician checks every vehicle before it goes on our lot — no exceptions.",
    },
    {
      n: "02",
      t: "No Games on Price",
      d: "The price on the windshield is the price you pay. No last-minute fees or add-ons.",
    },
    {
      n: "03",
      t: "We're Here After the Sale",
      d: "Financing questions, warranty claims, service referrals — call us any time.",
    },
  ];

  return (
    <div className="bg-ghost">
      <section className="relative -mt-[110px] flex items-center overflow-hidden bg-onyx min-h-[50vh] md:min-h-[60vh] pt-[110px]">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/40 to-onyx/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/60 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ghost/60">
            Locally Owned Since 2015
          </p>
          <h1 className="mt-6 font-heading text-5xl font-light leading-[1.02] tracking-tighter text-ghost md:text-7xl">
            Honest cars, <span className="italic">honest prices.</span>
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-ghost/70">
            Chrono Value Auto is a family-run used car dealership in Katy, Texas. We inspect every
            vehicle we sell, price it fairly, and stick around after you drive off the lot.
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
              Ready to find your next car?
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-base leading-relaxed text-onyx/75">
              Whether you're buying your first car or trading in your third, our team will walk you
              through the lot, the paperwork, and the financing — no pressure, no runaround.
            </p>
            <Link
              to="/contact"
              className="group mt-10 inline-flex h-14 items-center gap-4 border border-onyx px-8 text-[11px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
            >
              Contact Us
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
