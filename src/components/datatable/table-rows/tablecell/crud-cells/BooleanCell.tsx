import { Group, Text } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';

export const BooleanCell = ({ cellValue }: { cellValue: string }) => {
  const isTrue = cellValue === 'true';
  const Icon = isTrue ? Icons.check : Icons.close;
  const color = isTrue ? 'green' : 'red';
  return (
    <>
      <Icon color={color} />
    </>
  );
};
