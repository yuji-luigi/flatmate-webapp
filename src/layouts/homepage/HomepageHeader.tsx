import { useRouter } from 'next/router';
import {
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Stack,
} from '@mantine/core';
// import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import classes from './HomepageHeader.module.css';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';

import useAuth from '../../../hooks/useAuth';
import { PATH_CLIENT } from '../../path/path-frontend';
import { useCookieContext } from '../../context/CookieContext';
import { EnterButton } from './EnterButton';
import { LoginButton } from './LoginButton';
import { SignUpButton } from './SignUpButton';
import { LogoBanner } from '../../components/banner/LogoBanner';

// const useStyles = createStyles((theme) => ({
//   link: {
//     display: 'flex',
//     align-items: 'center',
//     height: '100%',
//     paddingLeft: var(--mantine-spacing-md),
//     padding-right: var(--mantine-spacing-md),
//     textDecoration: 'none',
//     color: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
//     font-weight: 500,
//     font-size: theme.fontSizes.sm,

//     @media (max-width: $mantine-breakpoint-sm): {
//       height: 42,
//       display: 'flex',
//       align-items: 'center',
//       width: '100%',
//     },

//     &:hover{
//       background-color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
//     }),
//   },

//   subLink: {
//     width: '100%',
//     padding: `var(--mantine-spacing-xs)px var(--mantine-spacing-md)px`,
//     border-radius:var( --mantine-radius-md),

//     &:hover{
//       background-color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
//     }),

//     '&:active': theme.activeStyles,
//   },

//   dropdownFooter: {
//     background-color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
//     margin: -var(--mantine-spacing-md),
//     margin-top: var(--mantine-spacing-sm),
//     padding: `var(--mantine-spacing-md)px calc(var(--mantine-spacing-md) * 2px)`,
//     padding-bottom: var(--mantine-spacing-xl),
//     borderTop: `1px solid ${
//       light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-1))
//     }`,
//   },

//   hiddenMobile: {
//     @media (max-width: $mantine-breakpoint-sm): {
//       display: 'none',
//     },
//   },
//   mobileNav: {
//     @media (max-width: $mantine-breakpoint-sm): {
//       justify-content: 'space-between',
//       width: '100%',
//     },
//   },

//   hiddenDesktop: {
//     @media (min-width: $mantine-breakpoint-sm): {
//       display: 'none',
//       justify-content: 'flex-end',
//     },
//   },
// }));

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function HomepageHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { currentSpace, currentOrganization } = useCookieContext();
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const { user } = useAuth();
  const { push, pathname, replace } = useRouter();

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="filled" radius="md">
          <item.icon size={22} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const logNav = user ? (
    <>
      <Button variant="default" component={Link} href={PATH_CLIENT.logout}>
        Logout
      </Button>
      <EnterButton />
    </>
  ) : (
    <>
      <LoginButton />
      <SignUpButton />
    </>
  );

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" style={{ height: '100%' }}>
          {/* <MantineLogo size={30} /> */}
          <Group style={{ height: '100%' }} gap={0} className={classes.hiddenMobile}>
            <LogoBanner transparent />
            <Link href="/" className={classes.link}>
              Home
            </Link>
          </Group>

          <Group className={classes.mobileNav}>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
            <Group>
              {logNav}
              <ColorSchemeToggle variant="outline" />
            </Group>
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Flatmates"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea style={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" /* color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} */ />

          <a href="/" className={classes.link}>
            Home
          </a>

          <Divider my="sm" /* color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} */ />

          <Stack pb="xl" px="md">
            {logNav}
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
