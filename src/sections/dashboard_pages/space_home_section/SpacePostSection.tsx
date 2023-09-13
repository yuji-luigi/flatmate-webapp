import React from 'react';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import { Box, Container, createStyles } from '@mantine/core';
import { UserModel } from '../../../types/models/user-model';
import { ThreadModel } from '../../../types/models/thread-model';

const useStyle = createStyles((theme) => ({}));

export const SpacePostSection = () => {
  const { crudDocuments } = useCrudSelectors('threads') as { crudDocuments: ThreadModel[] };
  return (
    <>
      {crudDocuments.map((thread) => (
        <PostFeedCard
          key={thread._id}
          _id={thread._id}
          createdBy={thread.user}
          title={thread.title}
          body={thread.description}
          images={thread.images}
          attachments={thread.attachments || []}
          createdAt={thread.createdAt}
          sx={{ marginBottom: 24 }}
        />
      ))}
    </>
  );
};
