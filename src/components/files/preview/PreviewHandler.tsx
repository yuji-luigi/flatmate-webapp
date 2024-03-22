import React, { useState } from "react";
import { Box, Button, Stack, Tooltip } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { UploadModel } from "../../../types/models/upload-model";
import { intlDateFormat } from "../../../utils/helpers/date-formatters";
import { PATH_IMAGE } from "../../../lib/image-paths";
import { PDFPreview } from "./PDFPrevieww";

type Props = {
  file: UploadModel;
  enableLink?: boolean;
  width?: number;
  height?: number;
};
export const PreviewHandler = (props: Props) => {
  const { file, enableLink, width = 100, height = 100 } = props;
  const fileExt = file.extension;
  const [hasError, setHasError] = useState(false);

  let preview = (
    <Button component={Link} href={file.url} target="_blank" size="md">
      {file.originalFileName}-{intlDateFormat(file.createdAt)}
    </Button>
  );
  const tooltip = (
    <>
      <Box>{file.originalFileName}</Box>
      <Box style={{ textAlign: "right" }}>{intlDateFormat(file.createdAt)}</Box>
    </>
  );
  switch (fileExt) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      preview = hasError ? (
        <Image
          src={PATH_IMAGE.notFound}
          alt={file.originalFileName}
          width={width}
          height={height}
        />
      ) : (
        <Image
          src={file.url}
          alt={file.originalFileName}
          width={100}
          height={100}
          onError={() => setHasError(true)}
        />
      );
      break;
    case "pdf":
      preview = <PDFPreview file={file} />;

      break;

    case "mp3":
      preview = (
        <audio controls src={file.url}>
          <track src="" kind="captions" label="english_captions" />
        </audio>
      );
      break;

    case "mp4":
      preview = (
        <video controls width="100" height="100">
          <source src={file.url} type="video/mp4" />
          <track src="" kind="captions" label="english_captions" />
        </video>
      );
      break;

    default:
      preview = <>not defined for: &quot;{fileExt}&quot;</>;
  }
  console.log({ enableLink });
  // return preview;
  if (enableLink) {
    preview = (
      <Stack gap={0}>
        {preview}
        <Link target="_blank" href={file.url}>
          download
        </Link>
      </Stack>
    );
  }
  return preview;
  return <Tooltip label={tooltip}>{preview}</Tooltip>;
};
