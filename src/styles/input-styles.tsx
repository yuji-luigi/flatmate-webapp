import { createStyles, rem } from '@mantine/core';

export const containerInputStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: --mantine - spacing - sm,
    paddingTop: `calc(${--mantine - spacing - sm} / 2)`,
    zIndex: 1,
  },
}));
