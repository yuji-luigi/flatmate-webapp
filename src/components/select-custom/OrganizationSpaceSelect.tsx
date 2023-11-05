import { Box, ComboboxItem, MantineStyleProp, Select, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../path/path-api';
import { useCookieContext } from '../../context/CookieContext';
import { convertToSelectItems } from '../../utils/helpers/helper-functions';
import useAuth from '../../../hooks/useAuth';
import { SelectOption } from '../../types/general/data/data-table/formField-types';

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

  const [organizations, setOrganizations] = useState<ComboboxItem[]>([]);
  const {
    setCurrentOrganization,
    setCurrentSpace,
    currentSpace,
    currentOrganization,
    resetCurrentSpace,
  } = useCookieContext();

  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';

  const deleteHeaderCookies = async () => {
    await axiosInstance.delete(`${PATH_API.organizationCookie}`);
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentOrganization(null);
    setCurrentSpace(null);
    setSpaces([]);
  };

  const handleDeleteSpaceCookie = async () => {
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentSpace(null);
  };

  const getOrganizations = async () => {
    try {
      const response = await axiosInstance.get(_PATH_API.organizations.selections);
      const selectOptions = convertToSelectItems(response.data.data);
      setOrganizations(selectOptions);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: "Something went wrong while fetching organizations' data",
        color: 'red',
      });
    }
  };

  /** get spaces options and reset the cookie of space. show all the info of organization without querying by space. */
  const handleOnSelectOrganization = async (organizationId: string) => {
    try {
      const response = await axiosInstance.get(`${PATH_API.organizationCookie}/${organizationId}`);
      const selectOptions = convertToSelectItems(response.data.data);
      await axiosInstance.delete(`${PATH_API.spaceCookie}`);
      setCurrentSpace(null);
      setSpaces(selectOptions);
      setCurrentOrganization(organizationId);
    } catch (error: any) {
      console.error(error.message || error);
    }
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
      // if (isSuperAdmin) return;
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

  // useEffect(() => {
  //   if (currentSpace?._id) {
  //     !spaces.length && setSpaces([{ value: currentSpace?._id, label: currentSpace?.name }]);
  //   }
  // }, [currentSpace?._id, currentOrganization]);

  // useEffect(() => {
  //   getOrganizations();
  //   handleGetSpaces();
  // }, []);
  console.log({ organizations });
  return (
    <Box className={className}>
      {isSuperAdmin && (
        <Select
          name="organization"
          size={size}
          label={labels?.organization}
          allowDeselect
          onClick={getOrganizations}
          value={currentOrganization || ''}
          // defaultValue={getCookie('organization')?.toString()}
          data={organizations}
          onChange={(value) => {
            if (value === null) {
              deleteHeaderCookies();
              return;
            }
            handleOnSelectOrganization(value || '');
            if (form) {
              form.setFieldValue('organization', value || '');
            }
          }}
          style={style}
        />
      )}
      <Select
        name="space"
        size={size}
        allowDeselect
        label={labels?.space}
        onClick={handleGetSpaces}
        key={currentOrganization || ''}
        // data={[]}
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
