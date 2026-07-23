import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-onyx/5 bg-ghost px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
          <Link to="/" className="inline-block">
            <img src={logo} alt="Chrono Value Auto" className="h-29 w-auto brightness-0" />
          </Link>
          <p className="mx-auto mt-6 max-w-xs text-xs leading-relaxed text-silver sm:mx-0">
            Quality used cars, fair prices, and straightforward service. Katy, Texas.
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
      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center gap-6 border-t border-onyx/5 pt-8 text-center text-[10px] uppercase tracking-[0.25em] text-silver sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-wrap justify-center gap-4 sm:justify-end sm:gap-6">
          <a href="#" className="hover:text-onyx">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
