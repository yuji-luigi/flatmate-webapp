import { Box, MantineStyleProp, Paper, PaperProps } from '@mantine/core';
import React, { ReactNode } from 'react';
import classes from './PaperWithTitle.module.css';

type PaperWithTitleProps = {
  title: ReactNode;
  children: ReactNode;
  sx: MantineStyleProp;
} & PaperProps;

export const PaperWithTitle = ({ title, children, sx, ...others }: PaperWithTitleProps) => {
  return (
    <Paper radius="lg" p="xl" withBorder {...others}>
      <Box className={classes.title}>{title}</Box>

      {children}
    </Paper>
  );
};
