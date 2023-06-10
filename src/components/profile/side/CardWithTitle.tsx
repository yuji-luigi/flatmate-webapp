import { Card, Title, Text, createStyles, Box, Sx } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../data/icons';
import TextWithIcon from '../../text/TextWithIcon';

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 12,
  },
  textsContainer: {
    display: 'flex',
    gap: 9,
    flexDirection: 'column',
  },
}));

interface Prop {
  title?: string;
  children?: React.ReactNode;
  titleSx?: Sx;
}
const CardWithTitle = ({ title, children, titleSx }: Prop) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Card className={classes.card}>
      {title && (
        <Title sx={{ ...titleSx }} mb={8}>
          {title}
        </Title>
      )}
      <Box className={classes.textsContainer} sx={{}}>
        {children}
      </Box>
    </Card>
  );
};

export default CardWithTitle;
