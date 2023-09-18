import React, { ReactElement } from 'react';
import Layout from '../../../layouts';
import MaintainerPage from '.';

const MaintainerPageWithQuery = () => {
  return <MaintainerPage />;
};

MaintainerPageWithQuery.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerPageWithQuery;
