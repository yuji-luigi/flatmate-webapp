import { useMantineTheme } from '@mantine/core';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';
import AuthGuard from '../../guards/AuthGuard';
import GuestGuard from '../../guards/GuestGuard';
import { PropWithChildren } from '../../types/general/config';
import { HomepageHeader } from './HomepageHeader';

export function HomepageLayout(props: PropWithChildren) {
  const theme = useMantineTheme();
  // const isSmall = theme.fn.smallerThan('sm');
  return (
    <>
      <HomepageHeader />
      {props.children}
      {/* {theme.fn.smallerThan('sm') && <ColorSchemeToggle />} */}
    </>
  );
}
