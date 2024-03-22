import Image from "next/image";
import { PATH_IMAGE } from "../../lib/image-paths";

type Props = {
  style?: React.CSSProperties;
  fileName: string;
  size?: number | "sm" | "md" | "lg";
};

const src: Record<string, string> = {
  jpg: PATH_IMAGE.FILES.jpg,
  jpeg: PATH_IMAGE.FILES.jpg,
  png: PATH_IMAGE.FILES.image,
  pdf: PATH_IMAGE.FILES.pdf2,
  doc: PATH_IMAGE.FILES.png,
  xls: PATH_IMAGE.FILES.xls,
  xlsx: PATH_IMAGE.FILES.xls,
  txt: PATH_IMAGE.FILES.txt,
};

const SIZE = {
  sm: 20,
  md: 30,
  lg: 40,
};

export const FileIconHandler = (props: Props) => {
  const { fileName, size, style } = props;
  const extension = fileName?.split(".").pop();
  const imagePath = src[extension || ""] || src.doc;
  const _size = typeof size === "number" ? size : SIZE[size || "md"];

  return <Image style={style} src={imagePath} width={_size} height={_size} alt={fileName} />;
};
