import { Grid, Text } from '@mantine/core';
import React from 'react';
import { MaintenanceListCard } from '../../side-cards/maintenance-card/MaintenancesCard';
import { NotificationCardTop } from '../../side-cards/notification-card/NotificationCardTop';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';
import { SpaceInfoCard } from './SpaceInfoCard';

export const StatsSummary = () => {
  return (
    <Grid justify="stretch" my={16}>
      <Grid.Col md={4} span={12}>
        <NotificationCardTop />
      </Grid.Col>
      <Grid.Col md={4} span={12}>
        <MaintenanceListCard />
      </Grid.Col>
      <Grid.Col md={4} span={12}>
        <SpaceInfoCard />
      </Grid.Col>
    </Grid>
  );
};
