import { ActionIcon } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import React from 'react';
import { useActionIconStyles } from './ActionIconStyle';

export const BookmarkIconButton = () => {
  const { classes, theme } = useActionIconStyles();
  return (
    <ActionIcon className={classes.action}>
      <IconBook size="1rem" color={theme.colors.yellow[7]} />
    </ActionIcon>
  );
};
