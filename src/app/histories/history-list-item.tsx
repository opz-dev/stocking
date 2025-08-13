import { StockingHistory } from '@/data/mock-data';
import { ProductImage } from '../product-image';
import { CancelDialogContainer } from './cancel-dialog-container';

interface HistoryListItemProps {
  history: StockingHistory;
}

export function HistoryListItem({ history }: HistoryListItemProps) {

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start gap-4">
        <div className="relative h-[120px] w-[100px] flex-shrink-0 overflow-hidden rounded-md">
          <ProductImage src={history.imageUrl || ''} alt={history.productName} />
        </div>

        <div className="flex-1">
          <h3 className="font-bold mb-2">{history.productName}</h3>
          <div className="space-y-1">
            <div className="text-sm">
              <div>
                {history.productCode}（{history.color} / {history.size}）
              </div>
              <div>
                ¥{history.price.toLocaleString()} × {history.quantity}個
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 self-start">
          <CancelDialogContainer historyItem={history} />
        </div>
      </div>
    </div>
  );
}
