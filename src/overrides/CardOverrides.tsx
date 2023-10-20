import { Card } from '@mantine/core';
// import classes from './CardOverrides.module.css';

export const CardOverride = () => {
  return Card.extend({
    defaultProps: {
      style: {
        opacity: 0.8,
      },
    },
  });
};
