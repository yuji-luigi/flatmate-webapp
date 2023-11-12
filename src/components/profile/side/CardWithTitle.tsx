import { Card, Title, Text, Box, Indicator } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../data/icons/icons';
import { TEXT_SIZE } from '../../text/text-size';
import classes from './sideCardStyles.module.css';

interface Prop {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  titleSx?: any;
  style?: any;
  indicator?: React.ReactNode;
}
const CardWithTitle = ({ title, children, titleSx, style, indicator }: Prop) => {
  const indicatorTitle = indicator ? (
    <Indicator offset={-16} position="middle-end" size={16} color="red" label={indicator}>
      {title}
    </Indicator>
  ) : (
    title
  );
  const _title = title && (
    <Text style={{ display: 'flex', fontSize: TEXT_SIZE.titleCard, ...titleSx }} mb={8}>
      {indicatorTitle}
    </Text>
  );

  return (
    <Card className={classes.card} style={style}>
      {_title}
      <Box className={classes.textsContainer} style={{}}>
        {children}
      </Box>
    </Card>
  );
};

export default CardWithTitle;
