import { Skeleton } from "@/components/ui/skeleton";

export default function KanbanLoading() {
  return (
    <div className="p-6 pt-20" style={{ paddingLeft: "256px" }}>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
      <div className="flex gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80">
            <Skeleton className="h-8 w-32 mb-4 rounded-xl" />
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-28 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
