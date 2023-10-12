import React, { ReactElement } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import DashboardSection from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/stats-home/DashboardTopSection';
import classes from './dashboardTop.module.css';

const dashboard = () => {
  return <DashboardSection />;
};
dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="dashboard">
      <Box className={classes.container}>{page}</Box>
    </Layout>
  );
};
export default dashboard;
