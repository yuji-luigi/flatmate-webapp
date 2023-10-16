import { createStyles } from '@mantine/core';

export const useActionIconStyles = createStyles((theme) => ({
  articleArea: {
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
