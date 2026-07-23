import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCarLists } from "@/lib/use-car-lists";
import { Heart, GitCompareArrows, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

const links = [
  { to: "/inventory", label: "Inventory" },
  { to: "/collections", label: "Browse by Type" },
  { to: "/about", label: "About Us" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { shortlistIds, compareIds } = useCarLists();
  const location = useLocation();
  const isHome = location.pathname === "/";

  // On homepage: transparent nav with white text. On other pages: solid with black text.
  const isGhost = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-[0px] z-50 w-full border-b transition-all duration-700 ${
          isGhost
            ? "border-onyx/10 bg-ghost/85 backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Chrono Value Auto"
              className={`h-20 w-auto transition-all duration-300 ${
                isGhost ? "brightness-0" : "brightness-0 invert"
              }`}
            />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`group relative px-2 lg:px-4 py-2 text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  isGhost ? "text-onyx/80 hover:text-onyx" : "text-white/80 hover:text-white"
                }`}
                activeProps={{ className: isGhost ? "text-onyx" : "text-white" }}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100 ${
                      isGhost ? "bg-onyx" : "bg-white"
                    }`}
                  />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-1 sm:gap-2 text-[10px] uppercase tracking-[0.25em] ${
                isGhost ? "text-silver" : "text-white/60"
              }`}
            >
              <Link
                to="/shortlist"
                className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-colors ${
                  isGhost ? "text-onyx/80 hover:text-onyx" : "text-white/80 hover:text-white"
                }`}
                aria-label="Shortlist"
              >
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
                {shortlistIds.length > 0 && (
                  <span
                    className={`absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full text-[8px] sm:text-[9px] ${
                      isGhost ? "bg-onyx text-ghost" : "bg-white text-onyx"
                    }`}
                  >
                    {shortlistIds.length}
                  </span>
                )}
              </Link>
              <Link
                to="/compare"
                className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-colors ${
                  isGhost ? "text-onyx/80 hover:text-onyx" : "text-white/80 hover:text-white"
                }`}
                aria-label="Compare"
              >
                <GitCompareArrows className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.5} />
                {compareIds.length > 0 && (
                  <span
                    className={`absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full text-[8px] sm:text-[9px] ${
                      isGhost ? "bg-onyx text-ghost" : "bg-white text-onyx"
                    }`}
                  >
                    {compareIds.length}
                  </span>
                )}
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={`flex md:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center transition-colors ${
                    isGhost ? "text-onyx/80 hover:text-onyx" : "text-white/80 hover:text-white"
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full border-l border-onyx/10 bg-ghost p-0 sm:max-w-sm"
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-onyx/10 px-8 py-8">
                    <span className="font-heading text-xl font-semibold uppercase tracking-tighter">
                      Chrono Value Auto
                    </span>
                    <SheetClose className="h-8 w-8 flex items-center justify-center text-onyx/60 hover:text-onyx transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      <span className="sr-only">Close</span>
                    </SheetClose>
                  </div>

                  {/* Navigation links */}
                  <nav className="flex-1 px-8 py-10">
                    <ul className="space-y-1">
                      {links.map((l, i) => (
                        <li key={l.to}>
                          <SheetClose asChild>
                            <Link
                              to={l.to}
                              className="group flex items-center py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-onyx/80 transition-colors hover:text-onyx"
                              activeProps={{ className: "text-onyx" }}
                            >
                              <span className="mr-4 text-[10px] tracking-[0.15em] text-silver/60 font-mono">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="relative">
                                {l.label}
                                <span className="absolute -bottom-1 left-0 h-px w-0 bg-onyx transition-all duration-500 ease-out group-hover:w-full" />
                              </span>
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Shortlist & Compare */}
                  <div className="border-t border-onyx/10 px-8 py-6">
                    <div className="flex items-center gap-6">
                      <SheetClose asChild>
                        <Link
                          to="/shortlist"
                          className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-onyx/70 hover:text-onyx transition-colors"
                        >
                          <span className="relative flex h-9 w-9 items-center justify-center">
                            <Heart className="h-4 w-4" strokeWidth={1.5} />
                            {shortlistIds.length > 0 && (
                              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-onyx text-[9px] text-ghost">
                                {shortlistIds.length}
                              </span>
                            )}
                          </span>
                          <span>Shortlist</span>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          to="/compare"
                          className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-onyx/70 hover:text-onyx transition-colors"
                        >
                          <span className="relative flex h-9 w-9 items-center justify-center">
                            <GitCompareArrows className="h-4 w-4" strokeWidth={1.5} />
                            {compareIds.length > 0 && (
                              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-onyx text-[9px] text-ghost">
                                {compareIds.length}
                              </span>
                            )}
                          </span>
                          <span>Compare</span>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
