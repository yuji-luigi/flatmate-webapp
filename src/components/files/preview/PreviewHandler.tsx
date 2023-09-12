import React from 'react';
import { UploadModel } from '../../../types/models/upload-model';
import { Box, Button, Stack, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';

type Props = {
  file: UploadModel;
  enableLink?: boolean;
};
export const PreviewHandler = (props: Props) => {
  const { file, enableLink } = props;
  const fileExt = file.extension;
  let preview = (
    <Button component={Link} href={file.url} target="_blank" size="md">
      {file.originalFileName}-{intlDateFormat(file.createdAt)}
    </Button>
  );
  const tooltip = (
    <>
      <Box>{file.originalFileName}</Box>
      <Box sx={{ textAlign: 'right' }}>{intlDateFormat(file.createdAt)}</Box>
    </>
  );
  switch (fileExt) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      preview = <img src={file.url} alt={file.originalFileName} width="100" height="100" />;

    case 'pdf':
      preview = (
        <iframe
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
          }}
          src={file.url}
          width="100"
          height="100"
        ></iframe>
      );
      break;

    case 'mp3':
      preview = <audio controls src={file.url}></audio>;
      break;

    case 'mp4':
      preview = (
        <video controls width="100" height="100">
          <source src={file.url} type="video/mp4"></source>
        </video>
      );
      break;

    default:
      preview = <>not defined for: "{fileExt}"</>;
  }
  // return preview;
  if (enableLink) {
    preview = (
      <Stack spacing={0}>
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
