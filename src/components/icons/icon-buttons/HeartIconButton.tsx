import { ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import React from 'react';
import { useActionIconStyles } from './ActionIconStyle';

export const HeartIconButton = () => {
  const { classes, theme } = useActionIconStyles();
  return (
    <ActionIcon className={classes.action}>
      <IconHeart size="1rem" color={theme.colors.red[6]} />
    </ActionIcon>
  );
};
