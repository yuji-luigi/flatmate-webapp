import React from 'react';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import MaintenanceFeedCard from '../../../../components/posts/feed/MaintenanceeFeedCard';
import { MaintenanceModel } from '../../../../types/models/maintenance-model';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors<MaintenanceModel>('maintenances');
  return (
    <>
      {crudDocuments.map((maintenance) => (
        <MaintenanceFeedCard
          key={maintenance._id}
          maintenance={maintenance}
          sx={{ marginBottom: 24 }}
        />
      ))}
    </>
  );
};
