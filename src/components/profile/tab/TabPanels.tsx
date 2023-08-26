import { Tabs } from '@mantine/core';
import React from 'react';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: () => JSX.Element;
}
export const TabPanels = ({ list }: { list: List[] }) => {
  return (
    <>
      {list.map((item) => (
        <Tabs.Panel key={item.label} value={item.value}>
          <item.component />
          {/* {item.value === activeTab && <item.component />} */}
        </Tabs.Panel>
      ))}
    </>
  );
};
