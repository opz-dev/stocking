import Quagga, { QuaggaJSResultCallbackFunction } from "@ericblade/quagga2";
import { useEffect, useState, useRef, type RefObject } from "react";

type UseBarcodeScanProps = {
  videoRef: RefObject<HTMLDivElement | null>;
  camera: MediaDeviceInfo | undefined;
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
};

// スキャンした値が同じかチェックする回数
// この回数連続して同じ値だった場合のみ採用する
const CHECK_COUNT = 3;

// 読み込み精度の問題で正しくない値を読み込んでしまう可能性があるので、
// 同じ値が複数回読み込まれた場合のみ採用する
function countConsecutiveSameValues(history: string[]): number {
  if (history.length === 0) return 0;

  const lastValue = history[history.length - 1];
  let count = 0;

  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i] === lastValue) {
      count++;
    } else {
      break;
    }
  }

  return count;
}

export function useBarcodeScan({
  videoRef,
  camera,
  onScan,
  onError,
}: UseBarcodeScanProps) {
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const lastScanTimeRef = useRef<number>(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current || !camera) return;

    // 同じカメラで既に初期化済みの場合はスキップ
    if (isInitializedRef.current) return;

    const handleDetected: QuaggaJSResultCallbackFunction = (result) => {
      if (result.codeResult?.code) {
        const detectedCode = result.codeResult.code;
        const currentTime = Date.now();

        // 不正な値の状態で連続で読み取れてしまうのを防ぐためにスキャンのインターバルをいれる
        if (currentTime - lastScanTimeRef.current < 300) {
          return;
        }

        lastScanTimeRef.current = currentTime;

        setScanHistory((prev) => [...prev, detectedCode]);
      }
    };

    // DOM 要素が準備されるのを待つ
    const timeoutId = setTimeout(async () => {
      if (!videoRef.current) return;

      try {
        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: videoRef.current,
              constraints: {
                width: 1280,
                height: 720,
                deviceId: camera.deviceId,
                facingMode: "environment",
              },
            },
            decoder: {
              readers: ["ean_reader"],
            },
          },
          (error: Error | null) => {
            if (!error) {
              isInitializedRef.current = true;
              setScanHistory([]);

              // イベントハンドラーを登録してQuaggaを開始
              Quagga.onDetected(handleDetected);
              Quagga.start();
              return;
            }

            console.error("Quagga init error:", error);
            onError?.(
              new Error(error.message || "Failed to initialize scanner"),
            );
          },
        );
      } catch (error) {
        console.error("Failed to initialize Quagga:", error);
        onError?.(new Error("Failed to initialize scanner"));
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      Quagga.offDetected(handleDetected);
      Quagga.stop();
      isInitializedRef.current = false;
    };
  }, [videoRef, camera, onError, onScan]);

  useEffect(() => {
    const count = countConsecutiveSameValues(scanHistory);
    if (count >= CHECK_COUNT) {
      onScan(scanHistory[scanHistory.length - 1]);
      Quagga.stop();
    }
  }, [scanHistory, onScan]);

  return {
    isScanning: isInitializedRef.current,
    scanProgress: countConsecutiveSameValues(scanHistory),
    currentValue:
      scanHistory.length > 0 ? scanHistory[scanHistory.length - 1] : null,
  };
}
