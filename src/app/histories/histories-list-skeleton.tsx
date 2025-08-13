import { Skeleton } from '@/components/ui/skeleton';

export function HistoriesListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-[120px] w-[100px] flex-shrink-0 rounded-md" />
            
            <div className="flex-1">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}