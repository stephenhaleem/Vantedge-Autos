import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useCars } from "@/lib/use-cars";
import { useCarLists } from "@/lib/use-car-lists";

export function CompareBar() {
  const { data: cars = [] } = useCars();
  const { compareIds, removeCompare, clearCompare } = useCarLists();
  if (compareIds.length === 0) return null;

  const selected = compareIds.map((id) => cars.find((c) => c.id === id)).filter(Boolean);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-onyx/10 bg-ghost/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-silver">Compare</span>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {selected.map(
            (car) =>
              car && (
                <div
                  key={car.id}
                  className="flex items-center gap-2 border border-onyx/15 px-3 py-1.5"
                >
                  <span className="text-[11px] uppercase tracking-[0.15em]">{car.name}</span>
                  <button
                    type="button"
                    onClick={() => removeCompare(car.id)}
                    aria-label={`Remove ${car.name}`}
                  >
                    <X className="h-3 w-3 text-silver hover:text-onyx" />
                  </button>
                </div>
              ),
          )}
        </div>
        <button
          type="button"
          onClick={clearCompare}
          className="text-[10px] uppercase tracking-[0.25em] text-silver hover:text-onyx"
        >
          Clear
        </button>
        <Link
          to="/compare"
          className="inline-flex h-11 items-center bg-onyx px-6 text-[11px] font-medium uppercase tracking-[0.25em] text-ghost hover:bg-onyx/90"
        >
          Compare ({selected.length})
        </Link>
      </div>
    </div>
  );
}
