import { Box, Loader, LoadingOverlay } from '@mantine/core';
import React from 'react';

const LoadingScreen = () => {
  // return <Loader size={41} />;
  // return (
  //   <Box pos="relative">
  //     <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

  //     <Box style={{ minHeight: '100vh' }} />
  //   </Box>
  // );
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
