import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { CarCardSkeleton } from "@/components/car-card-skeleton";
import { useCars } from "@/lib/use-cars";
import { deriveFacets, formatPrice } from "@/lib/cars";
import { CarCard } from "@/components/car-card";
import horizon from "@/assets/thinh.jpg";

const currentYear = new Date().getFullYear();

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "").default(""),
  make: fallback(z.string(), "").default(""),
  model: fallback(z.string(), "").default(""),
  fuel: fallback(z.string(), "").default(""),
  yearMin: fallback(z.number().int(), 1900).default(1900),
  yearMax: fallback(z.number().int(), currentYear).default(currentYear),
  priceMin: fallback(z.number().int(), 0).default(0),
  priceMax: fallback(z.number().int(), 10_000_000).default(10_000_000),
});

export const Route = createFileRoute("/inventory")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Inventory — Chrono Value Auto" },
      {
        name: "description",
        content:
          "Search and filter the Chrono Value Auto inventory by make, model, year, price, and fuel type.",
      },
      { property: "og:title", content: "Inventory — Chrono Value Auto" },
      {
        property: "og:description",
        content: "Search and filter curated premium automobiles at Chrono Value Auto.",
      },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const { data: cars = [], isLoading: carsLoading } = useCars();
  const {
    allMakes,
    allModels: allModelsBase,
    allFuelTypes,
    yearBounds,
    priceBounds,
  } = useMemo(() => deriveFacets(cars), [cars]);
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [panelOpen, setPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showLoading = loading || carsLoading;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 280);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(search)]);

  const update = (patch: Partial<typeof search>) => {
    navigate({ search: (prev: typeof search) => ({ ...prev, ...patch }) });
  };

  const reset = () =>
    navigate({
      search: {
        q: "",
        make: "",
        model: "",
        category: "",
        fuel: "",
        yearMin: yearBounds.min,
        yearMax: yearBounds.max,
        priceMin: priceBounds.min,
        priceMax: priceBounds.max,
      },
    });

  const modelsForMake = useMemo(
    () =>
      search.make
        ? Array.from(new Set(cars.filter((c) => c.make === search.make).map((c) => c.model))).sort()
        : allModelsBase,
    [search.make, cars, allModelsBase],
  );
  const list = useMemo(() => {
    const q = search.q.trim().toLowerCase();
    return cars.filter((c) => {
      if (q && !`${c.name} ${c.make} ${c.model} ${c.tagline}`.toLowerCase().includes(q))
        return false;
      if (search.make && c.make !== search.make) return false;
      if (search.model && c.model !== search.model) return false;
      if (search.fuel && c.fuelType !== search.fuel) return false;
      if (c.year < search.yearMin || c.year > search.yearMax) return false;
      if (c.price < search.priceMin || c.price > search.priceMax) return false;
      if (search.category && c.category !== search.category) return false;
      return true;
    });
  }, [search, cars]);

  const isYearActive = search.yearMin > yearBounds.min || search.yearMax < yearBounds.max;
  const isPriceActive = search.priceMin > priceBounds.min || search.priceMax < priceBounds.max;

  const activeFilters = [
    search.q && { k: "q", label: `“${search.q}”` },
    search.make && { k: "make", label: search.make },
    search.model && { k: "model", label: search.model },
    search.category && { k: "category", label: search.category },
    search.fuel && { k: "fuel", label: search.fuel },
    isYearActive && { k: "year", label: `${search.yearMin} – ${search.yearMax}` },
    isPriceActive && {
      k: "price",
      label: `${formatPrice(search.priceMin)} – ${formatPrice(search.priceMax)}`,
    },
  ].filter(Boolean) as { k: string; label: string }[];

  const clearOne = (k: string) => {
    switch (k) {
      case "q":
        return update({ q: "" });
      case "make":
        return update({ make: "", model: "" });
      case "model":
        return update({ model: "" });
      case "category":
        return update({ category: "" });
      case "fuel":
        return update({ fuel: "" });
      case "year":
        return update({ yearMin: yearBounds.min, yearMax: yearBounds.max });
      case "price":
        return update({ priceMin: priceBounds.min, priceMax: priceBounds.max });
    }
  };

  return (
    <div className="bg-ghost">
      <section className="relative -mt-[110px] flex items-center overflow-hidden bg-onyx min-h-[60vh] md:min-h-[70vh] pt-[110px]">
        <div className="absolute inset-0 z-0">
          <img src={horizon} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/40 to-onyx/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/60 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
          <div className="animate-reveal">
            <p className="text-[10px] uppercase tracking-[0.35em] text-ghost/60">The Collection</p>
            <h1 className="mt-4 font-heading text-5xl font-light leading-none tracking-tighter text-ghost md:text-7xl">
              Current <br />
              <span className="italic">Inventory.</span>
            </h1>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-ghost/70">
              Every vehicle on our lot is inspected and documented before it's listed. Stop by our
              Katy, TX location any day we're open — no appointment necessary.
            </p>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="fixed top-16 sm:top-20 left-0 right-0 z-30 border-y border-onyx/10 bg-ghost/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-silver"
              strokeWidth={1.5}
            />
            <input
              value={search.q}
              onChange={(e) => update({ q: e.target.value })}
              placeholder="Search by make, model, or name"
              className="w-full border-b border-transparent bg-transparent py-3 pl-7 pr-3 text-sm outline-none transition-colors focus:border-onyx placeholder:text-silver"
            />
          </div>
          <button
            onClick={() => setPanelOpen((s) => !s)}
            className={`group flex items-center gap-2 border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors ${
              panelOpen ? "border-onyx bg-onyx text-ghost" : "border-onyx/20 hover:border-onyx"
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
            Filters
            {activeFilters.length > 0 && (
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-[9px] ${panelOpen ? "bg-ghost text-onyx" : "bg-onyx text-ghost"}`}
              >
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            panelOpen ? "max-h-[70vh]" : "max-h-0"
          }`}
        >
          <div className="max-h-[70vh] overflow-y-auto border-t border-onyx/10">
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <FilterSelect
                  label="Make"
                  value={search.make}
                  onChange={(v) => update({ make: v, model: "" })}
                  options={allMakes}
                />
                <FilterSelect
                  label="Type"
                  value={search.category}
                  onChange={(v) => update({ category: v })}
                  options={["Sedans", "SUVs", "Trucks", "Coupes"]}
                />
                <FilterSelect
                  label="Model"
                  value={search.model}
                  onChange={(v) => update({ model: v })}
                  options={modelsForMake}
                  disabled={modelsForMake.length === 0}
                />
                <FilterSelect
                  label="Fuel Type"
                  value={search.fuel}
                  onChange={(v) => update({ fuel: v })}
                  options={allFuelTypes}
                />
                <div>
                  <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                    Year Range
                  </label>
                  <div className="flex items-center gap-3">
                    <NumberInput
                      value={search.yearMin}
                      onChange={(v) => update({ yearMin: Math.min(v, search.yearMax) })}
                    />
                    <span className="text-silver">—</span>
                    <NumberInput
                      value={search.yearMax}
                      onChange={(v) => update({ yearMax: Math.max(v, search.yearMin) })}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-4">
                  <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
                    Price Range — {formatPrice(search.priceMin)} to {formatPrice(search.priceMax)}
                  </label>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <RangeSlider
                      label="Minimum"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step={1000}
                      value={search.priceMin}
                      onChange={(v) => update({ priceMin: Math.min(v, search.priceMax) })}
                    />
                    <RangeSlider
                      label="Maximum"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step={1000}
                      value={search.priceMax}
                      onChange={(v) => update({ priceMax: Math.max(v, search.priceMin) })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active filter chips */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-silver">
            {list.length} {list.length === 1 ? "Vehicle" : "Vehicles"}
          </span>
          {activeFilters.length > 0 && <span className="text-silver">·</span>}
          {activeFilters.map((f) => (
            <button
              key={f.k}
              onClick={() => clearOne(f.k)}
              className="group flex items-center gap-2 border border-onyx/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] hover:border-onyx"
            >
              {f.label}
              <X className="h-3 w-3 text-silver group-hover:text-onyx" strokeWidth={1.5} />
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button
              onClick={reset}
              className="ml-auto text-[10px] uppercase tracking-[0.25em] text-silver underline-offset-4 hover:text-onyx hover:underline"
            >
              Reset All
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 pb-32">
        {showLoading ? (
          <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : list.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2">
            {list.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-onyx/15 py-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-silver">No Matches</p>
            <p className="mt-4 font-heading text-2xl font-light">Nothing meets those criteria.</p>
            <button
              onClick={reset}
              className="mt-8 inline-flex h-12 items-center border border-onyx px-8 text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
        {label}
      </label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx disabled:opacity-40"
      >
        <option value="">Any {label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => {
        const n = Number(e.target.value);
        if (!Number.isNaN(n)) onChange(n);
      }}
      className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx"
    />
  );
}

function RangeSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.25em] text-silver">
        <span>{label}</span>
        <span className="text-onyx">{formatPrice(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-onyx"
      />
    </div>
  );
}
