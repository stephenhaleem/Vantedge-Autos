import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCars } from "@/lib/use-cars";
import { formatPrice } from "@/lib/cars";
import { CarCard } from "@/components/car-card";
import craftsmanship from "@/assets/craftsmanship.jpg";
import showroomImage from "@/assets/showroom.jpg";
import aeonImage from "@/assets/hero-aeon.jpg";
import devonImage from "@/assets/devon-janse-van-rensburg-qLD0AxAKnhE-unsplash.jpg";
import { RotatingWord } from "@/components/rotating-word";
import { useIsMobile } from "@/hooks/use-mobile";
import martin1 from "@/assets/martin-katler-e3gVocvZ-g0-unsplash.jpg";
import martin2 from "@/assets/martin-katler-Sr9dLwS_kjs-unsplash.jpg";

import janse from "@/assets/janse.jpg";
import thinh from "@/assets/thinh.jpg";
import yuvraj from "@/assets/yuvraj.jpg";

const desktopSlides = [aeonImage, janse, yuvraj, thinh];
const mobileSlides = [devonImage, martin1, martin2];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chrono Value Auto — Premium Cars, Curated" },
      {
        name: "description",
        content:
          "Discover Chrono Value Auto: a curated collection of premium performance, electric, and heritage automobiles. Viewing by appointment.",
      },
      { property: "og:title", content: "Chrono Value Auto — Premium Cars, Curated" },
      {
        property: "og:description",
        content: "A curated collection of premium performance, electric, heritage, and hypercars.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: cars = [] } = useCars();
  const featured = cars.slice(0, 4);
  const isMobile = useIsMobile();
  const slides = isMobile ? mobileSlides : desktopSlides;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="bg-ghost">
      {/* Hero */}
      <section className="relative -mt-[110px] flex h-screen items-center overflow-hidden pt-[110px]">
        <div className="absolute inset-0 z-0">
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Hero slide ${i + 1}`}
              width={1920}
              height={1080}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                i === slideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/55 via-onyx/5 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl animate-reveal">
            <span className="mb-4 inline-block text-[10px] font-medium uppercase tracking-[0.35em] text-ghost/70">
              Series I — Available Now
            </span>
            <h1 className="mb-10 text-ghost font-heading text-6xl font-light leading-[0.92] tracking-tighter md:text-8xl lg:text-9xl">
              Define <br />
              <RotatingWord interval={5000} />
            </h1>
            <div className="flex flex-wrap items-center gap-8">
              <Link
                to="/inventory"
                className="group relative inline-flex h-14 items-center overflow-hidden bg-onyx px-10 text-[11px] font-medium uppercase tracking-[0.25em] text-ghost"
              >
                <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-onyx">
                  Explore Inventory
                </span>
              </Link>
              <div className="flex items-center text-[11px] font-medium uppercase tracking-[0.25em] text-ghost">
                <span className="mr-4 h-px w-12 bg-ghost" />
                Starting at {formatPrice(122000)}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center">
          <div className="relative h-24 w-px overflow-hidden bg-onyx/15">
            <div className="animate-scroll-line absolute top-0 h-1/2 w-full bg-ghost" />
          </div>
          <span className="mt-4 rotate-180 text-[9px] text-ghost uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Discover
          </span>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-onyx/5 bg-ghost">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-onyx/5 md:grid-cols-4">
          {[
            { k: String(cars.length), l: "Vehicles in Stock" },
            { k: String(new Set(cars.map((c) => c.make)).size), l: "Manufacturers" },
            { k: "24h", l: "Support Response" },
          ].map((s) => (
            <div key={s.l} className="px-6 py-10">
              <div className="font-heading text-4xl font-light tracking-tight">{s.k}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-silver">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Inventory */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-silver">
              The Collection
            </p>
            <h2 className="font-heading text-4xl font-light md:text-5xl">
              Current <br />
              <span className="italic">Selected Works.</span>
            </h2>
          </div>
          <Link
            to="/inventory"
            className="group flex items-center text-[11px] font-medium uppercase tracking-[0.25em]"
          >
            View Full Inventory
            <span className="ml-4 h-px w-12 bg-onyx transition-all duration-500 group-hover:w-20" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Bespoke / Atelier */}
      <section className="bg-onyx px-6 py-32 text-ghost">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 md:flex-row">
          <div className="w-full md:w-1/2">
            <img
              src={craftsmanship}
              alt="Stitched leather and carbon fibre detail"
              width={1000}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <span className="mb-8 block text-[10px] font-medium uppercase tracking-[0.35em] text-silver">
              The Atelier
            </span>
            <h2 className="mb-8 font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
              Tailored to your <br />
              <span className="italic">distinctive pulse.</span>
            </h2>
            <p className="mb-12 max-w-md text-sm leading-relaxed text-silver">
              Every Chrono Value Auto vehicle is an extension of its owner. Through our Bespoke
              Studio, you access a library of exclusive materials, custom finishes, and engineering
              adjustments that ensure your car is as unique as your thumbprint.
            </p>
            <Link
              to="/about"
              className="group flex items-center text-[11px] font-medium uppercase tracking-[0.25em]"
            >
              Begin Commission
              <span className="ml-4 h-px w-12 bg-ghost transition-all duration-500 group-hover:w-24" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
