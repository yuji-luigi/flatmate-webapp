import { Tabs } from '@mantine/core';
import React from 'react';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: React.ReactNode;
}
export const TabList = ({ list }: { list: List[] }) => {
  return (
    <Tabs.List position="right">
      {list.map((item) => (
        <Tabs.Tab icon={item.icon} value={item.value}>
          {item.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
};
