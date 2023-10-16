import { Card, Title, Text, createStyles, Box, Sx } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../data/icons/icons';
import TextWithIcon from '../../text/TextWithIcon';
import { TEXT_SIZE } from '../../text/text-size';
import { RADIUS } from '../../../styles/global-useStyles';
import { sideCardStyles } from './sideCardStyles';

interface Prop {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  titleSx?: Sx;
  sx?: Sx;
}
const CardWithTitle = ({ title, children, titleSx, sx }: Prop) => {
  const { classes, cx, theme } = sideCardStyles();
  return (
    <Card className={classes.card} style={sx}>
      {title && (
        <Title style={{ fontSize: TEXT_SIZE.titleCard, ...titleSx }} mb={8}>
          {title}
        </Title>
      )}
      <Box className={classes.textsContainer} style={{}}>
        {children}
      </Box>
    </Card>
  );
};

export default CardWithTitle;
