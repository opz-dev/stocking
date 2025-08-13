import { Suspense } from "react";
import { HistoriesContainer } from "./histories-list-container";
import { HistoriesListSkeleton } from "./histories-list-skeleton";

interface PageProps {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
    productName?: string;
  }>;
}

export default async function HistoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <div className="container px-4 mx-auto py-6">
      <Suspense fallback={<HistoriesListSkeleton />}>
        <HistoriesContainer searchParams={params} />
      </Suspense>
    </div>
  );
}
