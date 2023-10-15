import { Card, Title, Text, createStyles, Sx, Box, Group } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Icons } from '../../data/icons/icons';
import { TEXT_SIZE } from './text-size';
import { RADIUS } from '../../styles/global-useStyles';

const useStyles = createStyles((theme) => ({
  card: {
    border-radius: RADIUS.CARD,
  },
  textRows: {
    display: 'flex',
    align-items: 'center',
    gap: 8,
  },
}));

const TextWithIcon = ({
  icon,
  text,
  sx,
  textSm = false,
  textLg = false,
}: {
  icon: ReactJSXElement;
  text: string;
  sx?: Sx;
  textSm?: boolean;
  textLg?: boolean;
}) => {
  const { classes, cx, theme } = useStyles();
  if (textSm) {
    return (
      <Box className={classes.textRows} sx={sx}>
        <Box>{icon}</Box>
        <Text size={TEXT_SIZE.cardTile}>{text}</Text>
      </Box>
    );
  }
  return (
    <Group noWrap spacing={10} mt={3}>
      {icon}
      <Text fz="sm" tt="uppercase" fw={500}>
        {text}
      </Text>
    </Group>
  );
};

export default TextWithIcon;
