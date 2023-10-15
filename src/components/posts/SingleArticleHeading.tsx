import { Stack, Group, Text, Avatar, createStyles, rem } from '@mantine/core';
import React from 'react';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { intlDateFormat } from '../../utils/helpers/date-formatters';
import { ThreadModel } from '../../types/models/thread-model';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    minHeight: '100vh',
  },
  header: {
    // marginBottom: 50,
    gap: 0,
    @media (max-width: 768px): {
      paddingInline: 16,
    },
  },
  rating: {
    position: 'absolute',
    top: var(--mantine-spacing-xs,
    right: rem(12),
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    fontSize: 'var(--heading-font-size)',
    // fontSize: 50,
    // margin-top: var(--mantine-spacing-md,
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

export const SingleArticleHeading = ({ data }: { data: MaintenanceModel | ThreadModel }) => {
  const { classes, cx, theme } = useStyles();

  return (
    <Stack className={classes.header}>
      <Group align="center">
        <Avatar src={data.createdBy.avatar?.url} size={50} radius="xl" mr={0} />
        <Text fz="sm" inline>
          {data.createdBy.name}
        </Text>
        <Text fz="sm" inline>
          {intlDateFormat(data.createdAt)}
        </Text>
      </Group>
      <Text className={classes.title} fw={800} component="a">
        {data.title}
      </Text>
    </Stack>
  );
};
