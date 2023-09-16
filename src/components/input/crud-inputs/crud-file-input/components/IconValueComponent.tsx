import { FileInputProps } from '@mantine/core';
import React from 'react';

export const IconValueComponent: FileInputProps['valueComponent'] = (props) => {
  const { value } = props;
  if (!value) return null;
  if (Array.isArray(value)) {
    return <>{value.length} files selected </>;
  }
  return <>selected: {value.name}</>;
};
