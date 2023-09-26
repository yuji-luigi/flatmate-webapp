import React, { ReactNode } from 'react';
import { Text } from '@mantine/core';
import { TEXT_SIZE } from '../text/text-size';

export const ListText = ({ title, children }: { title?: string; children?: ReactNode }) => {
  return (
    <Text fw={800} size={TEXT_SIZE.cardTile}>
      {title}
      {children}
    </Text>
  );
};
