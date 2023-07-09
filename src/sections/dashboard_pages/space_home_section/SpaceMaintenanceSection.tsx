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
        <MaintenanceFeedCard
          createdAt={maintenance.createdAt}
          key={maintenance._id}
          createdBy={maintenance.createdBy}
          title={maintenance.title}
          body={maintenance.description}
          images={maintenance.images}
          attachments={[]}
          sx={{ marginBottom: 24 }}
        />
      ))}
    </>
  );
};
