import { RADIUS } from '../styles/global-useStyles';

export const CardOverride = () => {
  return {
    styles: {
      root: {
        borderRadius: RADIUS.CARD,
        // backgroundColor: bgColor,
        opacity: 0.8,
      },
    },
  };
};
