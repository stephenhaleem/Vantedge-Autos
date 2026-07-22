import { createFileRoute, Link } from "@tanstack/react-router";
import { useCars } from "@/lib/use-cars";
import { type Car, formatPrice } from "@/lib/cars";
import { useCarLists } from "@/lib/use-car-lists";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Vehicles — Vantedge Automotive" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ComparePage,
});

const rows: { label: string; get: (c: Car) => string }[] = [
  { label: "Price", get: (c) => formatPrice(c.price) },
  { label: "Category", get: (c) => c.category },
  { label: "Fuel Type", get: (c) => c.fuelType },
  { label: "Engine", get: (c) => c.specs.engine },
  { label: "Power", get: (c) => c.specs.power },
  { label: "Torque", get: (c) => c.specs.torque },
  { label: "0 – 60 mph", get: (c) => c.specs.zeroToSixty },
  { label: "Top Speed", get: (c) => c.specs.topSpeed },
  { label: "Transmission", get: (c) => c.specs.transmission },
  { label: "Drivetrain", get: (c) => c.specs.drivetrain },
  { label: "Weight", get: (c) => c.specs.weight },
];

function ComparePage() {
  const { data: cars = [] } = useCars();
  const { compareIds, removeCompare } = useCarLists();
  const selected = compareIds.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as Car[];

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Side by Side</p>
        <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter md:text-6xl">
          Compare Vehicles.
        </h1>
      </section>

      {selected.length === 0 ? (
        <section className="mx-auto max-w-7xl px-6 pb-32">
          <div className="border border-dashed border-onyx/15 py-24 text-center">
            <p className="font-heading text-2xl font-light">Nothing to compare yet.</p>
            <p className="mt-3 text-sm text-silver">
              Select up to three vehicles from the inventory to compare specs.
            </p>
            <Link
              to="/inventory"
              className="mt-8 inline-flex h-12 items-center border border-onyx px-8 text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
            >
              Browse Inventory
            </Link>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl overflow-x-auto px-6 pb-32">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="w-40" />
                {selected.map((car) => (
                  <th key={car.id} className="px-4 pb-6 text-left align-top">
                    <div className="mb-4 overflow-hidden">
                      <img
                        src={car.images[0] || "/placeholder.jpg"}
                        alt={car.name}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <h3 className="font-heading text-lg font-medium tracking-tight">{car.name}</h3>
                    <button
                      type="button"
                      onClick={() => removeCompare(car.id)}
                      className="mt-2 text-[10px] uppercase tracking-[0.2em] text-silver hover:text-onyx"
                    >
                      Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-onyx/10 border-y border-onyx/10">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="py-4 pr-4 text-[10px] uppercase tracking-[0.25em] text-silver">
                    {row.label}
                  </td>
                  {selected.map((car) => (
                    <td key={car.id} className="px-4 py-4 text-sm">
                      {row.get(car)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
