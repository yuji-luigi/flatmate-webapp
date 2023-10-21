import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import classes from './dashboardTop.module.css';
import { SpaceMaintenanceSection } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpaceMaintenanceSection';
import { _PATH_API } from '../../../path/path-api';
import { SegmentedControlContextProvider } from '../../../components/tab/useSegmentedControl';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';

const DashboardTopMaintenances = () => {
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors('maintenances');
  useEffect(() => {
    if (crudDocuments.length > 0) return;
    fetchCrudDocuments({ entity: 'maintenances', owEndpoint: _PATH_API.maintenances.home });
  }, []);
  return (
    <SegmentedControlContextProvider>
      <SpaceMaintenanceSection />
    </SegmentedControlContextProvider>
  );
};
DashboardTopMaintenances.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopMaintenances;
