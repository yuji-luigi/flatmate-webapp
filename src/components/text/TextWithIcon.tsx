import { Card, Title, Text, createStyles, Sx, Box, Group } from '@mantine/core';
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
        <Text>{text}</Text>
      </Box>
    );
  }
  return (
    <Group noWrap spacing={10} mt={3}>
      {icon}
      <Text fz="md" tt="uppercase" fw={700} /* c="dimmed" */>
        {text}
      </Text>
    </Group>
  );
};

export default TextWithIcon;
