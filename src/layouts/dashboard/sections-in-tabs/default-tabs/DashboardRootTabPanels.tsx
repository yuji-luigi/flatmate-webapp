import React from "react";
import { Tabs } from "@mantine/core";
import { dashboardTabsByUserType } from "../tabList";
import useAuth from "../../../../../hooks/useAuth";

export const DashboardTabPanels = () => {
  const { user } = useAuth();
  return (
    <>
      {dashboardTabsByUserType[user?.loggedAs || "inhabitant"].map((tabItem) => (
        <Tabs.Panel key={tabItem.value} value={tabItem.value}>
          {tabItem.component !== null && <tabItem.component />}
        </Tabs.Panel>
      ))}
    </>
  );
};
