import React from 'react';
import { Box, Text, Container, Stack, createStyles } from '@mantine/core';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { UserModel } from '../../../../types/models/user-model';
import { ThreadModel } from '../../../../types/models/thread-model';
import { DashboardTopHeader } from '../components/DashboardTopHeader';
import { NewPostInFeed } from '../../../../components/posts/feed/NewPostInFeed';

const useStyle = createStyles((theme) => ({}));

export const SpacePostSection = () => {
  const { crudDocuments } = useCrudSelectors('threads') as { crudDocuments: ThreadModel[] };
  return (
    <>
      <Stack spacing={16}>
        <NewPostInFeed />
        {/* <DashboardTopHeader header="Posts" /> */}
        {crudDocuments.map((thread) => (
          <PostFeedCard key={thread._id} data={thread} />
        ))}
      </Stack>
    </>
  );
};
