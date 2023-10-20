import { Group, Text } from '@mantine/core';
import React from 'react';
import {
  FormFieldTypes,
  StaticOption,
  StaticSelectFormFieldType,
  TextFormType,
} from '../../../../../types/general/data/data-table/formField-types';
import classes from './Cell.module.css';

export const TextCell = ({
  cellValue,
  cellConfig,
  rowData,
}: {
  rowData: any;
  cellValue: string;
  cellConfig: TextFormType | StaticSelectFormFieldType;
}) => {
  // return cellValue;
  let displayValue = (
    <Text className={classes.text} size="sm">
      {cellValue}
    </Text>
  );

  if (cellConfig.type === 'static-select') {
    const Icon = cellConfig.options?.find(
      (option: StaticOption) => option.value === cellValue
    )?.icon;
    const dataHidden = !!(cellConfig.type === 'static-select' && Icon);

    const text = cellConfig.options?.find(
      (option: StaticOption) => option.value === cellValue
    )?.label;

    displayValue = (
      <Group>
        {Icon && <Icon className={classes.icon} />}
        <Text className={classes.text} data-hidden={dataHidden}>
          {text}
        </Text>
      </Group>
    );
  }

  return displayValue;
};
