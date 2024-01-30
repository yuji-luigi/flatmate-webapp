import { Box, Group, Tabs } from '@mantine/core';
import React from 'react';
import { useCustomMQuery } from '../../../hooks/useCustomMQuery';
import { SettingButtonSpaceHome } from '../../sections/dashboard/dashboard_top/components/SettingButtonSpaceHome';
import classes from './TabList.module.css';
import { TAB_LIST_CONFIG as list } from '../../sections/dashboard/dashboard_top/sections-in-tabs/tabList';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: () => JSX.Element;
  // component: React.ReactNode;
}
export const TabList = ({
  spaceSetting,
}: {
  spaceSetting?: boolean;
  // position?: 'left' | 'center' | 'right';
}) => {
  const { isLargeScreen } = useCustomMQuery();
  return (
    <Tabs.List className={classes.tabListWrapper}>
      {list.map((item) => (
        <Tabs.Tab
          className={classes.tab}
          leftSection={item.icon}
          value={item.value}
          key={item.label}
        >
          {isLargeScreen && item.label}
        </Tabs.Tab>
      ))}

      {spaceSetting && <SettingButtonSpaceHome />}
    </Tabs.List>
  );
};
