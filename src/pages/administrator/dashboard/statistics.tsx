import React, { ReactElement } from 'react';
import Page from '../../../components/Page';
import Layout from '../../../layouts';

const DashboardTopPage /* : NextPageWithLayout<PropWithChildren> */ = () => <Page title="HOME:" />;

DashboardTopPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardTopPage;
