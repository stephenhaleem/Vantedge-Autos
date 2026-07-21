import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cars } from "@/lib/cars";
import { CarCard } from "@/components/car-card";

const categories = ["All Models", "Electric", "Performance", "Heritage", "Hypercar"] as const;
type Category = (typeof categories)[number];

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Vantedge Automotive" },
      { name: "description", content: "Browse the current Vantedge inventory: performance, electric, heritage, and hypercar automobiles, each hand-selected." },
      { property: "og:title", content: "Inventory — Vantedge Automotive" },
      { property: "og:description", content: "Browse the current Vantedge inventory of curated premium automobiles." },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const [cat, setCat] = useState<Category>("All Models");
  const list = cat === "All Models" ? cars : cars.filter((c) => c.category === cat);

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24">
        <div className="animate-reveal">
          <p className="text-[10px] uppercase tracking-[0.35em] text-silver">The Collection</p>
          <h1 className="mt-4 font-heading text-5xl font-light leading-none tracking-tighter md:text-7xl">
            Current <br />
            <span className="italic">Inventory.</span>
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-silver">
            Each vehicle in the Vantedge collection is inspected, documented, and
            prepared by our master technicians. Viewing available in Los Angeles,
            London, and Milan by appointment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-16 flex flex-wrap gap-3 border-b border-onyx/10 pb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`group relative overflow-hidden border px-6 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-all ${
                cat === c
                  ? "border-onyx bg-onyx text-ghost"
                  : "border-onyx/10 bg-ghost hover:border-onyx"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto self-center text-[10px] uppercase tracking-[0.25em] text-silver">
            {list.length} {list.length === 1 ? "Vehicle" : "Vehicles"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2">
          {list.map((car, i) => (
            <CarCard key={car.id} car={car} offset={i % 2 === 1} />
          ))}
        </div>

        {list.length === 0 && (
          <div className="py-24 text-center text-sm text-silver">
            No vehicles currently listed in this category.
          </div>
        )}
      </section>
    </div>
  );
}
