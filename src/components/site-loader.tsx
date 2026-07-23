import { useEffect, useState } from "react";

export function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    // Show loader for a minimum duration, then fade out
    const showTimer = setTimeout(() => {
      setPhase("exiting");
    }, 1200);

    const removeTimer = setTimeout(() => {
      setPhase("done");
    }, 1800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-onyx transition-opacity duration-700 ease-out ${
        phase === "exiting" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-heading text-3xl font-light uppercase tracking-[0.15em] text-ghost">
          Chrono <span className="font-semibold">Value Auto</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-champagne"
              style={{
                animation: `loader-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
