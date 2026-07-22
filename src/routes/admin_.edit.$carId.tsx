import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, type FormEvent } from "react";
import {
  fetchCar,
  updateCar,
  uploadCarImage,
  deleteCarImage,
  addCarImagePath,
  removeCarImagePath,
  getImageUrl,
  type Car,
  type Category,
  type FuelType,
} from "@/lib/cars";
import { ArrowLeft, Loader, Trash2, Upload } from "lucide-react";

/* ── Field helpers ── */

function TextField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) onChange(n);
        }}
        required={required}
        className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.3em] text-silver">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Constants ── */

const CATEGORIES: Category[] = ["Electric", "Performance", "Heritage", "Hypercar"];
const FUEL_TYPES: FuelType[] = ["Petrol", "Electric", "Hybrid", "Diesel"];

const SPEC_FIELDS: { key: keyof Car["specs"]; label: string }[] = [
  { key: "engine", label: "Engine" },
  { key: "power", label: "Power" },
  { key: "torque", label: "Torque" },
  { key: "zeroToSixty", label: "0 \u2013 60 mph" },
  { key: "topSpeed", label: "Top Speed" },
  { key: "transmission", label: "Transmission" },
  { key: "drivetrain", label: "Drivetrain" },
  { key: "weight", label: "Weight" },
];

/* ── Route ── */

export const Route = createFileRoute("/admin_/edit/$carId")({
  loader: async ({ params }) => {
    const car = await fetchCar(params.carId);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Edit ${loaderData?.car?.name ?? "Vehicle"} \u2014 Admin \u2014 Vantedge Automotive`,
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EditCarPage,
});

/* ── Component ── */

function EditCarPage() {
  const { car: initialCar } = Route.useLoaderData();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const storagePaths = initialCar.image_paths ?? [];

  const [form, setForm] = useState({
    name: initialCar.name,
    make: initialCar.make,
    model: initialCar.model,
    year: initialCar.year,
    tagline: initialCar.tagline,
    category: initialCar.category,
    fuelType: initialCar.fuelType,
    price: initialCar.price,
    description: initialCar.description,
    specs: { ...initialCar.specs },
  });

  const [saved, setSaved] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (data: Parameters<typeof updateCar>[1]) => updateCar(initialCar.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(form);
  };

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setSpec = (key: keyof Car["specs"], value: string) => {
    setForm((prev) => ({ ...prev, specs: { ...prev.specs, [key]: value } }));
  };

  const dirty =
    JSON.stringify(form) !==
    JSON.stringify({
      name: initialCar.name,
      make: initialCar.make,
      model: initialCar.model,
      year: initialCar.year,
      tagline: initialCar.tagline,
      category: initialCar.category,
      fuelType: initialCar.fuelType,
      price: initialCar.price,
      description: initialCar.description,
      specs: initialCar.specs,
    });

  /* ── Image handlers ── */

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const path = await uploadCarImage(file, initialCar.id);
      await addCarImagePath(initialCar.id, path);
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      window.location.reload();
    } catch (err) {
      console.error(err);
      setUploadError("Upload failed. Check console.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async (path: string) => {
    try {
      await deleteCarImage(path);
      await removeCarImagePath(initialCar.id, path);
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      window.location.reload();
    } catch (err) {
      console.error(err);
      setUploadError("Delete failed. Check console.");
    }
  };

  return (
    <div className="bg-ghost">
      <section className="mx-auto max-w-5xl px-6 pb-32 pt-24">
        {/* Back + header */}
        <div className="animate-reveal">
          <Link
            to="/admin"
            className="group mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-silver transition-colors hover:text-onyx"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Back to Dashboard
          </Link>
          <p className="text-[10px] uppercase tracking-[0.35em] text-silver">Edit Vehicle</p>
          <h1 className="mt-4 font-heading text-4xl font-light leading-none tracking-tighter md:text-5xl">
            {initialCar.name}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-16 space-y-16">
          {/* Basic Info */}
          <div>
            <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.3em]">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <TextField label="Name" value={form.name} onChange={(v) => set("name", v)} required />
              <TextField label="Make" value={form.make} onChange={(v) => set("make", v)} required />
              <TextField
                label="Model"
                value={form.model}
                onChange={(v) => set("model", v)}
                required
              />
              <NumberField
                label="Year"
                value={form.year}
                onChange={(v) => set("year", v)}
                required
              />
              <TextField
                label="Tagline"
                value={form.tagline}
                onChange={(v) => set("tagline", v)}
                required
              />
              <NumberField
                label="Price ($)"
                value={form.price}
                onChange={(v) => set("price", v)}
                required
              />
              <SelectField
                label="Category"
                value={form.category}
                onChange={(v) => set("category", v as Category)}
                options={CATEGORIES}
              />
              <SelectField
                label="Fuel Type"
                value={form.fuelType}
                onChange={(v) => set("fuelType", v as FuelType)}
                options={FUEL_TYPES}
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.3em]">Images</h2>

            {storagePaths.length === 0 && (
              <p className="mb-6 text-sm text-silver">No images uploaded yet.</p>
            )}

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {storagePaths.map((path) => (
                <div key={path} className="group relative overflow-hidden border border-onyx/10">
                  <img
                    src={getImageUrl(path)}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(path)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-red-500 opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              ))}

              {/* Upload placeholder */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-[4/3] cursor-pointer items-center justify-center border border-dashed border-onyx/20 transition-colors hover:border-onyx"
              >
                <div className="flex flex-col items-center gap-2 text-silver">
                  <Upload className="h-6 w-6" strokeWidth={1} />
                  <span className="text-[10px] uppercase tracking-[0.2em]">
                    {uploading ? "Uploading\u2026" : "Add Image"}
                  </span>
                </div>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />

            {uploadError && (
              <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-red-500">
                {uploadError}
              </p>
            )}
            {uploading && (
              <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-silver">
                Uploading image\u2026
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.3em]">
              Description
            </h2>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={6}
              className="w-full resize-none border-b border-onyx/15 bg-transparent py-3 text-sm outline-none transition-colors focus:border-onyx"
              required
            />
          </div>

          {/* Specs */}
          <div>
            <h2 className="mb-8 text-[10px] font-semibold uppercase tracking-[0.3em]">
              Specifications
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {SPEC_FIELDS.map((f) => (
                <TextField
                  key={f.key}
                  label={f.label}
                  value={form.specs[f.key]}
                  onChange={(v) => setSpec(f.key, v)}
                  required
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 border-t border-onyx/10 pt-8">
            <button
              type="submit"
              disabled={!dirty || updateMutation.isPending}
              className="group relative inline-flex h-14 items-center overflow-hidden bg-onyx px-10 text-[11px] font-medium uppercase tracking-[0.25em] text-ghost disabled:opacity-50"
            >
              <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover:text-onyx">
                {updateMutation.isPending && <Loader className="h-3.5 w-3.5 animate-spin" />}
                {updateMutation.isPending ? "Saving\u2026" : "Save Changes"}
              </span>
            </button>

            <Link
              to="/admin"
              className="inline-flex h-14 items-center border border-onyx/15 px-8 text-[11px] font-medium uppercase tracking-[0.25em] transition-colors hover:border-onyx"
            >
              Cancel
            </Link>

            {saved && (
              <span className="text-[10px] uppercase tracking-[0.25em] text-green-600 animate-reveal">
                Changes saved
              </span>
            )}

            {updateMutation.isError && (
              <span className="text-[10px] uppercase tracking-[0.25em] text-red-500">
                Save failed. Check console.
              </span>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
