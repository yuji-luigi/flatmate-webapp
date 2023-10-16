import { Box, Select, SelectItem, Sx } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../path/path-api';
import { useCookieContext } from '../../context/CookieContext';
import { convertToSelectItems } from '../../utils/helpers/helper-functions';
import useAuth from '../../../hooks/useAuth';

interface OrganizationSpaceSelectProps {
  sx?: Sx;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const OrganizationSpaceSelect = ({
  sx,
  size = 'xs',
  labels,
  form = null,
  className,
}: OrganizationSpaceSelectProps) => {
  // const [opened, { toggle }] = useDisclosure(false);

  const [organizations, setOrganizations] = useState<SelectItem[] | []>([]);
  const {
    setCurrentOrganization,
    setCurrentSpace,
    currentSpace,
    currentOrganization,
    resetCurrentSpace,
  } = useCookieContext();

  const [spaces, setSpaces] = useState<SelectItem[] | []>([]);
  const router = useRouter();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';

  const deleteHeaderCookies = async () => {
    await axiosInstance.delete(`${PATH_API.organizationCookie}`);
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentOrganization('not selected');
    setCurrentSpace(null);
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

  useEffect(() => {
    if (currentSpace?._id) {
      !spaces.length && setSpaces([{ value: currentSpace?._id, label: currentSpace?.name }]);
    }
  }, [currentSpace?._id, currentOrganization]);

  useEffect(() => {
    getOrganizations();
    handleGetSpaces();
  }, []);
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
          style={sx}
        />
      )}
      <Select
        name="space"
        size={size}
        allowDeselect
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
        style={sx}
      />
    </Box>
  );
};

export default OrganizationSpaceSelect;
