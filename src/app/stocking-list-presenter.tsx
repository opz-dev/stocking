import { Button } from "@/components/ui/button";
import { StockingItem } from "@/data/mock-data";
import { BarcodeIcon, Check } from "lucide-react";
import { ProductImage } from "./product-image";
import { PartialStockingDialog } from "./partial-stocking-dialog";
import { Card, CardContent } from "@/components/ui/card";

interface StockingListPresenterProps {
  items: StockingItem[];
}

export function StockingListPresenter({ items }: StockingListPresenterProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <StockingListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

interface StockingListItemProps {
  item: StockingItem;
}

export function StockingListItem({ item }: StockingListItemProps) {
  return (
    <Card>
      <CardContent className="grid grid-cols-[auto_1fr_auto] gap-4">
        <div className="relative h-[120px] w-[100px] flex-shrink-0 overflow-hidden rounded-md">
          <ProductImage src={item.imageUrl} alt={item.productName} />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold mb-2 text-lg">{item.productName}</h3>
          <div className="text-sm">
            <div className="flex items-center gap-1">
              <BarcodeIcon className="h-4 w-4" /> {item.janCode}
            </div>
            <div>
              {item.productCode}（{item.color} / {item.size}）
            </div>
          </div>

          <div className="flex-grow flex items-end text-lg">
            ¥{item.price.toLocaleString()} × {item.quantity}個
          </div>
        </div>

        <div className="flex flex-col gap-2 self-start">
          <PartialStockingDialog item={item} />
          <Button variant="outline">
            <Check className="h-4 w-4 mr-2" />
            一括
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
