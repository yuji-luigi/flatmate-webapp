import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import classes from './dashboardTop.module.css';
import { SpaceMaintenanceSection } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpaceMaintenanceSection';
import { _PATH_API } from '../../../path/path-api';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';

const DashboardTopMaintenances = () => {
  const { fetchCrudDocuments, setCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    fetchCrudDocuments({ entity: 'maintenances', owEndpoint: _PATH_API.maintenances.home });
  }, []);
  return <SpaceMaintenanceSection />;
};
DashboardTopMaintenances.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="dashboard">
      <Box className={classes.container}>{page}</Box>
    </Layout>
  );
};
export default DashboardTopMaintenances;
