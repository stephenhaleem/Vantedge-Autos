import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCarLists } from "@/lib/use-car-lists";
import { Heart, GitCompareArrows } from "lucide-react";

const links = [
  { to: "/inventory", label: "Inventory" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "Atelier" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Showrooms" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { shortlistIds, compareIds } = useCarLists();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-[0px] z-50 w-full border-b transition-all duration-500 ${
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
              <Link
                to="/shortlist"
                className="relative flex h-9 w-9 items-center justify-center text-onyx/80 hover:text-onyx"
                aria-label="Shortlist"
              >
                <Heart className="h-4 w-4" strokeWidth={1.5} />
                {shortlistIds.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-onyx text-[9px] text-ghost">
                    {shortlistIds.length}
                  </span>
                )}
              </Link>
              <Link
                to="/compare"
                className="relative flex h-9 w-9 items-center justify-center text-onyx/80 hover:text-onyx"
                aria-label="Compare"
              >
                <GitCompareArrows className="h-4 w-4" strokeWidth={1.5} />
                {compareIds.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-onyx text-[9px] text-ghost">
                    {compareIds.length}
                  </span>
                )}
              </Link>
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
