import { Box, Group, Text } from '@mantine/core';
import React, { ReactNode } from 'react';
import { CookieValueTypes } from 'cookies-next';
import { Icons } from '../../../../data/icons/icons';
import classes from './DashboardTopHeader.module.css';
import { useLocale } from '../../../../../hooks/useLocale';

type DashboardTopHeaderProps = {
  header?: string;
  otherComponent?: ReactNode;
  subHeader?: ReactNode;
};
export const DashboardTopCenteredHeader = (props: DashboardTopHeaderProps) => {
  const { header = '', otherComponent, subHeader = '' } = props;
  const { t } = useLocale();
  const _subHeader = typeof subHeader === 'string' ? t(subHeader) : subHeader;
  return (
    <Group justify="center" gap={8}>
      <Text component="h2" size="lg" tt="uppercase" fw={800}>
        {t(header)}
      </Text>
      <Text component="p" size="xs">
        {_subHeader}
      </Text>
      {otherComponent}
    </Group>
  );
};
