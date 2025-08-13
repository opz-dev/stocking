'use client';

import { useState } from 'react';
import { StockingHistory } from '@/data/mock-data';
import { restoreStockingItem } from '@/app/actions/stocking';
import { useTransition } from 'react';
import { RotateCcw } from 'lucide-react';

interface RestoreDialogContainerProps {
  historyItem: StockingHistory;
}

export function RestoreDialogContainer({ historyItem }: RestoreDialogContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(historyItem.quantity.toString());
  const [isPending, startTransition] = useTransition();

  const handleRestore = () => {
    const qty = parseInt(quantity);
    if (qty > 0) {
      startTransition(async () => {
        await restoreStockingItem(historyItem.id, qty);
        setIsOpen(false);
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        <RotateCcw className="h-4 w-4" />
        再入荷
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">再入荷</h2>
            <p className="mb-4">{historyItem.productName}を再入荷リストに追加します。</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">数量</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                min="1"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                disabled={isPending}
              >
                キャンセル
              </button>
              <button
                onClick={handleRestore}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                disabled={isPending}
              >
                再入荷
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}