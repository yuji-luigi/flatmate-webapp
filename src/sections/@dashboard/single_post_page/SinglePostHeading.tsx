import { Stack, Group, Text, Avatar, createStyles, rem } from '@mantine/core';
import React from 'react';
import { ThreadModel } from '../../../types/models/thread-model';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minHeight: '100vh',
  },
  header: {
    marginBottom: 50,
  },
  rating: {
    position: 'absolute',
    top: var(--mantine-spacing-xs,
    right: rem(12),
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    fontSize: 50,
    margin-top: var(--mantine-spacing-md,
    marginBottom: rem(5),
  },
  articleArea: {
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    boxShadow: theme.shadows.xl,
  },

  action: {
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      background-color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  articleMenuDivider: {
    marginBlock: var(--mantine-spacing-xl,
  },
  relatedArticlesSection: {
    max-width: 300,
  },
  footer: {
    // paddingTop: var(--mantine-spacing-xl,
  },
}));

const SingleMaintenanceHeading = ({ thread }: { thread: ThreadModel }) => {
  const { classes, cx, theme } = useStyles();

  return (
    <Stack className={classes.header}>
      <Text className={classes.title} fw={800} component="a">
        {thread.title}
      </Text>
      <Group align="center">
        <Avatar src={thread.createdBy.avatar?.url} size={50} radius="xl" mr={0} />
        <Text fz="sm" inline>
          {thread.createdBy.name}
        </Text>
        <Text fz="sm" inline>
          {thread._createdAt}
        </Text>
      </Group>
    </Stack>
  );
};

export default SingleMaintenanceHeading;
