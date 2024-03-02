import { Box, ComboboxItem, MantineStyleProp, Select, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../../path/path-api';
import { useCookieContext } from '../../../context/CookieContext';
import { convertToSelectItems } from '../../../utils/helpers/helper-functions';
import useAuth from '../../../../hooks/useAuth';

interface OrganizationSpaceSelectProps {
  style?: MantineStyleProp;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const OrganizationSpaceSelect = ({
  style,
  size = 'xs',
  labels,
  form = null,
  className,
}: OrganizationSpaceSelectProps) => {
  // const [opened, { toggle }] = useDisclosure(false);

  const {
    setCurrentOrganization,
    setCurrentSpace,
    currentSpace,
    currentOrganization,
    resetCurrentSpace,
  } = useCookieContext();

  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);

  const deleteHeaderCookies = async () => {
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentOrganization(null);
    setCurrentSpace(null);
    setSpaces([]);
  };

  const handleDeleteSpaceCookie = async () => {
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentSpace(null);
  };

  const getSpaceCookieFromApi = async (spaceId: string) => {
    if (spaceId === '') {
      await axiosInstance.delete(PATH_API.spaceCookie);
      resetCurrentSpace();
      return;
    }
    const response = await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    setCurrentSpace(response.data.data.space);
  };

  const handleGetSpaces = async () => {
    try {
      const response = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
      const selectOptions = convertToSelectItems(response.data.data);
      setSpaces(selectOptions);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: "Something went wrong while fetching spaces' data",
        color: 'red',
      });
    }
  };

  useEffect(() => {
    handleGetSpaces();
  }, []);

  return (
    <Box className={className}>
      <Select
        name="accessController"
        size={size}
        clearable
        disabled={!spaces.length}
        label={labels?.space}
        onClick={handleGetSpaces}
        key={currentOrganization || ''}
        data={spaces}
        value={currentSpace?._id?.toString() || ''}
        onChange={(value) => {
          if (value === null) {
            handleDeleteSpaceCookie();
            return;
          }
          getSpaceCookieFromApi(value || '');
          if (form) {
            form.setFieldValue('space', value || '');
          }
        }}
        style={style}
      />
    </Box>
  );
};

export default OrganizationSpaceSelect;
