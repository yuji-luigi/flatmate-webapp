import { ActionIcon } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';
import React from 'react';
import { useActionIconStyles } from './ActionIconStyle';

export const ShareIconButton = () => {
  const { classes, theme } = useActionIconStyles();
  return (
    <ActionIcon className={classes.action}>
      <IconShare size="1rem" />
    </ActionIcon>
  );
};
