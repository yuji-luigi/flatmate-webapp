import {
  Button,
  Group,
  LoadingOverlay,
  MultiSelect,
  Select,
  SelectItem,
  Stack,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { PATH_API } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';
import { useCookieContext } from '../../../context/CookieContext';
import LoadingScreen from '../../../components/screen/LoadingScreen';
import { AxiosError } from 'axios';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { getEntityFromUrl, sleep } from '../../../utils/helpers/helper-functions';
import { Sections } from '../../../types/general/data/sections-type';
import { use_ModalContext } from '../../../context/modal-context/_ModalContext';
import { hideNotification, notifications } from '@mantine/notifications';
import { SpaceModel } from '../../../types/models/space-model';

const fetchMainSpaces = async () => {
  const res = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
  return res.data.data;
};

const AddMaintainerModal = () => {
  // get organizationId from cookie context
  const { currentOrganization, currentSpace } = useCookieContext();

  const [submitting, setSubmitting] = useState(false);

  const { closeModal } = use_ModalContext();

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
  const { data, error, isLoading } = useSWR<SpaceModel[] | null, AxiosError>(
    currentOrganization || user?.organization,
    fetchMainSpaces
  );

  if (!data || isLoading) return <LoadingScreen />;
  const options: SelectItem[] = data?.map((space: SpaceModel) => ({
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
          withinPortal
          {...form.getInputProps('spaces')}
        />
        <Group position="right">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Add</Button>
        </Group>
        {submitting && <LoadingOverlay visible />}
      </Stack>
    </form>
  );
};

export default AddMaintainerModal;
