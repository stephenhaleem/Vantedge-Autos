import { createFileRoute, Link } from "@tanstack/react-router";
import { useCars } from "@/lib/use-cars";
import { formatPrice } from "@/lib/cars";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Chrono Value Auto" },
      {
        name: "description",
        content:
          "Themed collections at Chrono Value Auto: Electric, Performance, Heritage, and Hypercar.",
      },
      { property: "og:title", content: "Collections — Chrono Value Auto" },
      {
        property: "og:description",
        content: "Explore themed collections of curated automobiles at Chrono Value Auto.",
      },
    ],
  }),
  component: Collections,
});

const groups = ["Electric", "Performance", "Heritage", "Hypercar"] as const;

function Collections() {
  const { data: cars = [] } = useCars();
  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 animate-reveal">
        <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Curated Groups</p>
        <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter md:text-7xl">
          Collections.
        </h1>
        <p className="mt-8 max-w-lg text-base leading-relaxed text-onyx/75">
          Vehicles organised by philosophy. Each collection reflects a specific era, engineering
          discipline, or design intent.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32 space-y-24">
        {groups.map((g) => {
          const list = cars.filter((c) => c.category === g);
          if (list.length === 0) return null;
          return (
            <div key={g}>
              <div className="mb-10 flex items-end justify-between border-b border-onyx/10 pb-6">
                <h2 className="font-heading text-3xl font-light tracking-tight md:text-4xl">{g}</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-silver">
                  {list.length} {list.length === 1 ? "Vehicle" : "Vehicles"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => (
                  <Link
                    key={c.id}
                    to="/cars/$carId"
                    params={{ carId: c.id }}
                    className="group block"
                  >
                    <div className="overflow-hidden mb-4">
                      <img
                        src={c.images[0]}
                        alt={c.name}
                        width={1200}
                        height={900}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="flex justify-between">
                      <h3 className="font-heading text-lg font-medium tracking-tight">{c.name}</h3>
                      <span className="text-sm">{formatPrice(c.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
