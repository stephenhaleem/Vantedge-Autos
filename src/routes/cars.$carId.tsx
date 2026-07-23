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
        meta: [
          { title: "Vehicle Not Found — Chrono Value Auto" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { car } = loaderData;
    return {
      meta: [
        { title: `${car.name} — Chrono Value Auto` },
        { name: "description", content: `${car.name}: ${car.tagline}. ${car.description}` },
        { property: "og:title", content: `${car.name} — Chrono Value Auto` },
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

              <div className="mt-10 flex flex-col gap-3">
                <Link
                  to="/contact"
                  search={{ car: car.name, interest: "Purchase Enquiry" }}
                  className="group relative flex h-14 items-center justify-center overflow-hidden bg-onyx text-[11px] font-medium uppercase tracking-[0.25em] text-ghost"
                >
                  <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-500 group-hover:text-onyx">
                    Reserve This Vehicle
                  </span>
                </Link>
                <Link
                  to="/contact"
                  search={{ car: car.name, interest: "Private Viewing" }}
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
                <a
                  href={`https://wa.me/13476661572?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(car.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 border border-onyx/15 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-10 space-y-3 border-t border-onyx/10 pt-8 text-[11px] text-silver">
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
                    src={c.images[0]}
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
