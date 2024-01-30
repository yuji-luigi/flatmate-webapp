import { Box, Group, Text } from '@mantine/core';
import React, { ReactNode } from 'react';
import { CookieValueTypes } from 'cookies-next';
import { Icons } from '../../../../data/icons/icons';
import classes from './DashboardTopHeader.module.css';

type DashboardTopHeaderProps = {
  header?: string;
  rightSection?: ReactNode;
  subHeader?: ReactNode;
};
export const DashboardTopHeader = (props: DashboardTopHeaderProps) => {
  const { header, rightSection, subHeader } = props;
  return (
    <Group className={classes.header} justify="space-between">
      <Group justify="left" gap={8}>
        <Text component="h2" size="lg" tt="uppercase" fw={800}>
          {header}
        </Text>
        <Text component="p" size="xs">
          {subHeader}
        </Text>
      </Group>
      {rightSection}
    </Group>
  );
};
