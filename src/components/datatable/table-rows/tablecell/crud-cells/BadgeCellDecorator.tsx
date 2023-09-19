import { Badge, useMantineTheme } from '@mantine/core';
import React from 'react';
import { BadgeCellConfig } from '../../../../../types/general/data/data-table/formField-types';

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
      {children}{' '}
    </Badge>
  );
};
export default BadgeCellDecorator;
