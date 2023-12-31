import { Stack } from '@mantine/core';
import React, { ReactNode } from 'react';
import classes from './FeedView.module.css';

export const FeedView = ({ children }: { children: ReactNode }) => {
  return <Stack className={classes.feed}>{children}</Stack>;
};
