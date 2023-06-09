import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoBannerProps {
  transparent?: boolean;
  src?: string;
  alt?: string;
  width?: number | null;
  height?: number | null;
  link?: string;
}

const LOGO_PATH = {
  black: '/images/flatmates_logo_banner_copy.jpeg',
  transparent: '/images/flatmates_logo_banner.png',
};

export function LogoBanner({
  transparent = false,
  src = '',
  alt = '',
  width = null,
  height = null,
  link,
}: LogoBannerProps) {
  const image = (
    <Image
      src={src || transparent ? LOGO_PATH.transparent : LOGO_PATH.black}
      alt={alt || 'flate mates logo'}
      width={width || 200}
      height={height || 50}
      priority
    />
  );
  // if there is a link, return the image wrapped in a link
  if (link) return <Link href={link}>{image}</Link>;
  // otherwise, return the image
  return image;
}
