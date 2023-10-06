import { Card, Group, ActionIcon, createStyles, Divider, Box, Text } from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import React from 'react';
import ImagesInArticle from '../carousel/ImagesInArticle';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { ArticleActionsGroup } from '../icons/icon-buttons/ArticleActionsGroup';
import { ThreadModel } from '../../types/models/thread-model';

const useStyles = createStyles((theme) => ({
  articleArea: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    boxShadow: theme.shadows.xl,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  articleMenuDivider: {
    marginBlock: theme.spacing.xl,
  },
  relatedArticlesSection: {
    maxWidth: 300,
  },
  footer: {
    // paddingTop: theme.spacing.xl,
  },
}));

export const SingleArticleCard = ({ data }: { data: MaintenanceModel | ThreadModel }) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Card className={classes.articleArea}>
      <div>
        <Text fw={500}>{data.description}</Text>
      </div>
      {data.images.length && <ImagesInArticle images={data.images} />}
      <ArticleActionsGroup />
    </Card>
  );
};
