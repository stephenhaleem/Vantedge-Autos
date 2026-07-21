import { useState } from "react";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="overflow-hidden">
        <img
          src={images[active]}
          alt={alt}
          width={1600}
          height={1000}
          className="aspect-[16/10] w-full object-cover animate-reveal"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={`h-16 w-24 shrink-0 overflow-hidden border transition-opacity ${
                i === active
                  ? "border-onyx opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
