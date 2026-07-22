import { supabase } from "@/lib/supabase";

export type FuelType = "Petrol" | "Electric" | "Hybrid" | "Diesel";
export type Category = "Electric" | "Performance" | "Heritage" | "Hypercar";

export type Car = {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  tagline: string;
  category: Category;
  fuelType: FuelType;
  price: number;
  images: string[];
  image_paths: string[];
  specs: {
    engine: string;
    power: string;
    torque: string;
    zeroToSixty: string;
    topSpeed: string;
    transmission: string;
    drivetrain: string;
    weight: string;
  };
  description: string;
};

const CAR_IMAGES_BUCKET = "car-images";

export function getImageUrl(path: string | null | undefined) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return supabase.storage.from(CAR_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
}

type CarRow = {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  tagline: string;
  category: string;
  fuel_type: string;
  price: number;
  image_paths: string[] | null;
  specs: {
    engine: string;
    power: string;
    torque: string;
    zero_to_sixty: string;
    top_speed: string;
    transmission: string;
    drivetrain: string;
    weight: string;
  };
  description: string;
};

function mapRow(row: CarRow): Car {
  const image_paths = row.image_paths ?? [];
  const images = image_paths.map(getImageUrl);

  return {
    id: row.id,
    name: row.name,
    make: row.make,
    model: row.model,
    year: row.year,
    tagline: row.tagline,
    category: row.category as Category,
    fuelType: row.fuel_type as FuelType,
    price: row.price,
    images,
    image_paths,
    specs: {
      engine: row.specs.engine,
      power: row.specs.power,
      torque: row.specs.torque,
      zeroToSixty: row.specs.zero_to_sixty,
      topSpeed: row.specs.top_speed,
      transmission: row.specs.transmission,
      drivetrain: row.specs.drivetrain,
      weight: row.specs.weight,
    },
    description: row.description,
  };
}

export async function fetchCars(): Promise<Car[]> {
  const { data, error } = await supabase.from("cars").select("*");
  if (error) throw error;
  return (data as CarRow[]).map(mapRow);
}

export async function fetchCar(id: string): Promise<Car | null> {
  const { data, error } = await supabase.from("cars").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as CarRow) : null;
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export async function updateCar(id: string, data: Partial<Omit<Car, "id">>): Promise<Car> {
  const payload: Record<string, unknown> = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.make !== undefined) payload.make = data.make;
  if (data.model !== undefined) payload.model = data.model;
  if (data.year !== undefined) payload.year = data.year;
  if (data.tagline !== undefined) payload.tagline = data.tagline;
  if (data.category !== undefined) payload.category = data.category;
  if (data.fuelType !== undefined) payload.fuel_type = data.fuelType;
  if (data.price !== undefined) payload.price = data.price;
  if (data.description !== undefined) payload.description = data.description;
  if (data.specs !== undefined) payload.specs = data.specs;
  if (data.image_paths !== undefined) payload.image_paths = data.image_paths;

  if (Object.keys(payload).length === 0) {
    // Nothing to update — avoid sending an empty PATCH that PostgREST/.single() will choke on.
    const existing = await fetchCar(id);
    if (!existing) throw new Error("Car not found");
    return existing;
  }

  const { data: updated, error } = await supabase
    .from("cars")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return mapRow(updated as CarRow);
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadCarImage(file: File, carId: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `user_uploads/${carId}_${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(CAR_IMAGES_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export async function deleteCarImage(path: string): Promise<void> {
  const { error } = await supabase.storage.from(CAR_IMAGES_BUCKET).remove([path]);
  if (error) throw error;
}

export async function addCarImagePath(carId: string, path: string) {
  const car = await fetchCar(carId);
  if (!car) throw new Error("Car not found");

  await updateCar(carId, {
    image_paths: [...car.image_paths, path],
  });
}

export async function removeCarImagePath(carId: string, path: string) {
  const car = await fetchCar(carId);
  if (!car) throw new Error("Car not found");

  await updateCar(carId, {
    image_paths: car.image_paths.filter((p) => p !== path),
  });
}

export function deriveFacets(cars: Car[]) {
  const allMakes = Array.from(new Set(cars.map((c) => c.make))).sort();
  const allModels = Array.from(new Set(cars.map((c) => c.model))).sort();
  const allFuelTypes: FuelType[] = ["Petrol", "Electric", "Hybrid", "Diesel"];
  const yearBounds = cars.length
    ? { min: Math.min(...cars.map((c) => c.year)), max: Math.max(...cars.map((c) => c.year)) }
    : { min: 2000, max: new Date().getFullYear() };
  const priceBounds = cars.length
    ? { min: Math.min(...cars.map((c) => c.price)), max: Math.max(...cars.map((c) => c.price)) }
    : { min: 0, max: 0 };
  return { allMakes, allModels, allFuelTypes, yearBounds, priceBounds };
}
