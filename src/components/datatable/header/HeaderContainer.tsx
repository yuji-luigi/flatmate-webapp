import { Box } from '@mantine/core';
import React, { ReactNode } from 'react';

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ paddingTop: 24, paddingInline: 32, marginBottom: 24 }}>{children}</Box>;
};
