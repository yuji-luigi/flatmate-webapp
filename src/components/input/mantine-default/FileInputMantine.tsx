import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Image as MantineImage,
  Box,
  Sx,
  FileInput,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconFile } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useCallback, useState } from 'react';
import { PATH_IMAGE } from '../../../lib/image-paths';
import { UseFormReturnType } from '@mantine/form';
import { FormFieldInterface } from '../../../types/general/data/data-table/formField-types';

type Props = Partial<DropzoneProps> & {
  form: UseFormReturnType<any>;
  formField: Partial<FormFieldInterface>;
  sx?: Sx;
};
type FileWithPreview = File & { preview: string };

export function FileInputMantine(props: Props) {
  const theme = useMantineTheme();
  const { formField, sx } = props;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const handleDrop = useCallback((acceptedFiles: Array<File>) => {
    if (!formField.name) {
      throw new Error('formField.name is required');
    }
    const files = acceptedFiles;

    const newFiles = files.map<FileWithPreview>((file) =>
      Object.assign(file, {
        preview: '', // No preview for non-image files
        field: file.name,
      })
    );
    setFiles(newFiles);
    props.form.setFieldValue(formField.name, newFiles);
    // }
  }, []);
  return (
    <Box sx={sx}>
      <FileInput label={formField.label} />
    </Box>
  );
}
