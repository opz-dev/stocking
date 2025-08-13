import { Suspense } from "react";
import { getStockingItems } from "@/app/actions/stocking";
import { StockingListPresenter } from "./stocking-list-presenter";
import { StockingListSkeleton } from "./stocking-list-skeleton";
async function StockingItemsLoader() {}

export async function StockingListContainer() {
  const items = await getStockingItems();

  return <StockingListPresenter items={items} />;
}
