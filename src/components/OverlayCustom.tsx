import { Box, MantineStyleProp, Stack } from '@mantine/core';
import React, { CSSProperties } from 'react';

interface OverlayProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  styleOverlay?: CSSProperties;
  style: MantineStyleProp;
  onClick?: () => void;
}

const OverlayCustom = ({ children, icon, style, styleOverlay, onClick }: OverlayProps) => {
  return (
    <Stack
      style={{
        position: 'relative',
        transition: '0.3s',
        flexDirection: 'row',
      }}
    >
      <Box
        style={{
          display: 'flex',
          opacity: 0,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          transition: '0.3s',
          cursor: 'pointer',
          ...style,
          '&:hover': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            background: 'black',
            opacity: 0.5,
            transition: '0.3s',
            color: 'white',
            ...styleOverlay,
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
