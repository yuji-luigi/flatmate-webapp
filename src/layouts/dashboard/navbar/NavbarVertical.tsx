import { Fragment, useEffect, useState } from "react";
import { ScrollArea, Button, Stack, Box, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
} from "@tabler/icons-react";
import useLayoutContext from "../../../../hooks/useLayoutContext";
import useAuth from "../../../../hooks/useAuth";
import { sectionData } from "../../../data";

import { PATH_CLIENT } from "../../../path/path-frontend";
import { ProfilePopover } from "../../../components/navigation/ProfilePopover";
import { NavbarVerticalItem } from "./NavbarVerticalItem";
// import classes from './navbarStyle.module.css';
import { ColorSchemeToggle } from "../../../components/color-schemeToggle/ColorSchemeToggle";
import LogoutButton from "./LogoutButton";
import classes from "./NavbarVertical.module.css";
import { NavList } from "./NavList";

const data = [
  { link: "", label: "Notifications", icon: IconBellRinging },
  { link: "", label: "Billing", icon: IconReceipt2 },
  { link: "", label: "Security", icon: IconFingerprint },
  { link: "", label: "SSH Keys", icon: IconKey },
  { link: "", label: "Databases", icon: IconDatabaseImport },
  { link: "", label: "Authentication", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export function NavbarVertical() {
  const [active, setActive] = useState("Billing");
  const { user } = useAuth();
  const { isOpen, closeBar } = useLayoutContext();
  const isMediaScreen = useMediaQuery("(max-width: 750px)");
  const isSuperAdmin = user?.isSuperAdmin;
  const chooseText = isSuperAdmin ? "Organization" : "Space";
  // const isMobile = useMediaQuery('(max-width: 600px)');

  const chooseHref = isSuperAdmin ? PATH_CLIENT.chooseOrganization : PATH_CLIENT.chooseRootSpace;

  if (!user) return null;

  return (
    <>
      <nav
        className={`${classes.navbar} nav-bar-vertical`}
        data-show={isOpen}
        data-hidden={!isOpen}
      >
        <ScrollArea>
          <div className={classes.navbarMain}>
            <ProfilePopover />
            <Divider className={classes.divider} />
          </div>
          {sectionData.map((section, i) => (
            <NavList key={section.name} section={section} />
          ))}
          <div className={classes.footer}>
            <Stack>
              <LogoutButton />
              {isMediaScreen && (
                <>
                  <Button
                    className={`${classes.button} ${classes.link}`}
                    component={Link}
                    variant="outline"
                    href={chooseHref}
                  >
                    Choose {chooseText}
                  </Button>
                  <ColorSchemeToggle />
                </>
              )}
            </Stack>
          </div>
        </ScrollArea>
      </nav>
      <Box className={`${classes.invBox} `} data-fadein={isOpen} onClick={closeBar} />
    </>
  );
}
