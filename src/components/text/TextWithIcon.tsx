import { Card, Title, Text, createStyles, Sx, Box } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../data/icons';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 12,
  },
  textRows: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
}));

const TextWithIcon = ({ icon, text, sx }: { icon: ReactJSXElement; text: string; sx?: Sx }) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Box className={classes.textRows} sx={sx}>
      <Box>{icon}</Box>
      <Text>{text}</Text>
    </Box>
  );
};

export default TextWithIcon;
