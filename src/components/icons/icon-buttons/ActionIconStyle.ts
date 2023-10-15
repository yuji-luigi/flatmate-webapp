import { createStyles } from '@mantine/core';

export const useActionIconStyles = createStyles((theme) => ({
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
