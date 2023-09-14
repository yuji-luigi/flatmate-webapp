import React from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

const MantineCustomThemeProvider = () => {
  return (
    <MantineProvider>
      <div>MantineCustomThemeProvider</div>
    </MantineProvider>
  );
};

export default MantineCustomThemeProvider;
