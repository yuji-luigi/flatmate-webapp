import React from 'react';
import { RADIUS } from '../global-useStyles';
import { Card } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};
export const CardStyled = (props: Props) => {
  return (
    <Card
      sx={{
        borderRadius: RADIUS.CARD,
      }}
    >
      {props.children}
    </Card>
  );
};
