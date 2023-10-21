import React from 'react';
import { Card } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};
export const CardStyled = (props: Props) => {
  return (
    <Card
      style={{
        borderRadius: 12,
      }}
    >
      {props.children}
    </Card>
  );
};
