import { Text, Box, Group, MantineStyleProp } from '@mantine/core';
import React from 'react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { TEXT_SIZE } from './text-size';
import classes from './TextWithIcon.module.css';

const TextWithIcon = ({
  icon,
  text,
  style,
  textSm = false,
  textLg = false,
}: {
  icon?: ReactJSXElement;
  text: string;
  style?: MantineStyleProp;
  textSm?: boolean;
  textLg?: boolean;
}) => {
  if (textSm) {
    return (
      <Box className={classes.textRows} style={style}>
        <Box>{icon}</Box>
        <Text fz={TEXT_SIZE.cardTile}>{text}</Text>
      </Box>
    );
  }
  return (
    <Group wrap="nowrap" gap={10} mt={3}>
      {icon}
      <Text fz="sm" tt="uppercase" fw={500}>
        {text}
      </Text>
    </Group>
  );
};

export default TextWithIcon;
