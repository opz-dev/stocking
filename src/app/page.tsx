import { StockingListContainer } from "@/app/stocking-list-container";
import { Suspense } from "react";
import { StockingListSkeleton } from "./stocking-list-skeleton";
import { StockingSearchForm } from "./customer-search-form";

export default function Home() {
  return (
    <div className="container px-4 mx-auto py-6 flex flex-col gap-4">
      <div>
        <StockingSearchForm />
      </div>
      <Suspense fallback={<StockingListSkeleton />}>
        <StockingListContainer />
      </Suspense>
    </div>
  );
}
