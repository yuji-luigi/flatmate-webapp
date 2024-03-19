import { Group, Text, useMantineTheme, rem, MantineStyleProp } from "@mantine/core";
import { IconUpload, IconX, IconFile } from "@tabler/icons-react";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { useCallback, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormType } from "../../../types/general/data/data-table/form-field-type/base-form-type";

type Props = Partial<DropzoneProps> & {
  form: UseFormReturnType<any>;
  formField: Partial<BaseFormType>;
  style?: MantineStyleProp;
};
type FileWithPreview = File & { preview: string };

export function DropzoneMantine(props: Props) {
  const theme = useMantineTheme();
  const { formField } = props;
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const handleDrop = useCallback((acceptedFiles: Array<File>) => {
    if (!formField.name) {
      throw new Error("formField.name is required");
    }
    const _files = acceptedFiles;

    // Directly check if _files type is an image
    // if (_files && _files.type.startsWith('image/')) {
    //   const img = new Image();
    //   img.src = URL.createObjectURL(_files);
    //   // Wait for the image to load
    //   img.onload = function () {
    //     if (!formField.name) {
    //       throw new Error('formField.name is required');
    //     }
    //     const newFile = Object.assign(_files, {
    //       preview: URL.createObjectURL(_files),
    //       field: _files.name,
    //     });
    //     setFiles(newFile);
    //     props.form.setFieldValue(formField.name, newFile);
    //   };
    // } else {
    // Handle non-image _files (e.g., PDFs)
    const newFiles = _files.map<FileWithPreview>((file) =>
      Object.assign(file, {
        preview: "", // No preview for non-image files
        field: file.name,
      })
    );
    setFiles(newFiles);
    props.form.setFieldValue(formField.name, newFiles);
    // }
  }, []);

  return (
    // <Box style={style}>
    <Dropzone
      // style={{
      //   display: 'flex',
      //   maxHeight: rem(22),
      // }}
      onDrop={handleDrop}
      onReject={(filesArg) => console.log("rejected files", filesArg)}
      maxSize={3 * 1024 ** 2}
      // accept={IMAGE_MIME_TYPE}
      {...props}
    >
      {/* {file && file.type.startsWith('image/') ? (
        <MantineImage src={file.preview} />
      ) : file ? ( */}

      {files.length ? (
        files.map((file) => (
          <div key={file.name}>
            <IconFile size="3.2rem" stroke={1.5} />
            <Text size="xl" inline>
              {file.name}
            </Text>
          </div>
        ))
      ) : (
        <Group justify="center" gap="sm" style={{ minHeight: rem(220), pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              // color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="3.2rem"
              stroke={1.5}
              // color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag file here or click to select file
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
    // </Box>
  );
}
