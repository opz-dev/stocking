import { useEffect, useState } from "react";

export function useCameras() {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );
        setCameras(videoDevices);
      } catch (error) {
        console.error("Error getting cameras:", error);
      }
    };

    getCameras();
  }, []);

  return { cameras };
}
