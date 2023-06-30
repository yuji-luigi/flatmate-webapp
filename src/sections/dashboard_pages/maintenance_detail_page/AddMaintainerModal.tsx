import { Button, Group, MultiSelect, Select, SelectItem, Stack } from '@mantine/core';
import React from 'react';
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
import { getWordNextToFromUrl } from '../../../utils/helper-functions';
import { Sections } from '../../../types/general/data/sections-type';

const fetchMainSpaces = async () => {
  const res = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
  return res.data.data;
};

const AddMaintainerModal = () => {
  // get organizationId from cookie context
  const { currentOrganization, currentSpace } = useCookieContext();
  const { user } = useAuth();
  const router = useRouter();
  const _entity = getWordNextToFromUrl();
  const { selectedCrudDocument } = useCrudSelectors(_entity as Sections);

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
    if (form.values.spaces.length === 0) return;
    // call api to add maintainer with axiosInstance in utils
    const res = await axiosInstance.put(
      `${PATH_API.maintainers}/${selectedCrudDocument?._id}`,
      form.values
    );
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
      </Stack>
    </form>
  );
};

export default AddMaintainerModal;
