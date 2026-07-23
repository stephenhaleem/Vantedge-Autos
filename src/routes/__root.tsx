import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CarListsProvider } from "@/lib/use-car-lists";
import { CompareBar } from "@/components/compare-bar";
import { SiteLoader } from "@/components/site-loader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ghost px-4 pt-32 pb-16">
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-silver">Error 404</p>
        <h1 className="mt-4 font-heading text-7xl font-light tracking-tighter text-onyx">
          Off-Road
        </h1>
        <p className="mt-6 text-sm text-silver">
          This route doesn't appear on our map. Return to the showroom.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center bg-onyx px-8 text-[11px] font-medium uppercase tracking-[0.25em] text-ghost transition-colors hover:bg-onyx/85"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Chrono Value Auto — Quality Used Cars in Katy, TX" },
      {
        name: "description",
        content:
          "Chrono Value Auto is a Houston, Texas used car dealership. Every vehicle inspected, fair pricing, flexible financing.",
      },
      { name: "author", content: "Chrono Value Auto" },
      { property: "og:title", content: "Chrono Value Auto — Premium Cars, Curated" },
      {
        property: "og:description",
        content: "A curated collection of premium performance, electric, heritage, and hypercars.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=..." },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      +{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      +{ rel: "icon", href: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CarListsProvider>
        <SiteLoader />
        <SiteHeader />
        <main className="pt-[110px]">
          <Outlet />
        </main>
        <SiteFooter />
        <CompareBar />
      </CarListsProvider>
    </QueryClientProvider>
  );
}
