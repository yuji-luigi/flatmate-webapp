import { Card, Group, ActionIcon, createStyles, Divider, Box, Text } from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import React from 'react';
import ImagesInArticle from '../carousel/ImagesInArticle';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { ArticleActionsGroup } from '../icons/icon-buttons/ArticleActionsGroup';
import { ThreadModel } from '../../types/models/thread-model';
import AttachmentsRow from '../files/AttachmentsRow';

const useStyles = createStyles((theme) => ({
  articleArea: {
    display: 'flex',
    flex-direction: 'column',
    gap: var(--mantine-spacing-md),
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    boxShadow: theme.shadows.xl,
  },

  action: {
    background-color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
    ...theme.fn.hover({
      background-color: light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1)),
    }),
  },

  articleMenuDivider: {
    marginBlock: var(--mantine-spacing-xl,
  },
  relatedArticlesSection: {
    max-width: 300,
  },
  footer: {
    // padding-top: var(--mantine-spacing-xl,
  },
}));

export const SingleArticleCard = ({ data }: { data: MaintenanceModel | ThreadModel }) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Card className={classes.articleArea}>
      <Text fw={500}>{data.description}</Text>
      {!!data.images.length && <ImagesInArticle images={data.images} />}
      <AttachmentsRow attachments={data.attachments} />
      <ArticleActionsGroup />
    </Card>
  );
};
