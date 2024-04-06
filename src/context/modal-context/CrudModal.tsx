import { useMediaQuery } from "@mantine/hooks";
import { Button, Stack } from "@mantine/core";
import { showNotification, notifications } from "@mantine/notifications";
import { FormEvent, useMemo, useState } from "react";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useCustomModalContext } from "./_ModalContext";
import { getDefaultValues } from "../../utils/getDefaultValues";
import { hasMedia } from "../../redux/features/crudAsyncThunks";
import { uploadFileAndGetModelId, extractUploadingMedia } from "../../utils/upload-helper";
import CreationToolBar from "../../components/input/CreationToolBar";
import FormFields from "../../components/input/FormFields";
import { UseFormReturnTypeCustom } from "../../components/input/input_interfaces/useForm_interface";
import { getEntityFromUrl, sleep } from "../../utils/helpers/helper-functions";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";
import { CrudModalData } from "../../types/modal/modal-context-type";
import classes from "./CrudModal.module.css";
import { Entity } from "../../types/redux/CrudSliceInterfaces";

type CrudModalProps = {
  modalData: CrudModalData;
};

export function CrudModal(props: CrudModalProps) {
  const { modalData } = props;
  // TODO: see if query.entity works. or pass as a prop
  const entity = "undefined";
  const { query } = useRouter();

  const isMobile = useMediaQuery("(max-width: 600px)");
  const { isOpenModal: opened, closeModal: close } = useCustomModalContext();
  const { updateCrudDocument } = useCrudSliceStore();
  const [submitting, setSubmitting] = useState(false);

  // type guard
  // if (modalData.type !== 'crud') return null;

  const initialValues = useMemo(
    () => getDefaultValues(modalData.formFields, modalData.crudDocument),
    [modalData.crudDocument]
  );
  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: "submit",
      message: "Sending data to the server.",
      autoClose: false,
    });
    setSubmitting(true);

    // // const data = media ? extractUploadingMedia(media) : {};

    const reqBody: Record<string, any> = {
      ...form.values,
      // ...data,

      media: undefined,
    };
    const media = structuredClone(form.values.media);

    if (media && hasMedia(media)) {
      try {
        throw new Error(
          "Not implemented. entity string has been set to undefined. new logic required."
        );
        const uploadIdData = await uploadFileAndGetModelId(extractUploadingMedia(media), entity);
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const key in uploadIdData) {
          reqBody[key] = [...reqBody[key], ...uploadIdData[key]];
        }
      } catch (error) {
        console.log(error);
        notifications.hide("submit");
        setSubmitting(false);
        return;
      }
    }

    /** Modify selected document */
    if (modalData.crudDocument._id) {
      updateCrudDocument({
        entity,
        updateData: reqBody,
        documentId: modalData.crudDocument._id,
        parentId: query.parentId as string,
      });
    }

    form.reset();
    await sleep(1000);
    notifications.hide("submit");
    notifications.show({
      title: "Success",
      message: "Data sent to the server.",
      color: "green",
      autoClose: 1500,
    });
    console.log("form.values", form.values);
    close();
  };
  if (!opened) return null;
  return (
    <Stack className={classes.modalContent}>
      <form className={classes.form} onSubmit={onSubmit}>
        {modalData.formFields?.map((formField) => (
          <FormFields
            // initialValues={initialValues}
            form={form}
            formField={formField}
            key={formField.id}
          />
        ))}
        <CreationToolBar
          formFields={modalData.formFields}
          form={form}
          entity={entity}
          submitButton={
            <>
              <Button fullWidth type="submit" mt="xl" size="md">
                Submit{" "}
              </Button>
              <Button
                fullWidth
                /* disabled={submitting}  */ mt={0}
                color="gray.6"
                onClick={close}
                size="md"
              >
                Cancel{" "}
              </Button>
            </>
          }
        />
      </form>
    </Stack>
  );
}
