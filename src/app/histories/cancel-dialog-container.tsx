'use client';

import { useState } from 'react';
import { StockingHistory } from '@/data/mock-data';
import { cancelStockingHistory } from '@/app/actions/stocking';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';

interface CancelDialogContainerProps {
  historyItem: StockingHistory;
}

export function CancelDialogContainer({ historyItem }: CancelDialogContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleCancel = async () => {
    setIsPending(true);
    try {
      await cancelStockingHistory(historyItem.id);
      setIsOpen(false);
    } catch (error) {
      console.error('取り消しに失敗しました:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Undo2 className="h-4 w-4 mr-2" />
          取り消し
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>取り消しの確認</DialogTitle>
          <DialogDescription>
            以下の履歴を取り消してよろしいですか？
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <p className="font-semibold">{historyItem.productName}</p>
          <p className="text-sm text-muted-foreground">
            {historyItem.productCode}（{historyItem.color} / {historyItem.size}）
          </p>
          <p className="text-sm text-muted-foreground">
            ¥{historyItem.price.toLocaleString()} × {historyItem.quantity}個
          </p>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            キャンセル
          </Button>
          <Button 
            onClick={handleCancel}
            disabled={isPending}
          >
            {isPending ? '取り消し中...' : '取り消し'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}