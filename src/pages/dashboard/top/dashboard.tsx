import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import router from 'next/router';
import Layout from '../../../layouts';
import DashboardSection from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/stats-home/DashboardTopSection';
import classes from './dashboardTop.module.css';
import axiosInstance from '../../../utils/axios-instance';
import { useCookieContext } from '../../../context/CookieContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';

const DashboardPage = () => {
  const { currentOrganization, currentSpace } = useCookieContext();
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    handleSectionData();
  }, [currentOrganization, currentSpace]);
  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/home`);
    const { space, maintainers, maintenances, threads, homeStatics } = rawRes.data.data || [];
    setCrudDocument({ entity: 'spaces', document: space });
    setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
    setCrudDocuments({ entity: 'threads', documents: threads });
  };
  return <DashboardSection />;
};
DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardPage;