import React from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { StaticDataTable } from '../../../../components/datatable/StaticDataTable';
import { maintenancesTableData } from '../../../../../json/dataTable/formfields/maintenancesTableData';
import { Icons } from '../../../../data/icons/icons';
import { DashboardTopHeader } from '../components/DashboardTopHeader';
import { FeedTableSwitch } from './compontents/FeedTableSwitch';
import { useSegmentedControl } from '../../../../components/tab/useSegmentedControl';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  const { currentValue } = useSegmentedControl();
  return (
    <>
      <Stack gap={16}>
        <DashboardTopHeader header="Maintenances" rightSection={<FeedTableSwitch />} />
        {currentValue === 'table' && (
          <StaticDataTable json={maintenancesTableData} data={crudDocuments} />
        )}
        {currentValue === 'posts' &&
          crudDocuments.map((maintenance) => (
            <PostFeedCard key={maintenance._id} data={maintenance} />
          ))}
      </Stack>
    </>
  );
};
