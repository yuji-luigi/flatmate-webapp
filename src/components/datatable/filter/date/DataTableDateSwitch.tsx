import { Box, Button, Group, SegmentedControlItem } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { GradientSegmentedControl } from '../../../tab/GradientSegmentedControl';

export const DataTableDateSwitch = () => {
  const { t } = useTranslation('common');
  const _data: SegmentedControlItem[] = [
    {
      value: 'this-month',
      label: t('This month'),
    },
    {
      value: 'three-month',
      label: t('3 month'),
    },
    {
      value: 'six-month',
      label: t('6 month'),
    },
    {
      value: '12-month',
      label: t('Year'),
    },
    {
      value: 'Advanced',
      label: t('Advanced'),
    },
  ];
  return (
    <Box style={{ textAlign: 'right' }}>
      <GradientSegmentedControl data={_data} />
    </Box>
  );
};
