import { Box, Group, Tabs } from '@mantine/core';
import React from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useCustomMQuery } from '../../../hooks/useCustomMQuery';
import { SettingButtonSpaceHome } from '../../sections/dashboard/dashboard_top/components/SettingButtonSpaceHome';
import classes from './TabList.module.css';

export interface TabList<ComponentProps = any> {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: (props: any) => JSX.Element | null;
  componentProps?: ComponentProps;
  form?: UseFormReturnType<Record<string, unknown>>;
  // component: React.ReactNode;
}
export const TabList = ({
  spaceSetting,
  classNames,
  list,
  ...other
}: {
  classNames?: {
    tabList?: string;
    tab?: string;
  };
  spaceSetting?: boolean;
  list: TabList[];
  // position?: 'left' | 'center' | 'right';
}) => {
  const { isLargeScreen } = useCustomMQuery();
  return (
    <Tabs.List className={`${classes.tabListWrapper} ${classNames?.tabList}`}>
      {list.map((item) => (
        <Tabs.Tab
          className={`${classes.tab} ${classNames?.tab}`}
          leftSection={item.icon}
          value={item.value}
          key={item.label}
          {...other}
        >
          {isLargeScreen && item.label}
        </Tabs.Tab>
      ))}

      {spaceSetting && <SettingButtonSpaceHome />}
    </Tabs.List>
  );
};
