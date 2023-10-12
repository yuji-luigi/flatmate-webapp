import React, { ReactElement } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import { SpaceMaintenanceSection } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpaceMaintenanceSection';
import classes from './dashboardTop.module.css';

const invoices = () => {
  return <SpaceMaintenanceSection />;
};
invoices.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="dashboard">
      <Box className={classes.container}>{page}</Box>
    </Layout>
  );
};
export default invoices;
