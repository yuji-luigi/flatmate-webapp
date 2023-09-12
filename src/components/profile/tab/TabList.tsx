import { Tabs } from '@mantine/core';
import React from 'react';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: () => JSX.Element;
  // component: React.ReactNode;
}
export const TabList = ({ list }: { list: List[] }) => {
  return (
    <Tabs.List position="left">
      {list.map((item) => (
        <Tabs.Tab icon={item.icon} value={item.value} key={item.label}>
          {item.label}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
};
