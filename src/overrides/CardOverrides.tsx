import { RADIUS } from '../styles/global-useStyles';

export const CardOverride = (colorScheme: string) => {
  const bgColor =
    colorScheme === 'dark' ? 'var(--mantine-color-scheme-dark)' : 'var(--mantine-white)';
  return {
    styles: {
      root: {
        borderRadius: RADIUS.CARD,
        // backgroundColor: bgColor,
        opacity: 0.85,
      },
    },
  };
};
