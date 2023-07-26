import React from 'react';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import { UserModel } from '../../../types/models/user-model';
import MaintenanceFeedCard from '../../../components/posts/feed/MaintenanceeFeedCard';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  return (
    <>
      {crudDocuments.map((maintenance) => (
        <MaintenanceFeedCard maintenance={maintenance} sx={{ marginBottom: 24 }} />
      ))}
    </>
  );
};
