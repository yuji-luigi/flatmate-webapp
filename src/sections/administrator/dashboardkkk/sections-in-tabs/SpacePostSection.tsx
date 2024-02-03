import React from 'react';
import { Box, Text, Container, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { UserModel } from '../../../../types/models/user-model';
import { ThreadModel } from '../../../../types/models/thread-model';
import { DashboardTopHeader } from '../components/DashboardTopHeader';
import { NewPostInFeed } from '../../../../components/posts/feed/NewPostInFeed';
import { SimpleDisclosureContextProvider } from '../../../../context/SimpleDisclosureContext';
import classes from './SpacePostSection.module.css';

export const SpacePostSection = () => {
  const { crudDocuments } = useCrudSelectors('threads') as { crudDocuments: ThreadModel[] };
  return (
    <Stack gap={16} className={classes.feed}>
      <SimpleDisclosureContextProvider>
        <NewPostInFeed />
      </SimpleDisclosureContextProvider>
      {/* <DashboardTopHeader header="Posts" /> */}
      {crudDocuments.map((thread) => (
        <PostFeedCard key={thread._id} data={thread} />
      ))}
    </Stack>
  );
};