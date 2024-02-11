import { Button, ComboboxData, Group, LoadingOverlay, MultiSelect, Stack } from '@mantine/core';
import React, { useState } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { hideNotification, notifications } from '@mantine/notifications';
import { PATH_API } from '../../../../path/path-api';
import axiosInstance from '../../../../utils/axios-instance';
import { useCookieContext } from '../../../../context/CookieContext';
import LoadingScreen from '../../../../components/screen/LoadingScreen';
import useAuth from '../../../../../hooks/useAuth';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { getEntityFromUrl, sleep } from '../../../../utils/helpers/helper-functions';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { SpaceModel } from '../../../../types/models/space-model';
import { SelectOption } from '../../../../types/general/data/data-table/form-field-type/formField-types';

const fetchMainSpaces = async () => {
  const res = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
  return res.data.data;
};

const AddMaintainerModal = () => {
  // get organizationId from cookie context
  const { currentOrganization, currentSpace } = useCookieContext();

  const [submitting, setSubmitting] = useState(false);

  const { closeModal } = useCustomModalContext();

  const { user } = useAuth();
  const router = useRouter();
  const _entity = getEntityFromUrl();
  const { crudDocument, crudError, crudStatus } = useCrudSelectors(_entity);
  const { setCrudDocument, resetCrudStatus } = useCrudSliceStore();

  const form = useForm({
    initialValues: {
      spaces: [currentSpace?._id],
    },
  });
  const {
    data,
    error: errorSwr,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(
    currentOrganization || user?.organization,
    fetchMainSpaces
  );

  if (!data || isLoading) return <LoadingScreen />;

  const options: ComboboxData = data?.map((space: SpaceModel) => ({
    value: space._id,
    label: space.name,
  }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    notifications.show({
      id: 'submit',
      message: 'Sending data to the server. Please wait...',
      autoClose: false,
      color: 'blue',
      loading: true,
    });
    await sleep(1500);
    if (form.values.spaces.length === 0) return;
    // call api to add maintainer with axiosInstance in utils
    try {
      const rawMaintainer = await axiosInstance.put(
        `${PATH_API.maintainers}/${crudDocument?._id}`,
        form.values
      );
      // update crud document
      setCrudDocument({ entity: _entity, document: rawMaintainer.data.data });
      notifications.show({ id: '1', message: 'Maintainer added to building' });
      closeModal();
    } catch (error: any) {
      notifications.show({ id: '1', message: error.message, color: 'red' });
    } finally {
      setSubmitting(false);
      hideNotification('submit');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <MultiSelect
          my={24}
          placeholder="Choose spaces"
          label="select building/space to add a maintainer"
          data={options}
          {...form.getInputProps('spaces')}
        />
        <Group justify="right">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Add</Button>
        </Group>
        {submitting && <LoadingOverlay visible />}
      </Stack>
    </form>
  );
};

export default AddMaintainerModal;
