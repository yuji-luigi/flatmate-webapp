import { Badge, Box, useMantineTheme } from '@mantine/core';
import TableCellController from './TableCellController';
import {
  BadgeCellConfig,
  BaseFormType,
  FormFieldTypes,
} from '../../../../../types/general/data/data-table/formField-types';
import React from 'react';

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
