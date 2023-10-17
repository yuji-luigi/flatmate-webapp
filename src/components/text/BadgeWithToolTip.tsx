import { Badge, Text, Box, useMantineTheme, Tooltip, MantineStyleProp } from '@mantine/core';
import React, { use } from 'react';
import { Icons } from '../../data/icons/icons';
import classes from './BadgeWithToolTip.module.css';

const BadgeWithToolTip = ({
  icon,
  text,
  disabled,
  style,
}: {
  icon?: JSX.Element;
  text: string;
  disabled?: boolean;
  style?: MantineStyleProp;
}) => {
  const theme = useMantineTheme();
  // const dark = theme.colorScheme === 'dark';
  return (
    <Tooltip disabled={disabled} label={text} withArrow multiline>
      <Badge style={{ cursor: 'pointer', paddingBlock: 16, ...style }}>
        <Text className={classes.text} truncate fw={300}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {icon && <Box mr={4}>{icon}</Box>}
            {text}
          </Box>
        </Text>
      </Badge>
    </Tooltip>
  );
};

export default BadgeWithToolTip;
