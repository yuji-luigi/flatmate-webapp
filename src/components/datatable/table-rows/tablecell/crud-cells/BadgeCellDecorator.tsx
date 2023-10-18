import { Badge, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useColorScheme } from '@mantine/hooks';
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
  const { colorScheme } = useMantineColorScheme();
  console.log(colorScheme);
  let { color } = cellConfig.badge;
  if (cellConfig.type === 'static-select') {
    color =
      cellConfig.options?.find((option: StaticSelectFormFieldType) => option.value === value)
        ?.color || color;
  }
  return (
    <Badge
      className={classes.badge}
      color={color}
      variant={colorScheme === 'dark' ? 'light' : 'filled'}
    >
      {children}
    </Badge>
  );
};
export default BadgeCellDecorator;
