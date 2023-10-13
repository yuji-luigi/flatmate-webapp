import React from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { StaticDataTable } from '../../../../components/datatable/StaticDataTable';
import { maintenancesTableData } from '../../../../../json/dataTable/formfields/maintenancesTableData';
import { Icons } from '../../../../data/icons/icons';
import { DashboardTopHeader } from '../components/DashboardTopHeader';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  return (
    <>
      <Stack spacing={16}>
        <DashboardTopHeader header="Maintenances" />
        {/* <Group position="apart">
          <Text component="h1" size="lg">
            Maintenances
          </Text>
          <Icons.Carpenter />
        </Group> */}
        <StaticDataTable json={maintenancesTableData} data={crudDocuments} />
        {crudDocuments.map((maintenance) => (
          <PostFeedCard key={maintenance._id} data={maintenance} />
        ))}
      </Stack>
    </>
  );
};
