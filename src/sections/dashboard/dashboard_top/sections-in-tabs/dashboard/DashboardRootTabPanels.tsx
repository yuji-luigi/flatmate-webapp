import React from 'react';
import { Tabs } from '@mantine/core';
import { TAB_LIST_CONFIG } from '../tabList';

export const DashboardRootTabPanels = () => {
  return (
    <>
      {TAB_LIST_CONFIG.map((tabItem) => (
        <Tabs.Panel key={tabItem.value} value={tabItem.value}>
          {tabItem.component !== null && <tabItem.component />}
        </Tabs.Panel>
      ))}
    </>
  );
};
