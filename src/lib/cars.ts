import obsidian from "@/assets/car-obsidian.jpg";
import horizon from "@/assets/car-horizon.jpg";
import silverstone from "@/assets/car-silverstone.jpg";
import ignition from "@/assets/car-ignition.jpg";
import aeon from "@/assets/hero-aeon.jpg";

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

export const cars: Car[] = [
  {
    id: "obsidian-gt",
    name: "Obsidian GT",
    make: "Vantedge",
    model: "Obsidian GT",
    year: 2024,
    tagline: "4.0L V8 Bi-Turbo / 620HP",
    category: "Performance",
    fuelType: "Petrol",
    price: 215900,
    image: obsidian,
    specs: {
      engine: "4.0L V8 Bi-Turbo",
      power: "620 HP",
      torque: "590 lb-ft",
      zeroToSixty: "3.1 s",
      topSpeed: "205 mph",
      transmission: "8-Speed PDK",
      drivetrain: "All-Wheel Drive",
      weight: "1,745 kg",
    },
    description:
      "A grand tourer sculpted from restraint. The Obsidian GT pairs a hand-assembled bi-turbo V8 with a chassis tuned in the wind tunnels of Weissach.",
  },
  {
    id: "horizon-suv",
    name: "Horizon SUV",
    make: "Vantedge",
    model: "Horizon",
    year: 2025,
    tagline: "Dual-Motor Electric / 480mi Range",
    category: "Electric",
    fuelType: "Electric",
    price: 122000,
    image: horizon,
    specs: {
      engine: "Dual Permanent Magnet Motors",
      power: "560 HP",
      torque: "664 lb-ft",
      zeroToSixty: "3.4 s",
      topSpeed: "155 mph",
      transmission: "Single-Speed",
      drivetrain: "All-Wheel Drive",
      weight: "2,410 kg",
    },
    description:
      "An electric flagship for the modern collector. The Horizon SUV delivers 480 miles of silent range in a cabin lined with responsibly-sourced hides and milled aluminum.",
  },
  {
    id: "silverstone-heritage",
    name: "Silverstone Heritage",
    make: "Meridian",
    model: "Silverstone",
    year: 1967,
    tagline: "Limited Collector Series",
    category: "Heritage",
    fuelType: "Petrol",
    price: 345000,
    image: silverstone,
    specs: {
      engine: "3.8L Naturally Aspirated Flat-Six",
      power: "420 HP",
      torque: "331 lb-ft",
      zeroToSixty: "4.2 s",
      topSpeed: "186 mph",
      transmission: "6-Speed Manual",
      drivetrain: "Rear-Wheel Drive",
      weight: "1,290 kg",
    },
    description:
      "A modern homage to the 1955 Mille Miglia winner. Limited to 77 examples, each Silverstone is hand-assembled and finished with archival paint codes.",
  },
  {
    id: "ignition-s",
    name: "Ignition S",
    make: "Ignition Works",
    model: "S",
    year: 2026,
    tagline: "Hybrid Hypercar / 1200HP",
    category: "Hypercar",
    fuelType: "Hybrid",
    price: 1200000,
    image: ignition,
    specs: {
      engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
      power: "1,200 HP",
      torque: "1,106 lb-ft",
      zeroToSixty: "2.4 s",
      topSpeed: "248 mph",
      transmission: "7-Speed DCT",
      drivetrain: "All-Wheel Drive",
      weight: "1,595 kg",
    },
    description:
      "The Ignition S is our current apex — a hybrid hypercar developed alongside our Formula programme. Carbon monocoque, active aero, and a soundtrack you feel in your ribs.",
  },
  {
    id: "obsidian-gt-s",
    name: "Obsidian GT S",
    make: "Vantedge",
    model: "Obsidian GT S",
    year: 2025,
    tagline: "4.0L V8 Bi-Turbo / 720HP",
    category: "Performance",
    fuelType: "Petrol",
    price: 268000,
    image: obsidian,
    specs: {
      engine: "4.0L V8 Bi-Turbo",
      power: "720 HP",
      torque: "620 lb-ft",
      zeroToSixty: "2.9 s",
      topSpeed: "212 mph",
      transmission: "8-Speed PDK",
      drivetrain: "All-Wheel Drive",
      weight: "1,720 kg",
    },
    description:
      "The sharper edge of the Obsidian family. A weight-optimised, track-honed evolution with revised aero and a stripped cabin.",
  },
  {
    id: "horizon-touring",
    name: "Horizon Touring",
    make: "Vantedge",
    model: "Horizon Touring",
    year: 2024,
    tagline: "Long-Range Electric Sedan",
    category: "Electric",
    fuelType: "Electric",
    price: 158000,
    image: aeon,
    specs: {
      engine: "Dual Permanent Magnet Motors",
      power: "610 HP",
      torque: "701 lb-ft",
      zeroToSixty: "3.2 s",
      topSpeed: "162 mph",
      transmission: "Single-Speed",
      drivetrain: "All-Wheel Drive",
      weight: "2,180 kg",
    },
    description:
      "A grand-touring sedan redefined for the electric age. 512 miles of range, air suspension, and a hushed cabin of milled aluminum.",
  },
  {
    id: "meridian-continental",
    name: "Continental Heritage",
    make: "Meridian",
    model: "Continental",
    year: 1972,
    tagline: "Restored Grand Tourer",
    category: "Heritage",
    fuelType: "Petrol",
    price: 285000,
    image: silverstone,
    specs: {
      engine: "5.3L V12",
      power: "310 HP",
      torque: "365 lb-ft",
      zeroToSixty: "6.8 s",
      topSpeed: "148 mph",
      transmission: "5-Speed Manual",
      drivetrain: "Rear-Wheel Drive",
      weight: "1,510 kg",
    },
    description:
      "A concours-grade restoration of Meridian's most celebrated grand tourer. Documented history, matching numbers.",
  },
];

export const heroImage = aeon;

export const findCar = (id: string) => cars.find((c) => c.id === id);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const allMakes = Array.from(new Set(cars.map((c) => c.make))).sort();
export const allModels = Array.from(new Set(cars.map((c) => c.model))).sort();
export const allFuelTypes: FuelType[] = ["Petrol", "Electric", "Hybrid", "Diesel"];
export const yearBounds = {
  min: Math.min(...cars.map((c) => c.year)),
  max: Math.max(...cars.map((c) => c.year)),
};
export const priceBounds = {
  min: Math.min(...cars.map((c) => c.price)),
  max: Math.max(...cars.map((c) => c.price)),
};
