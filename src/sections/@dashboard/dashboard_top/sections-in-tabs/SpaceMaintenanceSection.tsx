import React from 'react';
import { Stack } from '@mantine/core';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  return (
    <Stack spacing={16}>
      {crudDocuments.map((maintenance) => (
        <PostFeedCard key={maintenance._id} data={maintenance} />
      ))}
    </Stack>
  );
};
