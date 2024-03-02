import { Stack } from '@mantine/core';
import { useEffect } from 'react';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { NewPostInFeed } from '../../../../components/posts/feed/NewPostInFeed';
import { SimpleDisclosureContextProvider } from '../../../../context/SimpleDisclosureContext';
import classes from './SpacePostSection.module.css';
import { ThreadModel } from '../../../../types/models/space-model';

export const SpacePostSection = () => {
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocuments } = useCrudSelectors('threads') as { crudDocuments: ThreadModel[] };
  useEffect(() => {
    if (!crudDocuments.length) {
      fetchCrudDocuments({ entity: 'threads' });
    }
  }, []);
  return (
    <Stack gap={16} className={classes.feed}>
      <SimpleDisclosureContextProvider>
        <NewPostInFeed />
      </SimpleDisclosureContextProvider>
      {crudDocuments.map((thread) => (
        <PostFeedCard key={thread._id} data={thread} />
      ))}
    </Stack>
  );
};
