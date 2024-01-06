import { Box, Group, Tooltip } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileImage } from './FileImage';
import { PATH_IMAGE } from '../../lib/image-paths';
import { LinkedImage } from '../image/LinkedImage';
import { UploadModel } from '../../types/models/upload-model';

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
          <FileImage href={attachment.url} key={attachment._id} attachment={attachment} />
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
