import React from 'react';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import { Box, Container, createStyles } from '@mantine/core';
import { UserModel } from '../../../types/models/user-model';

const useStyle = createStyles((theme) => ({}));

export const SpacePostSection = () => {
  const { crudDocuments } = useCrudSelectors('threads') as { crudDocuments: ThreadModel[] };
  return (
    <>
      {crudDocuments.map((thread) => (
        <PostFeedCard
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
