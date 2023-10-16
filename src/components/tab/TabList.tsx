import { Box, Group, Tabs } from '@mantine/core';
import React from 'react';
import { useCustomMQuery } from '../../../hooks/useCustomMQuery';
import { SettingButtonSpaceHome } from '../../sections/@dashboard/dashboard_top/components/SettingButtonSpaceHome';
import classes from './TabList.module.css';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: () => JSX.Element;
  // component: React.ReactNode;
}
export const TabList = ({
  list,
  spaceSetting,
  position = 'left',
  className,
}: {
  spaceSetting?: boolean;
  list: List[];
  className?: string;
  position?: 'left' | 'center' | 'right';
}) => {
  const { isLargeScreen } = useCustomMQuery();
  return (
    <Tabs.List justify={position} className={className}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Group className={classes.tabList}>
          {list.map((item) => (
            <Tabs.Tab leftSection={item.icon} value={item.value} key={item.label}>
              {isLargeScreen && item.label}
            </Tabs.Tab>
          ))}
        </Group>
        {spaceSetting && <SettingButtonSpaceHome />}
      </Box>
    </Tabs.List>
  );
};
