import { Box, ComboboxItem, MantineStyleProp, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/path-api';
import { convertToSelectItems } from '../../utils/helpers/helper-functions';
import { useItemSlice } from '../../redux/features/crud/selectedItemSlice';
import { SpaceModel } from '../../types/models/space-model';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';

interface SpaceSelectInputProps {
  style?: MantineStyleProp;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  placeholder?: string;
  onChangeCallback?: (value: string | null) => void;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const SpaceSelectInput = ({
  style,
  size = 'xs',
  labels,
  form = null,
  placeholder = '',
  className,
  onChangeCallback,
}: SpaceSelectInputProps) => {
  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);
  const { setCrudDocuments, setCrudDocument } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors<SpaceModel>('spaces');
  const { set, get } = useItemSlice<{ space: string | null; spaceObject?: null | SpaceModel }>({
    space: '',
    spaceObject: null,
  });
  const handleGetSpaces = async () => {
    try {
      // if (isSuperAdmin) return;
      const response = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
      const selectOptions = convertToSelectItems(response.data.data);
      setSpaces(selectOptions);
      setCrudDocuments({ entity: 'spaces', documents: response.data.data });
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
  const handleChange = (value: string | null) => {
    set({ space: value, spaceObject: crudDocuments.find((space) => space._id === value) });

    onChangeCallback?.(value);
  };

  return (
    <Box className={className}>
      <Select
        name="space"
        size={size}
        clearable
        searchable
        disabled={!spaces.length}
        label={labels?.space}
        onClick={handleGetSpaces}
        data={spaces}
        placeholder={placeholder}
        value={get?.space}
        onChange={handleChange}
        style={style}
      />
    </Box>
  );
};

export default SpaceSelectInput;
