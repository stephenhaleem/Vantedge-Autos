import { useQuery } from "@tanstack/react-query";
import { fetchCars } from "@/lib/cars";

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    staleTime: 60_000,
  });
}
