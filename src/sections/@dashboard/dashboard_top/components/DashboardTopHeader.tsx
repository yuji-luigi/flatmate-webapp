import { Group, Text } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../data/icons/icons';
import classes from './DashboardTopHeader.module.css';

type DashboardTopHeaderProps = {
  header?: string;
  views?: boolean;
};
export const DashboardTopHeader = (props: DashboardTopHeaderProps) => {
  const { header, views } = props;
  return (
    <Group className={classes.header} position="apart">
      <Text component="h1" size="lg">
        {header}
      </Text>
      {views && <Icons.Carpenter />}
    </Group>
  );
};
