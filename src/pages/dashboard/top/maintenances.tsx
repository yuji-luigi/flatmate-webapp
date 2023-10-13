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
    fetchCrudDocuments({ entity: 'maintenances' });
  }, []);
  return (
    <Box className={classes.container}>
      <SpaceMaintenanceSection />
    </Box>
  );
};
DashboardTopMaintenances.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopMaintenances;
