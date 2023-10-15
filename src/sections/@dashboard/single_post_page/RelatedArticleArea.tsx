import { Card, Group, Box, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  // card: {
  //   position: 'relative',
  //   background-color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  //   minHeight: '100vh',
  // },
  // header: {
  //   marginBottom: 50,
  // },
  // rating: {
  //   position: 'absolute',
  //   top: var(--mantine-spacing-xs,
  //   right: rem(12),
  //   pointerEvents: 'none',
  // },

  // title: {
  //   display: 'block',
  //   fontSize: 50,
  //   margin-top: var(--mantine-spacing-md,
  //   marginBottom: rem(5),
  // },
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

const RelatedArticlesArea = () => {
  const { classes, cx, theme } = useStyles();
  const relatedArticles = false;
  if (!relatedArticles) {
    return null;
  }
  return (
    <Card className={classes.articleArea}>
      <Group position="apart" align="flex-end" className={classes.footer}>
        <Box className={classes.relatedArticlesSection}></Box>
      </Group>
    </Card>
  );
};

export default RelatedArticlesArea;
