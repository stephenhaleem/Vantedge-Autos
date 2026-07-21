import { Link } from "@tanstack/react-router";
import { type Car, formatPrice } from "@/lib/cars";

export function CarCard({ car, offset = false }: { car: Car; offset?: boolean }) {
  return (
    <Link
      to="/cars/$carId"
      params={{ carId: car.id }}
      className={`group block ${offset ? "md:mt-24" : ""}`}
    >
      <div className="mb-6 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          width={1200}
          height={900}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="mb-1 font-heading text-xl font-medium tracking-tight">
            {car.name}
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-silver">
            {car.tagline}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-light">{formatPrice(car.price)}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-silver group-hover:text-onyx transition-colors">
            <span className="border-b border-current pb-0.5">View Specs</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
