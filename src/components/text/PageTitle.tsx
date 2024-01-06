import { Text } from '@mantine/core';
import React, { ReactNode } from 'react';
import classes from './PageTitle.module.css';

export const PageTitle = ({ title = '' }: { title?: string }) => {
  return <Text className={classes.title}>{title}</Text>;
};
