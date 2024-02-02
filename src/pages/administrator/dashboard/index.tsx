import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../../../layouts';
import DashboardSection from '../../../sections/dashboard/dashboard_top/sections-in-tabs/dashboard/DashboardTopSection';
import classes from './dashboardTop.module.css';
import axiosInstance from '../../../utils/axios-instance';
import { useCookieContext } from '../../../context/CookieContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { DashboardRoot } from '../../../sections/dashboard/dashboard_top/sections-in-tabs/dashboard/DashboardRoot';
import { DashboardRootAdministrator } from '../../../sections/administrator/dashboard/DashboardRootAdministrator';

const DashboardPage = () => {
  const { currentOrganization, currentSpace } = useCookieContext();
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    handleSectionData();
  }, [currentOrganization, currentSpace]);

  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/home`);
    const { space, maintainers, maintenances, threads, statistics } = rawRes.data.data || [];
    setCrudDocument({ entity: 'statistics', document: statistics });
    setCrudDocument({ entity: 'spaces', document: space });
    setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
    setCrudDocuments({ entity: 'threads', documents: threads });
  };
  // return <div>jey</div>;
  return <DashboardRootAdministrator />;
  return <DashboardSection />;
};
DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="administrator-dashboard">{page}</Layout>;
};
export default DashboardPage;

// export async function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'], null, ['en', 'it'])),
//       // Will be passed to the page component as props
//     },
//   };
// }
