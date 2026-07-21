import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/inventory", label: "Inventory" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "Atelier" },
  { to: "/contact", label: "Showrooms" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Marquee ticker */}
      <div className="fixed top-0 z-[60] w-full overflow-hidden border-b border-onyx/10 bg-onyx text-ghost">
        <div className="flex whitespace-nowrap animate-marquee py-1.5 gap-16 will-change-transform">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-16 items-center pr-16">
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">New Arrival — 1974 Carrera RS 3.0</span>
              <span className="text-[10px] tracking-[0.3em] text-silver">◆</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Worldwide Enclosed Shipping</span>
              <span className="text-[10px] tracking-[0.3em] text-silver">◆</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Private Viewings By Appointment</span>
              <span className="text-[10px] tracking-[0.3em] text-silver">◆</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Est. Los Angeles · London · Milan</span>
              <span className="text-[10px] tracking-[0.3em] text-silver">◆</span>
            </div>
          ))}
        </div>
      </div>

      <nav
        className={`fixed top-[30px] z-50 w-full border-b transition-all duration-500 ${
          scrolled
            ? "border-onyx/10 bg-ghost/85 backdrop-blur-xl"
            : "border-transparent bg-ghost/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-heading text-2xl font-semibold uppercase tracking-tighter">
              Vantedge
            </span>
            <span className="hidden text-[9px] font-medium uppercase tracking-[0.3em] text-silver transition-opacity md:inline-block">
              Automotive
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group relative px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-onyx/80 transition-colors hover:text-onyx"
                activeProps={{ className: "text-onyx" }}
              >
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-onyx transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-silver">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-onyx opacity-40" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-onyx" />
              </span>
              Concierge Online
            </div>
            <Link
              to="/contact"
              className="group relative overflow-hidden border border-onyx/20 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors"
            >
              <span className="absolute inset-0 -translate-x-full bg-onyx transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors duration-500 group-hover:text-ghost">
                Concierge
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
