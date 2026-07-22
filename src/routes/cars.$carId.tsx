import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchCar, fetchCars, formatPrice } from "@/lib/cars";
import { useMemo } from "react";
import { Heart } from "lucide-react";
import { ImageGallery } from "@/components/image-gallery";
import { useCarLists } from "@/lib/use-car-lists";

export const Route = createFileRoute("/cars/$carId")({
  loader: async ({ params }) => {
    const car = await fetchCar(params.carId);
    if (!car) throw notFound();
    const allCars = await fetchCars();
    return { car, allCars };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Vehicle Not Found — Vantedge" }, { name: "robots", content: "noindex" }],
      };
    }
    const { car } = loaderData;
    return {
      meta: [
        { title: `${car.name} — Vantedge Automotive` },
        { name: "description", content: `${car.name}: ${car.tagline}. ${car.description}` },
        { property: "og:title", content: `${car.name} — Vantedge Automotive` },
        { property: "og:description", content: car.description },
      ],
    };
  },
  component: CarDetail,
});

function CarDetail() {
  const { car, allCars } = Route.useLoaderData();
  const { isShortlisted, toggleShortlist } = useCarLists();
  const shortlisted = isShortlisted(car.id);

  const others = useMemo(() => {
    const sameCategory = allCars.filter((c) => c.id !== car.id && c.category === car.category);
    const priceBand = sameCategory.filter((c) => Math.abs(c.price - car.price) / car.price <= 0.35);
    const pool =
      priceBand.length >= 2
        ? priceBand
        : sameCategory.length >= 2
          ? sameCategory
          : allCars.filter((c) => c.id !== car.id);
    return pool.slice(0, 2);
  }, [car, allCars]);

  const specs = [
    ["Engine", car.specs.engine],
    ["Power", car.specs.power],
    ["Torque", car.specs.torque],
    ["0 – 60 mph", car.specs.zeroToSixty],
    ["Top Speed", car.specs.topSpeed],
    ["Transmission", car.specs.transmission],
    ["Drivetrain", car.specs.drivetrain],
    ["Weight", car.specs.weight],
  ] as const;

  return (
    <div className="bg-ghost">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-silver">
          <Link to="/" className="hover:text-onyx">
            Home
          </Link>
          <span>/</span>
          <Link to="/inventory" className="hover:text-onyx">
            Inventory
          </Link>
          <span>/</span>
          <span className="text-onyx">{car.name}</span>
        </div>
      </div>

      {/* Hero image */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <ImageGallery images={car.images} alt={car.name} />
      </section>

      {/* Title + sticky rail */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[10px] uppercase tracking-[0.35em] text-silver">{car.category}</p>
            <h1 className="mt-4 font-heading text-5xl font-light leading-none tracking-tighter md:text-7xl">
              {car.name}
            </h1>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-silver">{car.tagline}</p>

            <p className="mt-12 max-w-xl text-base leading-relaxed text-onyx/80">
              {car.description}
            </p>

            <div className="mt-16">
              <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.3em]">
                Specification
              </h2>
              <dl className="divide-y divide-onyx/10 border-y border-onyx/10">
                {specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 gap-4 py-5">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-silver">{k}</dt>
                    <dd className="text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 border border-onyx/10 bg-white p-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-silver">Price</p>
              <p className="mt-3 font-heading text-4xl font-light tracking-tight">
                {formatPrice(car.price)}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-silver">
                Enclosed shipping included worldwide
              </p>

              <div className="mt-10 flex flex-col gap-3">
                <Link
                  to="/contact"
                  className="group relative flex h-14 items-center justify-center overflow-hidden bg-onyx text-[11px] font-medium uppercase tracking-[0.25em] text-ghost"
                >
                  <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-500 group-hover:text-onyx">
                    Reserve This Vehicle
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="flex h-14 items-center justify-center border border-onyx/15 text-[11px] font-medium uppercase tracking-[0.25em] hover:bg-onyx/5"
                >
                  Book a Viewing
                </Link>
                <button
                  type="button"
                  onClick={() => toggleShortlist(car.id)}
                  className="flex h-12 items-center justify-center gap-2 border border-onyx/15 text-[11px] font-medium uppercase tracking-[0.25em] hover:bg-onyx/5"
                >
                  <Heart
                    className="h-3.5 w-3.5"
                    fill={shortlisted ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                  {shortlisted ? "Saved to Shortlist" : "Add to Shortlist"}
                </button>
              </div>

              <div className="mt-10 space-y-3 border-t border-onyx/10 pt-8 text-[11px] text-silver">
                <p className="flex justify-between">
                  <span>Stock No.</span>
                  <span className="text-onyx">VA-{car.id.slice(0, 4).toUpperCase()}</span>
                </p>
                <p className="flex justify-between">
                  <span>Location</span>
                  <span className="text-onyx">Los Angeles</span>
                </p>
                <p className="flex justify-between">
                  <span>Status</span>
                  <span className="text-onyx">Available</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-onyx/5 bg-ghost px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between">
            <h2 className="font-heading text-3xl font-light tracking-tight md:text-4xl">
              Also in the collection
            </h2>
            <Link
              to="/inventory"
              className="text-[11px] font-medium uppercase tracking-[0.25em] border-b border-onyx pb-1"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            {others.map((c) => (
              <Link key={c.id} to="/cars/$carId" params={{ carId: c.id }} className="group block">
                <div className="overflow-hidden mb-6">
                  <img
                    src={c.image}
                    alt={c.name}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-medium tracking-tight">{c.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-silver">
                      {c.tagline}
                    </p>
                  </div>
                  <span className="text-lg font-light">{formatPrice(c.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
