import React from 'react';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { ADMIN_DASHBOARD_TABLIST } from './AdminDashBoardTabList';

export const DashboardRootAdministrator = () => {
  return (
    <>
      {ADMIN_DASHBOARD_TABLIST.map((tabItem) => (
        <Tabs.Panel key={tabItem.value} value={tabItem.value}>
          <tabItem.component />
        </Tabs.Panel>
      ))}
    </>
  );
};
