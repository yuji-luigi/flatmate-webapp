import { Group, Text, useMantineTheme, rem, Image as MantineImage } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback, useState } from 'react';
import { PATH_IMAGE } from '../../../lib/image-paths';
import { UseFormReturnType } from '@mantine/form';

export function DropzoneMantine(props: Partial<DropzoneProps> & { form: UseFormReturnType<any> }) {
  const theme = useMantineTheme();
  const [file, setFile] = useState<(File & { preview: string }) | null>(null);
  const handleDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      // Wait for the image to load
      img.onload = function () {
        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
          field: file.name,
        });
        setFile(newFile);
        props.form.setFieldValue('invoice', newFile);
      };
    }
  }, []);
  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      {file ? (
        <MantineImage src={file.preview} />
      ) : (
        <Group
          position="center"
          spacing="sm"
          style={{ minHeight: rem(220), pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
  );
}
