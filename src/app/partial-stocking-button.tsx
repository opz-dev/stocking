"use client";

import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { StockingItem } from "@/data/mock-data";
import { PartialStockingDialog } from "./partial-stocking-dialog";
import { useState } from "react";
import { partialStockingItem } from "@/app/actions/stocking";

interface PartialStockingButtonProps {
  item: StockingItem;
}

export function PartialStockingButton({ item }: PartialStockingButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePartialStocking = async (quantity: number) => {
    await partialStockingItem(item.id, quantity);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setDialogOpen(true)}
      >
        <Package className="h-4 w-4 mr-2" />
        部分品出し
      </Button>

      <PartialStockingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={item}
        onConfirm={handlePartialStocking}
      />
    </>
  );
}
