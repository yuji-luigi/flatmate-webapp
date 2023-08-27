import { Group, Text } from '@mantine/core';
import React from 'react';

export const TextCell = ({ cellValue }: { cellValue: string }) => {
  return (
    <Text size="md" weight={500}>
      {cellValue}
    </Text>
  );
};
