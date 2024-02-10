import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import { SpacePostSection } from '../../../sections/dashboard/dashboard_top/sections-in-tabs/SpacePostSection';
import classes from './dashboardTop.module.css';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { PATH_API, _PATH_API } from '../../../path/path-api';
import { useCookieContext } from '../../../context/CookieContext';

const HomePostPage = () => {
  const { fetchCrudDocuments, setCrudDocuments } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors('threads');
  const { hasSelectChanged, currentOrganization, currentSpace } = useCookieContext();

  useEffect(() => {
    if (!hasSelectChanged && crudDocuments.length > 0) return;

    fetchCrudDocuments({ entity: 'threads', owEndpoint: _PATH_API.threads.home });
  }, [hasSelectChanged, currentOrganization, currentSpace]);
  return <SpacePostSection />;
};

HomePostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default HomePostPage;