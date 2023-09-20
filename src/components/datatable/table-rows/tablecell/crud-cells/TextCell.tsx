import { Group, Text } from '@mantine/core';
import React from 'react';
import {
  FormFieldTypes,
  StaticOption,
} from '../../../../../types/general/data/data-table/formField-types';

export const TextCell = ({
  cellValue,
  cellConfig,
}: {
  cellValue: string;
  cellConfig: FormFieldTypes;
}) => {
  let dilplayValue = (
    <Text size="md" weight={500}>
      {cellValue}
    </Text>
  );
  if (cellConfig.type === 'static-select') {
    const Icon = cellConfig.options?.find(
      (option: StaticOption) => option.value === cellValue
    )?.icon;
    const text = cellConfig.options?.find(
      (option: StaticOption) => option.value === cellValue
    )?.label;
    dilplayValue = (
      <Group>
        <Icon size={16} />
        {text}
      </Group>
    );
  }

  return dilplayValue;
};
