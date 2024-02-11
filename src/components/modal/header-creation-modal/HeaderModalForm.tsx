/* eslint-disable react/jsx-pascal-case */
import { Box, Button, LoadingOverlay, Text } from '@mantine/core';

import { FormEvent, useMemo, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import FormFields from '../../input/FormFields';
import formFields from '../../../../json/dataTable/formfields';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { getDefaultValues } from '../../../utils/getDefaultValues';
import CreationToolBar from '../../input/CreationToolBar';
import { UseFormReturnTypeCustom } from '../../input/input_interfaces/useForm_interface';
import { hasMedia } from '../../../redux/features/crudAsyncThunks';
import { uploadFileAndGetModelId, extractUploadingMedia } from '../../../utils/upload-helper';
import useAuth from '../../../../hooks/useAuth';
import { sleep } from '../../../utils/helpers/helper-functions';
import { FormFieldTypes } from '../../../types/general/data/data-table/form-field-type/formField-types';
import { useSimpleDisclosureContext } from '../../../context/SimpleDisclosureContext';
import classes from './HeaderModalForm.module.css';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  // withCredentials: true,
};

const HeaderModalForm = ({ entity }: { entity: 'threads' | 'maintenances' }) => {
  const { isSuperAdmin } = useAuth();
  const { close } = useSimpleDisclosureContext();
  // const [submitting, setSubmitting] = useState(false);
  const { submitting } = useCrudSelectors(entity);
  const sectionFormFields: FormFieldTypes[] = formFields[entity];
  const { setSubmitting, resetCrudStatus, createCrudDocument } = useCrudSliceStore();
  const { crudStatus, crudError } = useCrudSelectors();
  const initialValues = useMemo(() => getDefaultValues(sectionFormFields), []);
  // const [organizationOptions, setOrganizationOptions] = useState<SelectItem[] | []>([]);
  // const [spaceOptions, setSpaceOptions] = useState<SelectItem[] | []>([]);

  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    notifications.show({
      id: 'submit',
      message: 'Sending data to the server. Please wait...',
      autoClose: false,
      loading: true,
    });
    // force to wait for 1.5 seconds to show the loading notification
    await sleep(1000);

    const reqBody: Record<string, any> = {
      ...form.values,
      media: undefined,
    };

    const media = structuredClone(form.values.media);

    if (media && hasMedia(media)) {
      try {
        const uploadIdData = await uploadFileAndGetModelId(extractUploadingMedia(media), 'threads');
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in uploadIdData) {
          if (!reqBody[key]) reqBody[key] = [];
          reqBody[key] = [...reqBody[key], ...uploadIdData[key]];
        }
      } catch (error) {
        console.log(error);
        notifications.hide('submit');
        setSubmitting(false);
        return;
      }
    }
    createCrudDocument({ entity, newDocument: reqBody });
  };
  useEffect(() => {
    if (crudStatus === 'succeed' && submitting) {
      notifications.hide('submit');
      notifications.show({
        color: 'teal',
        loading: false,
        id: 'success',
        message: 'Successfully created a new thread.',
        autoClose: 5000,
      });
      setSubmitting(false);
      form.reset();
      close();
      // router.reload();
    }
    if (crudStatus === 'failed') {
      notifications.hide('submit');
      notifications.show({
        color: 'red',
        loading: false,
        id: 'failed',
        message: crudError,
        autoClose: 5000,
      });
      resetCrudStatus();
      setSubmitting(false);
    }
  }, [crudStatus]);

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {submitting && (
        // {crudStatus === 'loading' && (
        <>
          <Text>Please wait...</Text>
          <LoadingOverlay visible />
        </>
      )}
      <Box className={classes.inputsWrapper}>
        {sectionFormFields
          .toSorted((a, b) => (a.formOrder || 0) - (b.formOrder || 0))
          ?.map((formField) => (
            <FormFields
              // initialValues={initialValues}
              form={form}
              formField={formField}
              key={formField.id}
            />
          ))}
      </Box>
      <CreationToolBar
        formFields={sectionFormFields}
        form={form}
        entity="threads"
        submitButton={
          <Button fullWidth disabled={submitting} type="submit" mt="xl" size="md">
            Add {entity}!
          </Button>
        }
      />
    </form>
  );
};

export default HeaderModalForm;
