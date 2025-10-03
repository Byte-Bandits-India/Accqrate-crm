"use client";

import React, { useContext, ButtonHTMLAttributes, VideoHTMLAttributes } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";
import Image, { ImageProps } from "next/image";

// TYPES
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number | string;
  height?: number | string;
}

interface CustomImageProps extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  src: string;
  alt: string;
  width?: string; 
  height?: string;
  className?: string;
}

interface CustomVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
}

interface ParagraphProps {
  children: React.ReactNode;
  lines?: number;
}

// DEFAULT EXPORT (MAIN COMPONENT)
export default function CustomButton({
  children,
  width = 160,
  height = 44,
  ...props
}: CustomButtonProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  }

  return <button {...props}>{children}</button>;
}

// NAMED EXPORT: CustomImage
export function CustomImage({ src, alt, width, height, className, ...rest }: CustomImageProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <Skeleton
        height={height || "200px"}
        width={width || "100%"}
        style={{ margin: "8px 0" }}
      />
    );
  }

  return <Image src={src} alt={alt} width={width || 300} height={height || 200} className={className} {...rest} />;
}

// NAMED EXPORT: CustomVideo
export function CustomVideo({
  width = "100%",
  height = 300,
  className,
  ...props
}: CustomVideoProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  }

  return <video {...props} className={className} />;
}

// NAMED EXPORT: Paragraph
export function Paragraph({ children, lines = 3 }: ParagraphProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <div>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            height="20px"
            width={`${90 - i * 10}%`}
            style={{ marginBottom: "8px" }}
          />
        ))}
      </div>
    );
  }

  return <p>{children}</p>;
}
