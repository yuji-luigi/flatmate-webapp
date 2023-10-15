import { Box, Group, Tabs } from '@mantine/core';
import React from 'react';
import { TabsPosition } from '@mantine/core/lib/Tabs/Tabs.types';
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
  position?: TabsPosition;
}) => {
  const { isLargeScreen } = useCustomMQuery();
  return (
    <Tabs.List position={position} className={className}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          align-items: 'center',
          width: '100%',
        }}
      >
        <Group className={classes.tabList}>
          {list.map((item) => (
            <Tabs.Tab icon={item.icon} value={item.value} key={item.label}>
              {isLargeScreen && item.label}
            </Tabs.Tab>
          ))}
        </Group>
        {spaceSetting && <SettingButtonSpaceHome />}
      </Box>
    </Tabs.List>
  );
};
