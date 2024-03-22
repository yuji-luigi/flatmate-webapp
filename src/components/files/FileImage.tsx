import { Box, Tooltip } from "@mantine/core";
import React from "react";

import { PATH_IMAGE } from "../../lib/image-paths";
import { UploadModel } from "../../types/models/upload-model";
import { LinkedImage } from "../image/LinkedImage";

const ICON_INDEXES = {
  // Image extensions
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  bmp: "image",
  webp: "image",
  // Document extensions
  pdf: "pdf",
  doc: "doc",
  docx: "doc",
  xls: "xls",
  xlsx: "xls",
  ppt: "doc",
  pptx: "doc",
  // Video extensions
  mp4: "doc",
  mov: "doc",
  avi: "doc",
  // Audio extensions
  mp3: "doc",
  wav: "doc",
} as const;

export function getFileIcon(uploadModel: UploadModel) {
  const INDEX = ICON_INDEXES[uploadModel.extension];

  return PATH_IMAGE.FILES[INDEX];
}

export function FileImage({
  attachment,
  withTooltip,
  href,
}: {
  href: string;
  attachment: UploadModel;
  withTooltip?: boolean;
}) {
  return (
    <Box>
      <Tooltip hidden={!!withTooltip} key={attachment._id} label={attachment.originalFileName}>
        <LinkedImage href={href} src={getFileIcon(attachment)} size={30} />
      </Tooltip>
    </Box>
  );
}
