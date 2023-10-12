import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mantine/core';
import Layout from '../../../layouts';
import { SpacePostSection } from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpacePostSection';
import classes from './dashboardTop.module.css';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { PATH_API, _PATH_API } from '../../../path/path-api';

const HomePostPage = () => {
  const { fetchCrudDocuments, setCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    fetchCrudDocuments({ entity: 'threads', owEndpoint: _PATH_API.threads.home });
  }, []);
  return <SpacePostSection />;
};

HomePostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout variant="dashboard">
      <Box className={classes.container}>{page}</Box>
    </Layout>
  );
};

export default HomePostPage;
