import { createFileRoute, Link } from "@tanstack/react-router";
import { useCars } from "@/lib/use-cars";
import { type Car } from "@/lib/cars";
import { CarCard } from "@/components/car-card";
import { useCarLists } from "@/lib/use-car-lists";
import shortlistBg from "@/assets/martin-katler-Sr9dLwS_kjs-unsplash.jpg";

export const Route = createFileRoute("/shortlist")({
  head: () => ({
    meta: [
      { title: "My Saved Vehicles — Chrono Value Auto" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShortlistPage,
});

function ShortlistPage() {
  const { data: cars = [] } = useCars();
  const { shortlistIds } = useCarLists();
  const selected = shortlistIds.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as Car[];

  return (
    <div className="bg-ghost">
      <section className="relative -mt-[110px] flex items-center overflow-hidden bg-onyx min-h-[50vh] md:min-h-[60vh] pt-[110px]">
        <div className="absolute inset-0 z-0">
          <img src={shortlistBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/40 to-onyx/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/60 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
          <p className="text-[10px] uppercase tracking-[0.35em] text-ghost/60">Saved</p>
          <h1 className="mt-6 font-heading text-5xl font-light leading-none tracking-tighter text-ghost md:text-6xl">
            My Saved Vehicles.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-32">
        {selected.length === 0 ? (
          <div className="border border-dashed border-onyx/15 py-24 text-center">
            <p className="font-heading text-2xl font-light">No vehicles saved yet.</p>
            <p className="mt-3 text-sm text-silver">
              Tap the heart icon on any vehicle to save it here.
            </p>
            <Link
              to="/inventory"
              className="mt-8 inline-flex h-12 items-center border border-onyx px-8 text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
            >
              Browse Inventory
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
            {selected.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
