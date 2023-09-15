import React from 'react';
import { Box, Button, Stack, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { UploadModel } from '../../../types/models/upload-model';
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
      break;
    case 'pdf':
      preview = (
        <iframe
          title="pdf"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
          }}
          src={file.url}
          width="100"
          height="100"
        />
      );
      break;

    case 'mp3':
      preview = (
        <audio controls src={file.url}>
          <track src="" kind="captions" label="english_captions" />
        </audio>
      );
      break;

    case 'mp4':
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
