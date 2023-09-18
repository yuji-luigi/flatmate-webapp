import { Divider, Text } from '@mantine/core';
import React from 'react';

export const DividerStyled = ({ label }: { label: string | React.ReactNode }) => (
  <Divider
    labelPosition="center"
    labelProps={{
      component: Text,
      // variant: 'filled',
      // color: 'blue',
      style: {
        fontSize: 16,
        fontWeight: 600,
        textTransform: 'uppercase',
      },
    }}
    label={label}
  />
);
