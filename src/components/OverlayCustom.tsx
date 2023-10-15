import { Box, Stack, StyleProperty, Sx } from '@mantine/core';
import React from 'react';

interface OverlayProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  sx?: Sx;
  sxOverlay?: Sx;
  onClick?: () => void;
}

const OverlayCustom = ({ children, icon, sx, sxOverlay, onClick }: OverlayProps) => {
  return (
    <Stack
      sx={{
        position: 'relative',
        transition: '0.3s',
        flex-direction: 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          opacity: 0,
          justifyContent: 'center',
          align-items: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          transition: '0.3s',
          cursor: 'pointer',
          ...sx,
          '&:hover': {
            display: 'flex',
            justifyContent: 'center',
            align-items: 'center',
            border-radius: 4,
            background: 'black',
            opacity: 0.5,
            transition: '0.3s',
            color: 'white',
            ...sxOverlay,
          },
        }}
        onClick={onClick}
      >
        {icon || '?'}
      </Box>
      {children}
    </Stack>
  );
};

export default OverlayCustom;
