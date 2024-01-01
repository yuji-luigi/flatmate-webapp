import { Stack } from '@mantine/core';
import React from 'react';

export const ExpandedSection = ({ children }: { children: React.ReactNode }) => {
  return <Stack style={{ height: '100%' }}>{children}</Stack>;
};
