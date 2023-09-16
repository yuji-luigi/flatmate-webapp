import { Select, SelectItem, Sx } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormReturnType } from '@mantine/form';
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
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const OrganizationSpaceSelect = ({
  sx,
  size = 'xs',
  labels,
  form = null,
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
  const [spaces, setSpaces] = useState<SelectItem[] | []>([
    { value: currentSpace?._id || '', label: currentSpace?.name || '' },
  ]);
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
    } catch (error) {}
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
      if (isSuperAdmin) return;
      const response = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
      const selectOptions = convertToSelectItems(response.data.data);
      setSpaces(selectOptions);
    } catch (error) {}
  };

  useEffect(() => {
    if (currentSpace?._id) {
      setSpaces([...spaces, { value: currentSpace?._id || '', label: currentSpace?.name || '' }]);
    }
  }, [currentSpace?._id, currentOrganization]);

  useEffect(() => {
    getOrganizations();
    handleGetSpaces();
  }, []);
  return (
    <>
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
              return deleteHeaderCookies();
            }
            handleOnSelectOrganization(value || '');
            if (form) {
              form.setFieldValue('organization', value || '');
            }
          }}
          sx={sx}
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
          if (value === null) return handleDeleteSpaceCookie();
          getSpaceCookieFromApi(value || '');
          if (form) {
            form.setFieldValue('space', value || '');
          }
        }}
        sx={sx}
      />
    </>
  );
};

export default OrganizationSpaceSelect;
