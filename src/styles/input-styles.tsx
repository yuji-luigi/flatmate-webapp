import { createStyles, rem } from '@mantine/core';

export const containerInputStyles = createStyles((theme) => ({
  root: {
    position: relative,
  },

  input: {
    height: rem(54),
    padding-top: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    font-size: theme.fontSizes.xs,
    paddingLeft: --mantine - spacing - sm,
    padding-top: `calc(${--mantine - spacing - sm} / 2)`,
    zIndex: 1,
  },
}));
