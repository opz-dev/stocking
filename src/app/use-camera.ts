import { useEffect, useState } from "react";

export function useCamera(cameras: MediaDeviceInfo[]) {
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  useEffect(() => {
    // バックカメラを優先的に選択
    const backCameraIndex = cameras.findIndex((device) =>
      device.label.toLowerCase().includes("back"),
    );
    if (backCameraIndex === -1) {
      return;
    }

    setCurrentCameraIndex(backCameraIndex);
  }, [cameras]);

  const switchCamera = () => {
    if (cameras.length <= 1) return;
    const nextIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIndex);
  };

  const camera = cameras[currentCameraIndex];

  return { camera, switchCamera };
}
