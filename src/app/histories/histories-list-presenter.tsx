import { StockingHistory } from '@/data/mock-data';
import { HistoryListItem } from './history-list-item';

interface HistoriesListPresenterProps {
  histories: StockingHistory[];
}

export function HistoriesPresenter({ histories }: HistoriesListPresenterProps) {
  return (
    <div className="flex flex-col gap-4">
      {histories.map((history) => (
        <HistoryListItem key={history.id} history={history} />
      ))}
    </div>
  );
}
