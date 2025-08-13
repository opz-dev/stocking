"use client";

import NoImage from "./no-image.png";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src: string;
  alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
  const [error, setError] = useState(false);

  return error ? (
    <Image src={NoImage} alt={alt} fill style={{ objectFit: "cover" }} />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={750}
      onError={() => setError(true)}
      height={950}
      style={{ objectFit: "cover" }}
    />
  );
}
