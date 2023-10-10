import { Card, Title, Text, createStyles, Box, Sx, Indicator } from '@mantine/core';
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
  indicator?: React.ReactNode;
}
const CardWithTitle = ({ title, children, titleSx, sx, indicator }: Prop) => {
  const { classes, cx, theme } = sideCardStyles();

  const indicatorTitle = indicator ? (
    <Indicator offset={-16} position="middle-end" size={16} color="red" label={indicator}>
      {title}
    </Indicator>
  ) : (
    title
  );
  const _title = title && (
    <Title sx={{ display: 'flex', fontSize: TEXT_SIZE.titleCard, ...titleSx }} mb={8}>
      {indicatorTitle}
    </Title>
  );

  return (
    <Card className={classes.card} sx={sx}>
      {_title}
      <Box className={classes.textsContainer} sx={{}}>
        {children}
      </Box>
    </Card>
  );
};

export default CardWithTitle;
