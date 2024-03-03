import { Box, MantineStyleProp, Stack } from '@mantine/core';
import React, { CSSProperties } from 'react';
import { Icons } from '../data/icons/icons';

interface OverlayProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  // styleOverlay?: CSSProperties;
  style?: MantineStyleProp;
  onClick?: () => void;
}

const OverlayCustom = ({ children, icon, style, /* styleOverlay */ onClick }: OverlayProps) => {
  return (
    <Stack className="gallery-overlay-container">
      <Box className="gallery-overlay" onClick={onClick}>
        {icon || <Icons.image size={50} />}
      </Box>
      <div className="crud-form-image-gallery">{children}</div>
    </Stack>
  );
};

export default OverlayCustom;
