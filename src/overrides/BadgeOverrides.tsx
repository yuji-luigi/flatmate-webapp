import { Badge, Card, useMantineColorScheme } from '@mantine/core';
// import classes from './CardOverrides.module.css';

export const BadgeOverride = () => {
  return Badge.extend({
    defaultProps: {
      variant: 'light',
    },
  });
};
