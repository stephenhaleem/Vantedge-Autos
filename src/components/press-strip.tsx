const publications = [
  "Motor Weekly",
  "Concours Digest",
  "Apex Journal",
  "Drive Culture",
  "The Marque Review",
];

export function PressStrip() {
  return (
    <section className="border-y border-onyx/5 bg-ghost px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-center text-[10px] uppercase tracking-[0.3em] text-silver">
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 opacity-60">
          {publications.map((name) => (
            <span
              key={name}
              className="font-heading text-lg font-light uppercase tracking-tight text-onyx"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
