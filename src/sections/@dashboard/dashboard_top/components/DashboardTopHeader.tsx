import { Box, Group, Text } from '@mantine/core';
import React, { ReactNode } from 'react';
import { CookieValueTypes } from 'cookies-next';
import { Icons } from '../../../../data/icons/icons';
import classes from './DashboardTopHeader.module.css';

type DashboardTopHeaderProps = {
  header?: string;
  rightSection?: ReactNode;
};
export const DashboardTopHeader = (props: DashboardTopHeaderProps) => {
  const { header, rightSection } = props;
  return (
    <Group className={classes.header} justify="space-between">
      <Group justify="left">
        <Text component="h2" size="lg">
          {header}
        </Text>
      </Group>
      {rightSection}
    </Group>
  );
};
