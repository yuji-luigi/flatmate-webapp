import { Box, Grid, Group, Text } from '@mantine/core';
import React from 'react';
import { MaintenanceListCard } from '../../side-cards/maintenance-card/MaintenancesCard';
import { NotificationCardTop } from '../../side-cards/notification-card/NotificationCardTop';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';
import { SpaceInfoCard } from './SpaceInfoCard';
import { useCustomMQuery } from '../../../../../../hooks/useCustomMQuery';
import { Icons } from '../../../../../data/icons/icons';
import { IconButton } from '../../../../../components/button/IconButton';

export const StatsSummary = ({ className }: { className: string }) => {
  const { isMobile } = useCustomMQuery();
  // if (isMobile) {
  //   return (
  //     <Group>
  //       <IconButton icon={<Icons.alert />} />
  //       <IconButton icon={<Icons.maintenance />} />
  //       <IconButton icon={<Icons.check />} />
  //     </Group>
  //   );
  // }
  return (
    <Box className={className}>
      <Grid>
        <Grid.Col sm={4} span={12}>
          <NotificationCardTop />
        </Grid.Col>
        <Grid.Col sm={4} span={12}>
          <MaintenanceListCard />
        </Grid.Col>
        <Grid.Col sm={4} span={12}>
          <SpaceInfoCard />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
