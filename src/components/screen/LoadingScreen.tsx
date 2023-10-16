import { Box, LoadingOverlay } from '@mantine/core';
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
      <LoadingOverlay visible overlayBlur={2} />
      {/* ...other content */}
    </Box>
  );
};

export default LoadingScreen;
