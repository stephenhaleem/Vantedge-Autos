import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { type Car, formatPrice } from "@/lib/cars";
import { useCarLists } from "@/lib/use-car-lists";

export function CarCard({ car }: { car: Car }) {
  const { isShortlisted, toggleShortlist, isCompared, toggleCompare, compareFull } = useCarLists();
  const shortlisted = isShortlisted(car.id);
  const compared = isCompared(car.id);

  return (
    <div className="group">
      <Link to="/cars/$carId" params={{ carId: car.id }} className="block">
        <div className="relative mb-5 overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleShortlist(car.id);
            }}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? "Remove from shortlist" : "Add to shortlist"}
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
              shortlisted ? "bg-onyx text-ghost" : "bg-ghost/80 text-onyx hover:bg-ghost"
            }`}
          >
            <Heart
              className="h-3.5 w-3.5"
              strokeWidth={1.75}
              fill={shortlisted ? "currentColor" : "none"}
            />
          </button>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-4">
        <Link to="/cars/$carId" params={{ carId: car.id }} className="min-w-0">
          <h3 className="mb-1 truncate font-heading text-lg font-medium tracking-tight">
            {car.name}
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-silver">{car.tagline}</p>
        </Link>
        <p className="shrink-0 text-base font-light">{formatPrice(car.price)}</p>
      </div>
      <label className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-silver">
        <input
          type="checkbox"
          checked={compared}
          disabled={!compared && compareFull}
          onChange={() => toggleCompare(car.id)}
          className="h-3.5 w-3.5 accent-onyx"
        />
        Compare{!compared && compareFull ? " (max 3)" : ""}
      </label>
    </div>
  );
}
