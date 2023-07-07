import React from 'react';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import { UserModel } from '../../../types/models/user-model';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors('maintenances');
  return (
    <>
      {crudDocuments.map((thread) => (
        <PostFeedCard
          createdAt={thread.createdAt}
          key={thread._id}
          createdBy={{ name: 'No name user' } as UserModel}
          title={thread.title}
          body={thread.description}
          images={thread.images}
          attachments={[]}
          sx={{ marginBottom: 24 }}
        />
      ))}
    </>
  );
};
