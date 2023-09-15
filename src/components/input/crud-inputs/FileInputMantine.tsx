import { Box, Sx, FileInput, Group, Tooltip, ActionIcon } from '@mantine/core';
import { DropzoneProps } from '@mantine/dropzone';
import { useCallback, useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { UploadFormFieldType } from '../../../types/general/data/data-table/formField-types';
import { FileIconHandler } from '../../files/FileIconHandler';

type Props = Partial<DropzoneProps> & {
  form: UseFormReturnType<any>;
  formField: UploadFormFieldType;
  sx?: Sx;
};
type FileWithPreview = File & { preview: string; field?: string };

export function FileInputMantine(props: Props) {
  const { formField, sx } = props;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const handleDrop = useCallback((acceptedFiles: Array<File> | File) => {
    if (!formField.name) {
      throw new Error('formField.name is required');
    }

    const _files = !Array.isArray(acceptedFiles) ? [acceptedFiles] : acceptedFiles;

    const newFiles = _files.map<FileWithPreview>((file) =>
      Object.assign(file, {
        preview: '', // No preview for non-image files
        field: file.name,
      })
    );
    setFiles(newFiles);
    props.form.setFieldValue(formField.name, newFiles);
    // }
  }, []);
  const handleFileClicked = (file: FileWithPreview) => {
    const newFiles = files.filter((f) => f.preview !== file.preview);
    setFiles(newFiles);
    props.form.setFieldValue(formField.name, newFiles);
  };
  return (
    <Box sx={sx}>
      <FileInput multiple={formField.multi} onChange={handleDrop} label={formField.label} />
      <Group>
        {!!files.length &&
          files.map((file) => (
            <Tooltip key={file.name} label={file.name}>
              <ActionIcon onClick={() => handleFileClicked(file)}>
                <FileIconHandler fileName={file.name} />
              </ActionIcon>
            </Tooltip>
          ))}
      </Group>
    </Box>
  );
}
