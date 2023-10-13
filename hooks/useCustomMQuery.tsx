import React from 'react';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetCSSVariableValues } from '../src/styles/getCSSVariableValues';

export const useCustomMQuery = () => {
  // const theme = useMantineTheme();
  const BREAKPOINTS = useGetCSSVariableValues();
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.md})`);
  const isLargeScreen = useMediaQuery(`(min-width: ${BREAKPOINTS.lg})`);

  return { isMobile, isLargeScreen };
};
