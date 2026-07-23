import { useEffect, useState } from "react";

const DEFAULT_WORDS = ["Quality.", "Value.", "Reliability.", "Confidence."];

export function RotatingWord({
  words = DEFAULT_WORDS,
  interval = 4000,
}: {
  words?: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-top">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`col-start-1 row-start-1 italic font-normal transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            i === index ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
