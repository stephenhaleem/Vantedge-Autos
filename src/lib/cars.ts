import obsidian from "@/assets/car-obsidian.jpg";
import horizon from "@/assets/car-horizon.jpg";
import silverstone from "@/assets/car-silverstone.jpg";
import ignition from "@/assets/car-ignition.jpg";
import aeon from "@/assets/hero-aeon.jpg";

export type Car = {
  id: string;
  name: string;
  tagline: string;
  category: "Electric" | "Performance" | "Heritage" | "Hypercar";
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
    tagline: "4.0L V8 Bi-Turbo / 620HP",
    category: "Performance",
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
    tagline: "Dual-Motor Electric / 480mi Range",
    category: "Electric",
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
    tagline: "Limited Collector Series",
    category: "Heritage",
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
    tagline: "Hybrid Hypercar / 1200HP",
    category: "Hypercar",
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
];

export const heroImage = aeon;

export const findCar = (id: string) => cars.find((c) => c.id === id);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
