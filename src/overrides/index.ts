import { ActionIcon, Badge } from '@mantine/core';
import { CardOverride } from './CardOverrides';
import { BadgeOverride } from './BadgeOverrides';

export const components = {
  Card: CardOverride(),
  ActionIcon: ActionIcon.extend({
    defaultProps: {
      variant: 'subtle',
    },
  }),
  Badge: BadgeOverride(),
};
