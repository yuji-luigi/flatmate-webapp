import { Badge, Text, Box, useMantineTheme, Tooltip, Sx } from '@mantine/core';
import React, { use } from 'react';
import { Icons } from '../../data/icons/icons';

const BadgeWithToolTip = ({
  icon,
  text,
  disabled,
  sx,
}: {
  icon?: JSX.Element;
  text: string;
  disabled?: boolean;
  sx?: Sx;
}) => {
  const theme = useMantineTheme();
  const dark = theme.colorScheme === 'dark';
  return (
    <Tooltip
      disabled={disabled}
      label={text}
      withArrow
      multiline
      // width={220}
    >
      <Badge sx={{ cursor: 'pointer', paddingBlock: 16, ...sx }}>
        <Text color={dark ? '' : 'black'} truncate weight={300}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && <Box mr={4}>{icon}</Box>}
            {text}
          </Box>
        </Text>
      </Badge>
    </Tooltip>
  );
};

export default BadgeWithToolTip;
