import React from 'react';
import { Stack, Text } from '@mantine/core';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  return (
    <>
      <Stack spacing={16}>
        <Text component="h1" size="lg">
          Maintenances
        </Text>
        {crudDocuments.map((maintenance) => (
          <PostFeedCard key={maintenance._id} data={maintenance} />
        ))}
      </Stack>
    </>
  );
};
