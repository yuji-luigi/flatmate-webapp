import { Group, Avatar, Tooltip, Box } from '@mantine/core';
import React from 'react';
import classes from './TextOnHoverCell.module.css';

export const TextOnHoverCell = ({ cellValue }: { cellValue: string }) => {
  const text = cellValue.length > 9 ? `${cellValue.slice(0, 10)}...` : cellValue;
  const Label = <Box className={classes.tooltip}>{cellValue}</Box>;
  return (
    <Tooltip label={Label}>
      <Box>{text}</Box>
    </Tooltip>
  );
};
