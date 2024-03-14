import { Badge, Text, Box, useMantineTheme, Tooltip, MantineStyleProp } from '@mantine/core';
import React, { use } from 'react';
import { Icons } from '../../data/icons/icons';
import classes from './BadgeWithToolTip.module.css';
import { truncateString } from '../../utils/helpers/truncateString';

const BadgeWithToolTip = ({
  icon,
  text,
  disabled,
  style,
  textLength,
}: {
  icon?: JSX.Element;
  text: string;
  disabled?: boolean;
  style?: MantineStyleProp;
  textLength?: number;
}) => {
  const theme = useMantineTheme();
  // const dark = theme.colorScheme === 'dark';
  return (
    <Tooltip disabled={disabled} label={text} withArrow multiline>
      <Badge style={{ cursor: 'pointer', paddingBlock: 16, ...style }}>
        <Text className={classes.text} fw={300}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            {icon && <Box mr={4}>{icon}</Box>}
            {truncateString(text, textLength)}
          </Box>
        </Text>
      </Badge>
    </Tooltip>
  );
};

export default BadgeWithToolTip;
