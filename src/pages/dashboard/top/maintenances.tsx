import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../layouts';
import classes from './dashboardTop.module.css';
import { SpaceMaintenanceSection } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpaceMaintenanceSection';
import { _PATH_API } from '../../../path/path-api';
import { SegmentedControlContextProvider } from '../../../components/tab/useSegmentedControl';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { useCookieContext } from '../../../context/CookieContext';

const DashboardTopMaintenances = () => {
  const { fetchCrudDocuments } = useCrudSliceStore();

  const { crudDocuments } = useCrudSelectors('maintenances');
  const { hasSelectChanged, currentOrganization, currentSpace } = useCookieContext();
  useEffect(() => {
    if (!hasSelectChanged && crudDocuments.length > 0) return;
    fetchCrudDocuments({ entity: 'maintenances', owEndpoint: _PATH_API.maintenances.home });
  }, [hasSelectChanged, currentOrganization, currentSpace]);
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['en', 'it'])),
      // Will be passed to the page component as props
    },
  };
}
