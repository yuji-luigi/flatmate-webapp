import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Modal, Group, Button, Stack, Box, Sx, useMantineTheme, createStyles } from '@mantine/core';
import { showNotification, notifications } from '@mantine/notifications';
import { FormEvent, useMemo, useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useCustomModalContext } from './_ModalContext';
import { getDefaultValues } from '../../utils/getDefaultValues';
import { hasMedia } from '../../redux/features/crudAsyncThunks';
import { uploadFileAndGetModelId, extractUploadingMedia } from '../../utils/upload-helper';
import CreationToolBar from '../../components/input/CreationToolBar';
import FormFields from '../../components/input/FormFields';
import { UseFormReturnTypeCustom } from '../../components/input/input_interfaces/useForm_interface';
import { getEntityFromUrl, sleep } from '../../utils/helpers/helper-functions';
import { Sections } from '../../types/general/data/sections-type';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { UploadModel } from '../../types/models/upload-model';
import {
  BaseModalParams,
  CrudModalParams,
  OpenConfirmModalParams,
} from '../../types/modal/modal-context-type';

const useStyles = createStyles(() => ({
  modal: {
    overflow: 'scroll',
    zIndex: 1000,
  },
  modalContent: {
    zIndex: 10,
    paddingInline: 48,
  },
  form: {
    marginTop: 50,
    height: '100vh',
  },
}));

export function CrudModal() {
  const { classes } = useStyles();
  const entity = getEntityFromUrl() as Sections;
  const { query } = useRouter();

  const isMobile = useMediaQuery('(max-width: 600px)');
  const {
    isOpenModal: opened,
    closeModal: close,
    modals,
  }: CrudModalParams = useCustomModalContext();
  const { updateCrudDocument } = useCrudSliceStore();
  const [submitting, setSubmitting] = useState(false);
  const handleConfirm = (data: any) => {
    modals.onConfirm(data);
    close();
  };

  // type guard
  // if (modals.type !== 'crud') return null;

  const initialValues = useMemo(
    () => getDefaultValues(modals.formFields, modals.crudDocument),
    [modals.crudDocument]
  );
  const form = useForm({
    initialValues,
    // TODO: Make Validate function and set by string value from formField.
    // validate: 'email' uses this email validator.
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    showNotification({
      id: 'submit',
      message: 'Sending data to the server.',
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
        const uploadIdData = await uploadFileAndGetModelId(extractUploadingMedia(media), entity);
        // eslint-disable-next-line guard-for-in, no-restricted-syntax
        for (const key in uploadIdData) {
          reqBody[key] = [...reqBody[key], ...uploadIdData[key]];
        }
      } catch (error) {
        console.log(error);
        notifications.hide('submit');
        setSubmitting(false);
        return;
      }
    }

    /** Modify selected document */
    if (modals.crudDocument._id) {
      updateCrudDocument({
        entity,
        updateData: reqBody,
        documentId: modals.crudDocument._id,
        parentId: query.parentId as string,
      });
    }

    form.reset();
    await sleep(1000);
    notifications.hide('submit');
    notifications.show({
      title: 'Success',
      message: 'Data sent to the server.',
      color: 'green',
      autoClose: 1500,
    });
    console.log('form.values', form.values);
    close();
  };
  if (!opened) return null;
  return (
    <>
      <Modal
        className={classes.modal}
        opened={opened}
        centered
        onClose={close}
        title={modals.title}
        size="lg"
        fullScreen={isMobile}
      >
        <Stack className={classes.modalContent}>
          <form className={classes.form} onSubmit={onSubmit}>
            {modals.formFields?.map((formField) => (
              <FormFields
                // initialValues={initialValues}
                form={form}
                formField={formField}
                key={formField.id}
              />
            ))}
            <CreationToolBar
              formFields={modals.formFields}
              form={form}
              entity={entity}
              submitButton={
                <>
                  <Button fullWidth type="submit" mt="xl" size="md">
                    Submit{' '}
                  </Button>
                  <Button
                    fullWidth
                    /* disabled={submitting}  */ mt={0}
                    color="gray.6"
                    onClick={close}
                    size="md"
                  >
                    Cancel{' '}
                  </Button>
                </>
              }
            />
          </form>
        </Stack>
      </Modal>
    </>
  );
}
