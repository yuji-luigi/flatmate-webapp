import { Box, Group, Tooltip } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PATH_IMAGE } from '../../lib/image-paths';
import { LinkedImage } from '../image/LinkedImage';
import { UploadModel } from '../../types/models/upload-model';

const ICON_INDEXES = {
  // Image extensions
  png: 'image',
  jpg: 'image',
  jpeg: 'image',
  gif: 'image',
  bmp: 'image',
  webp: 'image',
  // Document extensions
  pdf: 'pdf',
  doc: 'doc',
  docx: 'doc',
  xls: 'xls',
  xlsx: 'xls',
  ppt: 'doc',
  pptx: 'doc',
  // Video extensions
  mp4: 'doc',
  mov: 'doc',
  avi: 'doc',
  // Audio extensions
  mp3: 'doc',
  wav: 'doc',
} as const;

function getFileIcon(uploadModel: UploadModel) {
  const INDEX = ICON_INDEXES[uploadModel.extension];

  return PATH_IMAGE.FILES[INDEX];
}

const AttachmentsRow = ({
  attachments,
  withToolTip,
}: {
  attachments?: UploadModel[];
  withToolTip?: boolean;
}) => {
  return (
    <Group justify="right">
      <Group justify="right">
        {attachments?.map((attachment) => (
          <Tooltip key={attachment._id} label={attachment.originalFileName}>
            <Box>
              <LinkedImage href="#" src={getFileIcon(attachment)} size={30} />
            </Box>
          </Tooltip>
        ))}
        {/* <LinkedImage size={30} src={PATH_IMAGE.FILES.doc} href={PATH_IMAGE.FILES.doc} alt="doc" />
      <LinkedImage size={30} src={PATH_IMAGE.FILES.pdf1} href={PATH_IMAGE.FILES.pdf1} alt="pdf1" />
      <LinkedImage
        size={30}
        src={PATH_IMAGE.FILES.image}
        href={PATH_IMAGE.FILES.image}
        alt="image"
      />
      <LinkedImage size={30} src={PATH_IMAGE.FILES.jpg} href={PATH_IMAGE.FILES.jpg} alt="jpg" />
      <LinkedImage size={30} src={PATH_IMAGE.FILES.txt} href={PATH_IMAGE.FILES.txt} alt="txt" />
      <LinkedImage size={30} src={PATH_IMAGE.FILES.xls} href={PATH_IMAGE.FILES.xls} alt="xls" /> */}
      </Group>
    </Group>
  );
};

export default AttachmentsRow;
