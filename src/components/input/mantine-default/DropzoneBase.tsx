import { Group, Text, useMantineTheme, rem, MantineStyleProp } from "@mantine/core";
import { IconUpload, IconX, IconFile } from "@tabler/icons-react";
import { Dropzone, DropzoneProps } from "@mantine/dropzone";
import { useCallback, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { BaseFormType } from "../../../types/general/data/data-table/form-field-type/base-form-type";
import { useLocale } from "../../../../hooks/useLocale";

type Props = Partial<Omit<DropzoneProps, "onDrop">> & {
  style?: MantineStyleProp;
  onDropCallbackCallback?: (files: File[]) => void;
};
type FileWithPreview = File & { preview: string };

export function DropzoneBase(props: Props) {
  const { onDropCallbackCallback } = props;
  const { t } = useLocale();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const handleDrop = useCallback((acceptedFiles: Array<File>) => {
    const _files = acceptedFiles;
    const newFiles = _files.map<FileWithPreview>((file) =>
      Object.assign(file, {
        preview: "", // No preview for non-image files
        field: file.name,
      })
    );
    setFiles(newFiles);
    if (onDropCallbackCallback) {
      onDropCallbackCallback(acceptedFiles);
    }
  }, []);

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(filesArg) => console.log("rejected files", filesArg)}
      maxSize={3 * 1024 ** 2}
      {...props}
    >
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
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="3.2rem" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconFile size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              {t("Drag file here or click to select file")}
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              {t("Attach as many files as you like, each file should not exceed 5mb")}
            </Text>
          </div>
        </Group>
      )}
    </Dropzone>
    // </Box>
  );
}
