import { createStyles } from '@mantine/core';
import { RADIUS } from '../../../styles/global-useStyles';

export const sideCardStyles = createStyles((theme) => ({
  card: {
    borderRadius: RADIUS.CARD,
    height: '100%',
    flex: 1,
  },
  textsContainer: {
    display: 'flex',
    gap: 9,
    flexDirection: 'column',
  },
}));
