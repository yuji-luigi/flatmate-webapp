import { ScrollArea, Button, Stack, Box, Divider, Group } from "@mantine/core";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import useLayoutContext from "../../../../hooks/useLayoutContext";
import useAuth from "../../../../hooks/useAuth";
import { sectionData } from "../../../json/section-json";

import { PATH_CLIENT } from "../../../path/path-frontend";
import { ProfilePopover } from "../../../components/navigation/ProfilePopover";
import { ColorSchemeToggle } from "../../../components/color-schemeToggle/ColorSchemeToggle";
import LogoutButton from "./LogoutButton";
import classes from "./NavbarVertical.module.css";
import { NavList } from "./NavList";
import { Icons } from "../../../data/icons/icons";

export function NavbarVertical() {
  const { user } = useAuth();
  const { isOpen, closeBar } = useLayoutContext();
  const isMediaScreen = useMediaQuery("(max-width: 750px)");
  const isSuperAdmin = user?.isSuperAdmin;
  const chooseText = isSuperAdmin ? "Organization" : "Space";

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
          {sectionData[user.loggedAs].map((section, i) => (
            <NavList key={section.name} section={section} />
          ))}
          {user.isSystemAdmin && (
            <Link
              className={classes.link}
              // data-active={isActive || undefined}
              href="#"
            >
              <Group align="center">
                <Icons.alert className={classes.linkIcon} stroke={1.5} />
                System Admin menu
              </Group>
            </Link>
          )}
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
