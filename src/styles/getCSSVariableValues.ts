import { use } from 'react';

// Get the computed style of the root element
export const useGetCSSVariableValues = (): { sm: string; md: string; lg: string; xl: string } => {
  if (typeof window === 'undefined') {
    return {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    };
  }
  const computedStyle = getComputedStyle?.(document.documentElement);
  const xs = computedStyle?.getPropertyValue('--break-point-xs').trim();
  const sm = computedStyle?.getPropertyValue('--break-point-sm').trim();
  const md = computedStyle?.getPropertyValue('--break-point-md').trim();
  const lg = computedStyle?.getPropertyValue('--break-point-lg').trim();
  const xl = computedStyle?.getPropertyValue('--break-point-xl').trim();

  // Retrieve the value of the specific CSS custom property
  const breakpoints = {
    xs,
    sm,
    md,
    lg,
    xl,
  };
  return breakpoints;
};
