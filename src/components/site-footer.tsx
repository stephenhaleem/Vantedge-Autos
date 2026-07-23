import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-onyx/5 bg-ghost px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-12 md:grid-cols-4">
        <div className="col-span-2">
          <Link to="/" className="inline-block">
            <img src={logo} alt="Chrono Value Auto" className="h-29 w-auto brightness-0" />
          </Link>
          <p className="mt-6 max-w-xs text-xs leading-relaxed text-silver">
            Quality used cars, fair prices, and straightforward service. Houston, Texas.
          </p>
        </div>
        <div>
          <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em]">
            Quick Links
          </h4>
          <ul className="space-y-4 text-xs text-silver">
            <li>
              <Link to="/inventory" className="hover:text-onyx transition-colors">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-onyx transition-colors">
                Visit Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-onyx transition-colors">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em]">Legal</h4>
          <ul className="space-y-4 text-xs text-silver">
            <li>
              <Link to="/privacy" className="hover:text-onyx transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-onyx transition-colors">
                Terms of Sale
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-20 flex max-w-7xl items-center justify-between border-t border-onyx/5 pt-8 text-[10px] uppercase tracking-[0.25em] text-silver">
        <span>© 2026 Chrono Value Auto</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-onyx">
            Instagram
          </a>
          <a href="#" className="hover:text-onyx">
            Youtube
          </a>
          <a href="#" className="hover:text-onyx">
            Journal
          </a>
        </div>
      </div>
    </footer>
  );
}
