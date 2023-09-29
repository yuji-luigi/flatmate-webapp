import { Badge, Group, useMantineTheme } from '@mantine/core';
import React from 'react';
import {
  BadgeCellConfig,
  StaticOption,
  StaticSelectFormFieldType,
} from '../../../../../types/general/data/data-table/formField-types';
import { Icons } from '../../../../../data/icons/icons';

import classes from './Cell.module.css';

const BadgeCellDecorator = ({
  children,
  cellConfig,
  value,
}: {
  children: React.ReactNode;
  cellConfig: BadgeCellConfig;
  value: string;
}) => {
  const theme = useMantineTheme();
  let { color } = cellConfig.badge;
  if (cellConfig.type === 'static-select') {
    color =
      cellConfig.options?.find((option: StaticSelectFormFieldType) => option.value === value)
        ?.color || color;
  }
  return (
    <Badge
      className={classes.text}
      color={color}
      variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
    >
      {children}
    </Badge>
  );
};
export default BadgeCellDecorator;
