import { Tabs } from '@mantine/core';
import React from 'react';
import { UseFormReturnType } from '@mantine/form';
import { TabList } from './TabList';

export const TabPanels = ({
  list,
  ...others
}: {
  list: TabList[];
  form?: UseFormReturnType<Record<string, unknown>>;
}) => {
  return (
    <>
      {list.map((item) => (
        <Tabs.Panel key={item.label} value={item.value}>
          {/* <Tabs.Panel key={item.label} value={item.value}> */}
          <item.component {...item.componentProps} {...others} />
        </Tabs.Panel>
      ))}
    </>
  );
};
