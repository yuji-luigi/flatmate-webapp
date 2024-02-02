import { Box } from '@mantine/core';
import React from 'react';
import { StatsGrid, StatGridSchema } from '../../../components/stats/StatsGrid';
import { useCookieContext } from '../../../context/CookieContext';
import { DashboardTopHeader } from '../dashboardkkk/components/DashboardTopHeader';
import { EventDataTable } from '../dashboardkkk/statistics/DashboardEventDataTable';
import { DashboardMaintenanceDatatable } from '../dashboardkkk/statistics/DashboardMaintenanceDatatable';
import { StatsSummary } from './StatsSummary';
import classes from './AdminDashboardSection.module.css';
import { ChecksByMonthChart } from './components/ChecksByMonthChart';
import statsGridData from '../../../../json/mock/statsGrid.json';
// fetch all the root spaces of role.administrator.rootSpaces
// show the number of issues for each space in the card grid
// stat card for all spaces

export const AdminDashboardSection = () => {
  const { currentSpace } = useCookieContext();

  return (
    <Box className={classes.box}>
      <DashboardTopHeader header={currentSpace?.name} subHeader={currentSpace?.address} />
      <StatsSummary className={classes.summary} />
      <StatsGrid data={statsGridData as unknown as StatGridSchema[]} />
      <ChecksByMonthChart />
      <DashboardMaintenanceDatatable />
      <EventDataTable />
    </Box>
  );
};
