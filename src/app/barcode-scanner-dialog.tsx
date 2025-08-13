"use client";

import { useState } from "react";
import { ScanBarcode } from "lucide-react";
import { BarcodeScanner } from "./barcode-scanner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type BarcodeScannerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan: (result: string) => void;
};

export function BarcodeScannerDialog({
  open,
  onOpenChange,
  onScan,
}: BarcodeScannerDialogProps) {
  const [error, setError] = useState<string>("");
  const [permissionDenied, setPermissionDenied] = useState(false);

  const handleScan = (result: string) => {
    onScan(result);
    onOpenChange(false);
    setError("");
  };

  const handleError = (error: Error) => {
    if (error.name === "NotAllowedError") {
      setPermissionDenied(true);
    } else {
      setError(error.message);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setError("");
    setPermissionDenied(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>バーコードスキャン</DialogTitle>
          <DialogDescription>
            カメラで商品のバーコードを読み取ってください
          </DialogDescription>
        </DialogHeader>

        {permissionDenied ? (
          <Alert variant="destructive">
            <AlertTitle>カメラアクセスが拒否されました</AlertTitle>
            <AlertDescription>
              バーコードスキャンを使用するには、ブラウザの設定でカメラへのアクセスを許可してください。
            </AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="mt-4">
            <BarcodeScanner onScan={handleScan} onError={handleError} />
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleClose}>
            キャンセル
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type BarcodeScannerButtonProps = {
  onScan: (result: string) => void;
  className?: string;
};

export function BarcodeScannerButton({
  onScan,
  className,
}: BarcodeScannerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className={className}
      >
        <ScanBarcode className="h-4 w-4" />
      </Button>
      <BarcodeScannerDialog
        open={open}
        onOpenChange={setOpen}
        onScan={onScan}
      />
    </>
  );
}
