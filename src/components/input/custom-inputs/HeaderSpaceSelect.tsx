import { Box, ComboboxItem, MantineStyleProp, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { get } from 'http';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/path-api';
import { useCookieContext } from '../../../context/CookieContext';
import { convertToSelectItems } from '../../../utils/helpers/helper-functions';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { SpaceModel } from '../../../types/models/space-model';

interface OrganizationSpaceSelectProps {
  style?: MantineStyleProp;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const HeaderSpaceSelect = ({
  style,
  size = 'xs',
  labels,
  form = null,
  className,
}: OrganizationSpaceSelectProps) => {
  // const [opened, { toggle }] = useDisclosure(false);

  const { setCurrentSpace, resetCurrentSpace, currentSpace } = useCookieContext();
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments: spaces } = useCrudSelectors<SpaceModel>('spaces');
  // const [spaces, setSpaces] = useState<ComboboxItem[]>([]);

  const handleDeleteSpaceCookie = async () => {
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentSpace(null);
  };

  const getSpaceCookieFromApi = async (spaceId: string) => {
    // case select is cleared
    if (spaceId === '') {
      await axiosInstance.delete(PATH_API.spaceCookie);
      resetCurrentSpace();
      return;
    }
    const response = await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    setCurrentSpace(response.data.data.space);
  };

  useEffect(() => {
    fetchCrudDocuments({ entity: 'spaces' });
  }, []);
  console.log(currentSpace);
  return (
    <Box className={className}>
      <Select
        name="space"
        size={size}
        clearable
        disabled={!spaces.length}
        label={labels?.space}
        data={spaces.map((space) => ({ value: space._id, label: space.name }))}
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
        value={currentSpace?._id || null}
        style={style}
      />
    </Box>
  );
};

export default HeaderSpaceSelect;
