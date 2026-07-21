import { Skeleton } from "@/components/ui/skeleton";

export function CarCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
