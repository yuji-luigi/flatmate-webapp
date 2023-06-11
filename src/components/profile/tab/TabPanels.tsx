import { Tabs } from '@mantine/core';
import React from 'react';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: React.ReactNode;
}
export const TabPanels = ({ list }: { list: List[] }) => {
  return (
    <>
      {list.map((item) => (
        <Tabs.Panel value={item.value}>{item.component}</Tabs.Panel>
      ))}
    </>
  );
};
