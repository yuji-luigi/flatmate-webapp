import { useRouter } from "next/router";
import { Group, Button, Divider, Box, Burger, Drawer, ScrollArea, Stack } from "@mantine/core";
// import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { HomepageDrawer } from "../drawer/HomepageDrawer";
import classes from "./HomepageHeader.module.css";
import { ColorSchemeToggle } from "../../../../components/color-schemeToggle/ColorSchemeToggle";

import useAuth from "../../../../../hooks/useAuth";
import { PATH_CLIENT } from "../../../../path/path-frontend";
import { EnterButton } from "./EnterButton";
import { LoginButton } from "./LoginButton";
import { SignUpButton } from "./SignUpButton";
import { LogoBanner } from "../../../../components/banner/LogoBanner";
import { LanguageMenu } from "../../../../components/menu/LanguageMenu/LanguageMenu";
import { LanguageMenuSmall } from "../../../../components/menu/LanguageMenu/LanguageMenuSmall";
import DisplayController from "../../../../components/util-components/DisplayController";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HomepageHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { user } = useAuth();
  const { pathname } = useRouter();

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  const logNav = user ? (
    <>
      <LoginButton variant="outlined" />
      <Button variant="default" component={Link} href={PATH_CLIENT.logout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <LoginButton variant="outlined" />
      <SignUpButton variant="default" />
    </>
  );

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" style={{ height: "100%" }}>
          {/* <MantineLogo size={30} /> */}
          <Group style={{ height: "100%" }} gap={0} className={classes.hiddenMobile}>
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
              <Group className={classes.utils}>
                <ColorSchemeToggle variant="outline" />
                <LanguageMenu />
              </Group>
            </Group>
          </Group>
        </Group>
      </header>

      <HomepageDrawer drawerOpened={drawerOpened} closeDrawer={closeDrawer} />
    </Box>
  );
}
