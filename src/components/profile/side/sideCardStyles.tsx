import { createStyles } from '@mantine/core';
import { RADIUS } from '../../../styles/global-useStyles';

export const sideCardStyles = createStyles((theme) => ({
  card: {
    border-radius: RADIUS.CARD,
    height: '100%',
    flex: 1,
    overflow: 'visible',
  },
  textsContainer: {
    display: 'flex',
    // gap: 9,
    flex-direction: 'column',
  },
}));
