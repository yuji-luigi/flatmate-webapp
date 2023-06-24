import { Box, Paper, PaperProps, Sx, createStyles } from '@mantine/core';
import React, { ReactNode } from 'react';

type PaperWithTitleProps = {
  title: ReactNode;
  children: ReactNode;
  sx: Sx;
} & PaperProps;

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 24,
    fontWeight: 600,
    marginBottom: theme.spacing.xl,
    paddingInline: theme.spacing.xl,
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
