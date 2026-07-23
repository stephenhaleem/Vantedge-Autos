import { useEffect, useState } from "react";

export function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase("exiting");
    }, 1300);

    const removeTimer = setTimeout(() => {
      setPhase("done");
    }, 1900);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-onyx transition-opacity duration-700 ease-out ${
        phase === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <TireLoader />

      <div className="flex flex-col items-center gap-2">
        <div className="font-heading text-2xl font-light uppercase tracking-[0.15em] text-ghost">
          Chrono <span className="font-semibold">Value Auto</span>
        </div>
        <div className="animate-loader-text text-[10px] uppercase tracking-[0.35em] text-silver">
          Loading Inventory
        </div>
      </div>
    </div>
  );
}

function TireLoader() {
  return (
    <div className="relative h-24 w-24">
      {/* soft ground shadow */}
      <div className="absolute -bottom-3 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-black/40 blur-sm" />

      <svg
        viewBox="0 0 100 100"
        className="animate-tire-spin h-24 w-24"
        style={{ transformOrigin: "50% 50%" }}
      >
        {/* outer tire / rubber */}
        <circle cx="50" cy="50" r="46" fill="#141414" stroke="#2a2a2a" strokeWidth="2" />

        {/* tread marks around the rim */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect
              key={i}
              x="48.5"
              y="4"
              width="3"
              height="8"
              rx="1"
              fill="#050505"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}

        {/* inner rim */}
        <circle cx="50" cy="50" r="30" fill="#1c1c1c" stroke="#3a3a3a" strokeWidth="1.5" />

        {/* rim spokes */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 360) / 5;
          return (
            <rect
              key={i}
              x="47.5"
              y="22"
              width="5"
              height="24"
              rx="2.5"
              fill="#d4cdc3"
              opacity="0.9"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}

        {/* hub */}
        <circle cx="50" cy="50" r="9" fill="#0f0f0f" stroke="#d4cdc3" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="3" fill="#d4cdc3" />
      </svg>
    </div>
  );
}
