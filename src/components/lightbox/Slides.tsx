import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import image1 from "../public/images/image01.jpeg";
import image2 from "../public/images/image02.jpeg";
import image3 from "../public/images/image03.jpeg";
// ...

const images = [
  image1,
  image2,
  image3,
  // ...
];

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextImageUrl(src: string, size: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

const slides = images.map(({ src, width, height }) => ({
  width,
  height,
  src: nextImageUrl(src, width),
  srcSet: imageSizes
    .concat(...deviceSizes)
    .filter((size) => size <= width)
    .map((size) => ({
      src: nextImageUrl(src, size),
      width: size,
      height: Math.round((height / width) * size),
    })),
}));

// ...

{
  /* <Lightbox open={open} close={() => setOpen(false)} slides={slides} plugins={[Zoom]} />; */
}
