"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StockingItem } from "@/data/mock-data";
import { Package } from "lucide-react";
import { useState } from "react";
import { partialStockingItem } from "@/app/actions/stocking";

interface PartialStockingDialogProps {
  item: StockingItem;
}

export function PartialStockingDialog({ item }: PartialStockingDialogProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    const qty = parseInt(quantity);
    if (qty > 0 && qty <= item.quantity) {
      setIsLoading(true);
      try {
        await partialStockingItem(item.id, qty);
        setQuantity("");
        setOpen(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Package className="h-4 w-4 mr-2" />
          品出し
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>部分品出し</DialogTitle>
          <DialogDescription>
            品出しする個数を入力してください
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="text-sm font-medium">{item.productName}</div>
            <div className="text-sm text-muted-foreground">
              {item.productCode}（{item.color} / {item.size}）
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              個数
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="col-span-3"
              placeholder={`最大: ${item.quantity}個`}
              min="1"
              max={item.quantity}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            キャンセル
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isLoading || !quantity || parseInt(quantity) <= 0 || parseInt(quantity) > item.quantity}
          >
            {isLoading ? "処理中..." : "確定"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
