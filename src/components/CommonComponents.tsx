"use client";

import React, { useContext, ButtonHTMLAttributes, VideoHTMLAttributes } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Image, { ImageProps } from "next/image";

// ========================
// TYPES
// ========================
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

interface SkeletonProps {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties; // <-- added style
}

// ========================
// HELPER
// ========================
const formatDimension = (dim: number | string | undefined, defaultVal: string): string => {
  if (dim === undefined) return defaultVal;
  if (typeof dim === "number") return `${dim}px`;
  return dim;
};

// ========================
// SKELETON COMPONENT
// ========================
const Skeleton = ({ height, width, borderRadius, className, style }: SkeletonProps) => {
  return (
    <div
      style={{
        height,
        width,
        borderRadius,
        backgroundColor: "#e0e0e0",
        ...style,
      }}
      className={className}
    />
  );
};

// ========================
// MAIN COMPONENTS
// ========================
export default function CustomButton({
  children,
  width = 160,
  height = 44,
  ...props
}: CustomButtonProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <Skeleton
        height={formatDimension(height, "44px")}
        width={formatDimension(width, "160px")}
        style={{ margin: "8px 0" }}
      />
    );
  }

  return <button {...props}>{children}</button>;
}

export function CustomImage({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: CustomImageProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <Skeleton
        height={formatDimension(height, "200px")}
        width={formatDimension(width, "100%")}
        style={{ margin: "8px 0" }}
      />
    );
  }

  // Ensure width and height are numbers for Next.js Image
  const imageWidth = typeof width === "string" ? parseInt(width, 10) || 300 : width || 300;
  const imageHeight = typeof height === "string" ? parseInt(height, 10) || 200 : height || 200;

  return <Image src={src} alt={alt} width={imageWidth} height={imageHeight} className={className} {...rest} />;
}

export function CustomVideo({
  width = "100%",
  height = 300,
  className,
  ...props
}: CustomVideoProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <Skeleton
        height={formatDimension(height, "300px")}
        width={formatDimension(width, "100%")}
        style={{ margin: "8px 0" }}
      />
    );
  }

  return <video {...props} className={className} />;
}

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
