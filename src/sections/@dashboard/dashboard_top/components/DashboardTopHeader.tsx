import { Box, Group, Text } from '@mantine/core';
import React from 'react';
import { CookieValueTypes } from 'cookies-next';
import { Icons } from '../../../../data/icons/icons';
import classes from './DashboardTopHeader.module.css';

type DashboardTopHeaderProps = {
  header?: string;
  subHeader?: CookieValueTypes;
  viewControl?: boolean;
};
export const DashboardTopHeader = (props: DashboardTopHeaderProps) => {
  const { header, viewControl, subHeader } = props;
  return (
    <Group className={classes.header} position="apart">
      <Group position="left">
        <Text component="h2" size="lg">
          {header}
        </Text>
      </Group>
      {viewControl && <Icons.Carpenter />}
    </Group>
  );
};
