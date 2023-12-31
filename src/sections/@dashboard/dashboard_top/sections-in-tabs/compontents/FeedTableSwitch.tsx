import { SegmentedControl } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';
import { GradientSegmentedControl } from '../../../../../components/tab/GradientSegmentedControl';

export const SWITCH_DATA = [
  { value: 'table', label: <Icons.table /> },
  { value: 'posts', label: <Icons.posts /> },
];

type Props = {
  localStorageKey?: string;
};
export const FeedTableSwitch = (props: Props) => {
  return <GradientSegmentedControl switchDataList={SWITCH_DATA} {...props} />;
};
