import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import classes from './dashboardTop.module.css';
import { SpaceMaintenanceSection } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpaceMaintenanceSection';
import { _PATH_API } from '../../../path/path-api';

const DashboardTopMaintenances = () => {
  return <SpaceMaintenanceSection />;
};
DashboardTopMaintenances.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopMaintenances;
