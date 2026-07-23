import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const COMPARE_KEY = "Chrono Value Auto:compare";
const SHORTLIST_KEY = "Chrono Value Auto:shortlist";
const MAX_COMPARE = 3;

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("Chrono Value Auto:storage"));
}

type CarListsContextValue = {
  compareIds: string[];
  shortlistIds: string[];
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  toggleShortlist: (id: string) => void;
  isCompared: (id: string) => boolean;
  isShortlisted: (id: string) => boolean;
  compareFull: boolean;
};

const CarListsContext = createContext<CarListsContextValue | null>(null);

export function CarListsProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [shortlistIds, setShortlistIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setCompareIds(readIds(COMPARE_KEY));
      setShortlistIds(readIds(SHORTLIST_KEY));
    };
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("Chrono Value Auto:storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("Chrono Value Auto:storage", sync);
    };
  }, []);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= MAX_COMPARE
          ? prev
          : [...prev, id];
      writeIds(COMPARE_KEY, next);
      return next;
    });
  };

  const removeCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = prev.filter((x) => x !== id);
      writeIds(COMPARE_KEY, next);
      return next;
    });
  };

  const clearCompare = () => {
    setCompareIds([]);
    writeIds(COMPARE_KEY, []);
  };

  const toggleShortlist = (id: string) => {
    setShortlistIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeIds(SHORTLIST_KEY, next);
      return next;
    });
  };

  const value: CarListsContextValue = {
    compareIds,
    shortlistIds,
    toggleCompare,
    removeCompare,
    clearCompare,
    toggleShortlist,
    isCompared: (id) => compareIds.includes(id),
    isShortlisted: (id) => shortlistIds.includes(id),
    compareFull: compareIds.length >= MAX_COMPARE,
  };

  return <CarListsContext.Provider value={value}>{children}</CarListsContext.Provider>;
}

export function useCarLists() {
  const ctx = useContext(CarListsContext);
  if (!ctx) throw new Error("useCarLists must be used within CarListsProvider");
  return ctx;
}
