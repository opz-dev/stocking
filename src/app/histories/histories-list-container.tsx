import { Suspense } from 'react';
import { getStockingHistories } from '@/app/actions/stocking';
import { HistoriesPresenter } from './histories-list-presenter';
import { HistoriesListSkeleton } from './histories-list-skeleton';
import { HistoriesFilterContainer } from './histories-filter-container';

interface HistoriesListContainerProps {
  searchParams?: {
    startDate?: string;
    endDate?: string;
    productName?: string;
  };
}


export async function HistoriesContainer({ searchParams }: HistoriesListContainerProps) {
  const filter = {
    startDate: searchParams?.startDate ? new Date(searchParams.startDate) : undefined,
    endDate: searchParams?.endDate ? new Date(searchParams.endDate) : undefined,
    productName: searchParams?.productName,
  };

  const histories = await getStockingHistories(filter);

  return <HistoriesPresenter histories={histories} />;
}
