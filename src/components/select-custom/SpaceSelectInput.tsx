import { Box, ComboboxItem, MantineStyleProp, Select, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { on } from 'events';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../path/path-api';
import { useCookieContext } from '../../context/CookieContext';
import { convertToSelectItems } from '../../utils/helpers/helper-functions';
import useAuth from '../../../hooks/useAuth';
import { useItemSlice } from '../../redux/features/crud/selectedItemSlice';

interface SpaceSelectInputProps {
  style?: MantineStyleProp;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  className?: string;
  onChangeCallback?: (value: string | null) => void;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const SpaceSelectInput = ({
  style,
  size = 'xs',
  labels,
  form = null,
  className,
  onChangeCallback,
}: SpaceSelectInputProps) => {
  const [spaces, setSpaces] = useState<ComboboxItem[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const { set, get } = useItemSlice<{ space: string | null }>({ space: '' });
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
    handleGetSpaces();
  }, []);
  const handleChange = (value: string | null) => {
    set({ space: value });
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
        value={get?.space}
        onChange={handleChange}
        style={style}
      />
    </Box>
  );
};

export default SpaceSelectInput;
