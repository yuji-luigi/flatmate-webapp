import { useRouter } from 'next/router';
import {
  createStyles,
  Header,
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
  Anchor,
  Center,
  HoverCard,
  SimpleGrid,
  Transition,
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
  IconChevronDown,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';

import useAuth from '../../../hooks/useAuth';
import { PATH_CLIENT } from '../../path/path-frontend';
import { useCookieContext } from '../../context/CookieContext';
import { EnterButton } from './EnterButton';
import { LoginButton } from './LoginButton';
import { SignUpButton } from './SignUpButton';
import { LogoBanner } from '../../components/banner/LogoBanner';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: 42,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px calc(${theme.spacing.md} * 2px)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  mobileNav: {
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
      width: '100%',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
      justifyContent: 'flex-end',
    },
  },
}));

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
  const { classes, theme } = useStyles();
  const { push, pathname } = useRouter();

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="filled" radius="md">
          <item.icon size={22} color={theme.primaryColor} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
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

  // return null;
  return (
    <Box sx={{ marginBottom: 59 }}>
      <Header fixed height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          {/* <MantineLogo size={30} /> */}
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <LogoBanner transparent />
            <Link href="/" className={classes.link}>
              Home
            </Link>
            {/* <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              onOpen={() => {
                console.log('open');
                setDropdownOpened(true);
              }}
              onClose={() => setDropdownOpened(false)}
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown color={theme.primaryColor} />
                  </Center>
                </a>
              </HoverCard.Target>
              <Transition
                mounted={dropdownOpened}
                transition="pop-top-left"
                duration={900}
                timingFunction="ease"
              >
                {(styles) => (
                  <div style={styles}>
                    <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                      <Group position="apart" px="md">
                        <Text weight={500}>Features</Text>
                        <Anchor href="#" size="xs">
                          View all
                        </Anchor>
                      </Group>

                      <Divider
                        my="sm"
                        mx="-md"
                        color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                      />

                      <SimpleGrid cols={2} spacing={0}>
                        {links}
                      </SimpleGrid>

                      <div className={classes.dropdownFooter}>
                        <Group position="apart">
                          <div>
                            <Text weight={500} size="sm">
                              Get started
                            </Text>
                            <Text size="xs" color="dimmed">
                              Their food sources have decreased, and their numbers
                            </Text>
                          </div>
                          <Button variant="default">Get started</Button>
                        </Group>
                      </div>
                    </HoverCard.Dropdown>
                  </div>
                )}
              </Transition>
            </HoverCard> */}
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
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Flatmates"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="/" className={classes.link}>
            Home
          </a>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Stack pb="xl" px="md">
            {logNav}
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
