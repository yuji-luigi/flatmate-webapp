import React from 'react';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { TAB_LIST_CONFIG } from '../tabList';

export const DashboardRoot = () => {
  return (
    <>
      {TAB_LIST_CONFIG.map((tabItem) => (
        <Tabs.Panel key={tabItem.value} value={tabItem.value}>
          <tabItem.component />
        </Tabs.Panel>
      ))}
    </>
  );
  return <div>DashboardRoot</div>;
};
