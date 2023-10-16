import { Box, Paper, PaperProps, Sx, createStyles } from '@mantine/core';
import React, { ReactNode } from 'react';

type PaperWithTitleProps = {
  title: ReactNode;
  children: ReactNode;
  sx: Sx;
} & PaperProps;

const useStyles = createStyles((theme) => ({
  title: {
    font-family: Greycliff CF, var(--mantine-font-family),
    font-size: 24,
    font-weight: 600,
    margin-bottom: --mantine - spacing - xl,
    padding-inline: --mantine - spacing - xl,
  },
}));

export const PaperWithTitle = ({ title, children, sx, ...others }: PaperWithTitleProps) => {
  const { classes } = useStyles();
  return (
    <Paper radius="lg" p="xl" withBorder {...others}>
      <Box className={classes.title}>{title}</Box>

      {children}
    </Paper>
  );
};
