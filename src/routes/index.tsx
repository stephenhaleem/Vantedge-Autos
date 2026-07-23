import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCars } from "@/lib/use-cars";
import { formatPrice } from "@/lib/cars";
import { CarCard } from "@/components/car-card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import craftsmanship from "@/assets/craftsmanship.jpg";
import aeonImage from "@/assets/hero-aeon.jpg";
import devonImage from "@/assets/devon-janse-van-rensburg-qLD0AxAKnhE-unsplash.jpg";
import { RotatingWord } from "@/components/rotating-word";
import { useIsMobile } from "@/hooks/use-mobile";
import martin1 from "@/assets/martin-katler-e3gVocvZ-g0-unsplash.jpg";
import martin2 from "@/assets/martin-katler-Sr9dLwS_kjs-unsplash.jpg";

import janse from "@/assets/janse.jpg";
import thinh from "@/assets/thinh.jpg";
import yuvraj from "@/assets/yuvraj.jpg";
import showroom from "@/assets/showroom.jpg";
import haha from "@/assets/davidknapp-engine-8239093_1920.jpg";

gsap.registerPlugin(ScrollTrigger);

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

function useGsapReveal(ref: React.RefObject<HTMLDivElement | null>, depends: unknown[] = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    }, el);
    return () => ctx.revert();
  }, depends);
}

function useGsapStagger(
  ref: React.RefObject<HTMLDivElement | null>,
  childSelector: string,
  depends: unknown[] = [],
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(childSelector);
      if (targets.length === 0) return;
      gsap.from(targets, {
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, el);
    return () => ctx.revert();
  }, depends);
}

function Home() {
  const { data: cars = [] } = useCars();
  const isMobile = useIsMobile();
  const slides = isMobile ? mobileSlides : desktopSlides;
  const [slideIndex, setSlideIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const whyBgRef = useRef<HTMLDivElement>(null);
  const atelierRef = useRef<HTMLDivElement>(null);
  const atelierImgRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const tradeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el.querySelector(".hero-bg"), {
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        y: 100,
        scale: 1.05,
        ease: "none",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Stats count-up
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLDivElement>(".stat-value").forEach((item) => {
        const raw = item.getAttribute("data-value") || "0";
        if (!isNaN(Number(raw))) {
          const num = Number(raw);
          const obj = { val: 0 };
          gsap.to(obj, {
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            val: num,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: () => {
              item.textContent = Math.floor(obj.val).toString();
            },
          });
        } else {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          });
        }
      });
    }, el);
    return () => ctx.revert();
  }, [cars.length]);

  // Why Choose parallax background
  useEffect(() => {
    const el = whyBgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -80,
        scale: 1.08,
        ease: "none",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Atelier image parallax
  useEffect(() => {
    const el = atelierImgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: atelierRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -60,
        scale: 1.06,
        ease: "none",
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const featured = cars.slice(0, 3);
  const minPrice = cars.length > 0 ? Math.min(...cars.map((c) => c.price)) : 0;

  useGsapReveal(categoriesRef, [cars]);
  useGsapStagger(categoriesRef, ".featured-card", [cars]);
  useGsapReveal(whyRef);
  useGsapStagger(whyRef, ".why-card");
  useGsapReveal(atelierRef);
  useGsapReveal(aboutRef);
  useGsapStagger(aboutRef, ".about-block");
  useGsapReveal(tradeRef);
  useGsapReveal(mapRef);

  useEffect(() => {
    const id = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="bg-ghost" ref={heroRef}>
      {/* ========== HERO ========== */}
      <section className="relative -mt-[110px] flex h-screen items-center overflow-hidden pt-[110px]">
        <div className="hero-bg absolute inset-0 z-0 will-change-transform">
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Hero slide ${i + 1}`}
              width={1920}
              height={1080}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/55 via-onyx/5 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl animate-reveal">
            <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.35em] text-ghost/70">
              Texas — Open 7 Days
            </span>
            <h1 className="mb-10 text-ghost font-heading text-7xl font-light leading-[0.9] tracking-tighter md:text-9xl lg:text-[10rem]">
              Find Your
              <br />
              <RotatingWord interval={5000} />
            </h1>
            <div className="flex flex-wrap items-center gap-8">
              <Link
                to="/inventory"
                className="group relative inline-flex h-16 items-center overflow-hidden bg-onyx px-12 text-[12px] font-medium uppercase tracking-[0.25em] text-ghost"
              >
                <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative transition-colors duration-500 group-hover:text-onyx">
                  Explore Inventory
                </span>
              </Link>
              <div className="flex items-center text-[12px] font-medium uppercase tracking-[0.25em] text-ghost">
                <span className="mr-4 h-px w-14 bg-ghost" />
                Starting at {formatPrice(minPrice)}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10 flex-col items-center hidden md:flex">
          <div className="relative h-24 w-px overflow-hidden bg-onyx/15">
            <div className="animate-scroll-line absolute top-0 h-1/2 w-full bg-ghost" />
          </div>
          <span className="mt-4 rotate-180 text-[9px] text-ghost uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
            Discover
          </span>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="border-y border-onyx/5 bg-ghost" ref={statsRef}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-onyx/5 md:grid-cols-4">
          <div className="px-6 py-12 text-center md:text-left">
            <div
              className="stat-value font-heading text-5xl font-light tracking-tight"
              data-value={String(cars.length)}
            >
              0
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-silver">
              Vehicles in Stock
            </div>
          </div>
          <div className="px-6 py-12 text-center md:text-left">
            <div
              className="stat-value font-heading text-5xl font-light tracking-tight"
              data-value={String(new Set(cars.map((c) => c.make)).size)}
            >
              0
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-silver">
              Manufacturers
            </div>
          </div>
          <div className="px-6 py-12 text-center md:text-left">
            <div
              className="stat-value font-heading text-5xl font-light tracking-tight"
              data-value="24h"
            >
              24h
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-silver">
              Support Response
            </div>
          </div>
          <div className="px-6 py-12 text-center md:text-left">
            <div
              className="stat-value font-heading text-5xl font-light tracking-tight"
              data-value="150"
            >
              150+
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-silver">
              Point Inspection
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED INVENTORY ========== */}
      <section className="mx-auto max-w-7xl px-6 py-40" ref={categoriesRef}>
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-silver">On The Lot</p>
            <h2 className="font-heading text-5xl font-light md:text-6xl">
              Just
              <br />
              <span className="italic">Arived</span>
            </h2>
          </div>
          <Link
            to="/inventory"
            className="group flex items-center text-[12px] font-medium uppercase tracking-[0.25em]"
          >
            View Full Inventory
            <span className="ml-4 h-px w-12 bg-onyx transition-all duration-500 group-hover:w-20" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          {featured.map((car) => (
            <div key={car.id} className="featured-card">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section
        className="relative overflow-hidden border-y border-onyx/5 bg-onyx px-6 py-40"
        ref={whyRef}
      >
        {/* Background image with parallax */}
        <div ref={whyBgRef} className="absolute inset-0 z-0 will-change-transform">
          <img src={haha} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-onyx/70 via-onyx/60 to-onyx/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-silver">
              Why Chrono Value Auto
            </p>
            <h2 className="font-heading text-5xl font-light md:text-6xl leading-tight text-ghost">
              Built for those who <span className="italic">demand more.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                ),
                title: "Every Car Inspected",
                desc: "Nothing goes on our lot without a full mechanical and safety check first.",
                stats: "150-point inspection",
              },
              {
                number: "02",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                ),
                title: "Fair, Transparent Pricing",
                desc: "No hidden fees, no surprise add-ons. The price you see is the price you pay.",
                stats: "No hidden fees",
              },
              {
                number: "03",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "Friendly Local Service",
                desc: "We're a Houston business — you'll talk to the same team before and after the sale.",
                stats: "Houston, TX",
              },
              {
                number: "04",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ),
                title: "Easy Financing",
                desc: "We work with multiple lenders to find a payment plan that fits your budget.",
                stats: "Flexible financing",
              },
            ].map((item) => (
              <div key={item.title} className="why-card group relative">
                <div className="border-t border-onyx/10 pt-8 relative">
                  <span className="absolute right-0 top-8 text-[12px] font-mono text-silver/30 font-medium">
                    {item.number}
                  </span>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-onyx/5 text-white transition-all duration-500 group-hover:bg-onyx group-hover:text-ghost group-hover:scale-105">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-2xl text-white font-light tracking-tight group-hover:translate-x-0.5 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-silver">{item.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-champagne bg-onyx/5 px-3 py-1.5 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne animate-pulse-glow" />
                    {item.stats}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center border-t border-onyx/5 pt-16">
            <p className="text-sm text-silver max-w-lg mx-auto leading-relaxed">
              Whether you're acquiring your first collector car or expanding an existing collection,
              our concierge will guide you through every detail.
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex h-14 items-center text-white gap-4 border border-white px-8 text-[12px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
            >
              Speak With Our Team
              <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ATELIER ========== */}
      <section className="bg-onyx px-6 py-40 text-ghost" ref={atelierRef}>
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
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-silver">
              Built on trust, not hype.
            </p>
            <h2 className="mb-8 font-heading text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
              Financing
              <br />
              <span className="italic">actually makes sense</span>
            </h2>
            <p className="mb-12 max-w-md text-sm leading-relaxed text-silver">
              We work with a range of lenders to get you a rate that fits your budget, whether your
              credit is great or you're still building it. Get pre-qualified in minutes.
            </p>
            <Link
              to="/about"
              className="group flex items-center text-[12px] font-medium uppercase tracking-[0.25em]"
            >
              Ask About Financing
              <span className="ml-4 h-px w-12 bg-ghost transition-all duration-500 group-hover:w-24" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="px-6 py-40 bg-ghost overflow-hidden" ref={aboutRef}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-silver">
                About Chrono Value Auto
              </p>
              <h2 className="font-heading text-5xl font-light leading-tight tracking-tight md:text-6xl">
                A dealership that
                <br />
                <span className="italic">treats your right.</span>
              </h2>
            </div>
            <div className="md:col-span-7">
              <div className="about-block">
                <p className="text-base leading-relaxed text-onyx/75">
                  Chrono Value Auto has been buying, selling, and trading vehicles in Houston since
                  2015. We're not a big-box lot — every car on our property has been personally
                  checked out by our team before it's offered for sale.
                </p>
              </div>
              <div className="about-block">
                <p className="mt-6 text-base leading-relaxed text-onyx/75">
                  We know buying a used car can feel like a gamble. Our job is to make sure it isn't
                  — clear pricing, honest answers about a vehicle's history, and a team that's still
                  around if something comes up after the sale.
                </p>
              </div>
              <div className="about-block">
                <Link
                  to="/about"
                  className="group mt-10 inline-flex h-14 items-center gap-4 border border-onyx px-8 text-[12px] font-medium uppercase tracking-[0.25em] hover:bg-onyx hover:text-ghost transition-colors"
                >
                  Discover Our Story
                  <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRADE IN + MAP ========== */}
      <section className="bg-onyx text-ghost overflow-hidden" ref={tradeRef}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 md:px-14 py-40 flex flex-col justify-center">
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-silver">
                Ready to Move Forward
              </p>
              <h2 className="font-heading text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
                Trade in, trade up. <br />
                <span className="italic">The next chapter starts here.</span>
              </h2>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-silver">
                Looking to upgrade, sell outright, or finance your next vehicle? Our team makes the
                process simple — from valuation to paperwork to driving off the lot.
              </p>
              <div className="mt-12 flex flex-wrap gap-6">
                <Link
                  to="/contact"
                  className="group relative inline-flex h-14 items-center overflow-hidden bg-ghost px-10 text-[12px] font-medium uppercase tracking-[0.25em] text-onyx"
                >
                  <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative transition-colors duration-500 group-hover:text-onyx">
                    Speak With Concierge
                  </span>
                </Link>
                <Link
                  to="/inventory"
                  className="group inline-flex h-14 items-center gap-4 border border-ghost/30 px-8 text-[12px] font-medium uppercase tracking-[0.25em] text-ghost hover:bg-ghost hover:text-onyx transition-colors"
                >
                  Browse Inventory
                  <span className="h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[500px] md:min-h-full" ref={mapRef}>
              <div className="absolute inset-0 border-l border-ghost/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.789128537233!2d-95.4566192!3d29.7740092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c5f1e1e1e1e1%3A0x0!2s2425%20W%20Loop%20S%20Fwy%2C%20Houston%2C%20TX%2077027!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Chrono Value Auto Showroom — Texas"
                  className="grayscale transition-all duration-1000 hover:grayscale-0"
                />
              </div>
              <div className="absolute bottom-8 left-6 right-6 z-10">
                <div className="bg-onyx/85 backdrop-blur-md border border-ghost/10 px-6 py-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-silver">
                    Texas Showroom
                  </p>
                  <p className="mt-1 font-heading text-lg font-light tracking-tight">
                    2425 W Loop S Fwy, Houston, TX 77027
                  </p>
                  <p className="mt-0.5 text-sm text-silver">By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
