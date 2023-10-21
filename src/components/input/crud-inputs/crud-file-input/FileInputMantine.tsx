import { FileInput, Group, Tooltip, ActionIcon, Stack, MantineStyleProp } from '@mantine/core';
import { DropzoneProps } from '@mantine/dropzone';
import { useCallback, useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { UploadFormFieldType } from '../../../../types/general/data/data-table/formField-types';
import { FileIconHandler } from '../../../files/FileIconHandler';
import { Icons } from '../../../../data/icons/icons';
import { IconValueComponent } from './components/IconValueComponent';
import { FileWithPreview } from '../../../../types/files/file-types';

type Props = Partial<DropzoneProps> & {
  form: UseFormReturnType<any>;
  formField: UploadFormFieldType;
  style?: MantineStyleProp;
  fileFolder?: string;
};

export function FileInputMantine(props: Props) {
  const { formField, style, fileFolder } = props;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const handleFileChosen = useCallback((acceptedFiles: Array<File> | File | null) => {
    if (!acceptedFiles) return;
    if (!formField.name) {
      throw new Error('formField.name is required');
    }

    const _files = !Array.isArray(acceptedFiles) ? [acceptedFiles] : acceptedFiles;

    const newFiles = _files.map<FileWithPreview>((file) =>
      Object.assign(file, {
        preview: '', // No preview for non-image files
        field: fileFolder || file.name,
      })
    );
    setFiles(newFiles);
    props.form.setFieldValue(formField.name, newFiles);
    // }
  }, []);

  const handleFileClicked = (file: FileWithPreview) => {
    const newFiles = files.filter((f) => f.name !== file.name);
    setFiles(newFiles);
    props.form.setFieldValue(formField.name, newFiles);
  };
  return (
    <Stack style={{ position: 'relative', marginBottom: 16, ...style }}>
      <FileInput
        valueComponent={IconValueComponent}
        multiple={formField.multi}
        onChange={handleFileChosen}
        value={files}
        leftSection={<Icons.image />}
        placeholder={formField.label}
      />
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
    </Stack>
  );
}
