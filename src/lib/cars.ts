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
  image: string;
  images: string[];
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
  image_path: string;
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
    image: getImageUrl(row.image_path),
    images: (row.image_paths?.length ? row.image_paths : [row.image_path]).map(getImageUrl),
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
