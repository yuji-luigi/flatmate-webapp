import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, useMantineColorScheme } from "@mantine/core";

interface LogoBannerProps {
  transparent?: boolean;
  src?: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
  link?: string;
  className?: string;
}

const LOGO_PATH = {
  black: "/images/logos/logo_banner_black.png",
  transparent: "/images/logos/logo_banner_transparent.png",
};

export function LogoBanner({
  transparent = false,
  src = "",
  alt = "",
  width = null,
  height = null,
  link,
  className,
}: LogoBannerProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  let _src = isDark ? LOGO_PATH.transparent : LOGO_PATH.black;
  _src = src || _src;
  const image = (
    <Image
      // src={LOGO_PATH.black}
      src={_src}
      alt={alt || "flate mates logo"}
      width={width || 200}
      height={height || 50}
      priority
    />
  );
  // if there is a link, return the image wrapped in a link
  if (link) {
    return (
      <Link className={className} href={link}>
        {image}
      </Link>
    );
  }
  // otherwise, return the image
  return <Box className={className}>{image}</Box>;
}
