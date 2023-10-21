import { SegmentedControl } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';
import { GradientSegmentedControl } from '../../../../../components/tab/GradientSegmentedControl';

export const SWITCH_DATA = [
  { value: 'table', label: <Icons.table /> },
  { value: 'posts', label: <Icons.posts /> },
];

export const FeedTableSwitch = () => {
  return <GradientSegmentedControl data={SWITCH_DATA} />;
};
