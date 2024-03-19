import { Card } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
// import classes from './CardOverrides.module.css';

export const CardOverride = () => {
  return Card.extend({
    defaultProps: {
      style: {
        opacity: 0.8,
        borderRadius: 12,
      },
    },
  });
};
