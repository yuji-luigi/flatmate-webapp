import { Group, Avatar } from '@mantine/core';
import React from 'react';

export const AvatarCell = ({ cellValue }: { cellValue: string }) => {
  return (
    <Group spacing="xs">
      <Avatar size={40} src={cellValue} radius={30} />
    </Group>
  );
};
