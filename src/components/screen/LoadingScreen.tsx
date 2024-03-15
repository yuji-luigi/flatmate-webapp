import { Box, Loader, LoadingOverlay } from '@mantine/core';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
      }}
      pos="relative"
    >
      <Box style={{ minHeight: '100vh' }} />
      <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      {/* ...other content */}
    </Box>
  );
};

export default LoadingScreen;
