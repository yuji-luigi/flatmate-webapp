import React from 'react';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';

export const SpaceMaintenanceSection = () => {
  const { crudDocuments } = useCrudSelectors('maintenances');
  return (
    <>
      {crudDocuments.map((thread) => (
        <PostFeedCard
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
