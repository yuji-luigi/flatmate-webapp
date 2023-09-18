import React, { ReactElement } from 'react';
import Layout from '../../../layouts';

import RootSpaceList from '../../../sections/@dashboard/space_setting_section/RootSpaceList';
import { Container, Title } from '@mantine/core';
import { dashboardStyle } from '../../../styles/global-useStyles';

const useStyles = dashboardStyle;

const SpaceSettingsPage = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <h1 className={classes.title}>Choose condominium</h1>
      <RootSpaceList />
    </Container>
  );
};

// get layout
SpaceSettingsPage.getLayout = (page: ReactElement) => <Layout variant="dashboard">{page}</Layout>;

export default SpaceSettingsPage;
