import { Group, Text } from '@mantine/core';
import React from 'react';
import {
  FormFieldTypes,
  StaticOption,
} from '../../../../../types/general/data/data-table/formField-types';
import classes from './Cell.module.css';

export const TextCell = ({
  cellValue,
  cellConfig,
}: {
  cellValue: string;
  cellConfig: FormFieldTypes;
}) => {
  // return cellValue;
  let displayValue = <Text weight={500}>{cellValue}</Text>;
  if (cellConfig.type === 'static-select') {
    const Icon = cellConfig.options?.find(
      (option: StaticOption) => option.value === cellValue
    )?.icon;

    const text = cellConfig.options?.find(
      (option: StaticOption) => option.value === cellValue
    )?.label;

    displayValue = (
      <Group>
        {Icon && <Icon size={16} />}
        <Text className={Icon && classes.textHidden}>{text}</Text>
      </Group>
    );
  }

  return displayValue;
};
