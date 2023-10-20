import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import React from 'react';
import classes from './ActionIconStyle.module.css';

export const HeartIconButton = () => {
  const theme = useMantineTheme();
  return (
    <ActionIcon className={classes.action}>
      <IconHeart size="1rem" color={theme.colors.red[6]} />
    </ActionIcon>
  );
};
