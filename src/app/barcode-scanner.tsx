"use client";

import { useRef } from "react";

import { useBarcodeScan } from "./use-barcode-scan";
import { useCamera } from "./use-camera";
import { useCameras } from "./use-cameras";

type BarcodeScannerProps = {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
};

export function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const { cameras } = useCameras();
  const { camera, switchCamera } = useCamera(cameras);
  const { isScanning, scanProgress, currentValue } = useBarcodeScan({
    videoRef,
    camera,
    onScan,
    onError,
  });

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div
        ref={videoRef}
        className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-900 [&_video]:!w-full [&_video]:!h-full [&_video]:!object-cover [&_canvas]:!absolute [&_canvas]:!top-0 [&_canvas]:!left-0 [&_canvas]:!w-full [&_canvas]:!h-full"
      />
      {isScanning && (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-white rounded-lg w-64 h-32 opacity-50" />
          </div>

          {/* 読み取り進捗表示 */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg pointer-events-none">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index < scanProgress
                      ? "bg-green-400 scale-125"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs mt-1 text-center">
              {scanProgress === 0 ? "スキャン中..." : `検出: ${scanProgress}/3`}
            </p>
          </div>

          {/* 現在の読み取り値表示 */}
          {currentValue && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded text-sm pointer-events-none">
              {currentValue}
            </div>
          )}
        </>
      )}
      {cameras.length > 1 && (
        <button
          onClick={switchCamera}
          className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
