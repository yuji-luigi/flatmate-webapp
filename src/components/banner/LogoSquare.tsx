import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, useMantineColorScheme } from "@mantine/core";

interface LogoSquareProps {
  transparent?: boolean;
  src?: string;
  alt?: string;
  size?: number;
  link?: string;
  className?: string;
}

const LOGO_PATH = {
  black: "/images/logos/logo.png",
  transparent: "/images/logos/logo.png",
};

export function LogoSquare({
  transparent = false,
  src = "",
  alt = "",
  size = 50,
  link,
  className,
}: LogoSquareProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  let _src = isDark ? LOGO_PATH.transparent : LOGO_PATH.black;
  _src = src || _src;
  const image = (
    <Image
      // src={LOGO_PATH.black}
      src={_src}
      alt={alt || "flate mates logo"}
      width={size}
      height={size}
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
  if (className) return <Box className={className}>{image}</Box>;
  return image;
}
