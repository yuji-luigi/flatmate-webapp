import { Box, rem } from '@mantine/core';
// import { CanvasAttributes } from '../../data';

interface ComponentPreviewProps {
  children: React.ReactNode;
  canvas: any;
  // canvas: CanvasAttributes['canvas'];
  withSpacing?: boolean;
}

export function ComponentPreview({ children, canvas, withSpacing = false }: ComponentPreviewProps) {
  return (
    <Box
      style={{
        paddingTop: canvas?.max-width && withSpacing ? rem(40) : 0,
        max-width: canvas?.max-width ? rem(canvas.max-width) : '100%',
        marginLeft: canvas?.center ? 'auto' : 'unset',
        marginRight: canvas?.center ? 'auto' : 'unset',
      }}
    >
      {children}
    </Box>
  );
}
