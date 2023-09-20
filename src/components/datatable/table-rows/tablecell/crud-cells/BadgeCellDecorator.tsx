import { Badge, Group, useMantineTheme } from '@mantine/core';
import React from 'react';
import { BadgeCellConfig } from '../../../../../types/general/data/data-table/formField-types';
import { Icons } from '../../../../../data/icons/icons';

const BadgeCellDecorator = ({
  children,
  cellConfig,
}: {
  children: React.ReactNode;
  cellConfig: BadgeCellConfig;
}) => {
  const theme = useMantineTheme();
  return (
    <Badge
      color={cellConfig.badge.color}
      variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
    >
      <Group>
        {/* <Icons.Carpenter size={16} /> */}
        {children}{' '}
      </Group>
    </Badge>
  );
};
export default BadgeCellDecorator;
