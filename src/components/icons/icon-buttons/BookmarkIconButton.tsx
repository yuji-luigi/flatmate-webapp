import { ActionIcon, useMantineTheme } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import React from 'react';
import classes from './ActionIconStyle.module.css';

export const BookmarkIconButton = () => {
  const theme = useMantineTheme();
  return (
    <ActionIcon className={classes.action}>
      <IconBook size="1rem" className={classes.yellow7} color={theme.colors.yellow[7]} />
    </ActionIcon>
  );
};
