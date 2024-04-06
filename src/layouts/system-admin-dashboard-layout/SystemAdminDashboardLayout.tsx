import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  ScrollArea,
  Skeleton,
  Stack,
  Tabs,
} from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { SystemAdminDashboardHeaderSearch } from "./header/SystemAdminDashboardHeaderSearch";
import useLayoutContext from "../../../hooks/useLayoutContext";
import { useCookieContext } from "../../context/CookieContext";
import classes from "./SystemAdminLayout.module.css";
import classesNav from "../dashboard/navbar/NavbarVertical.module.css";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import useAuth from "../../../hooks/useAuth";
import { NavbarVertical } from "../dashboard/navbar/NavbarVertical";
import { ColorSchemeToggle } from "../../components/color-schemeToggle/ColorSchemeToggle";
import { ProfilePopover } from "../../components/navigation/ProfilePopover";
import LogoutButton from "../dashboard/navbar/LogoutButton";

const SystemAdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  // const { setCurrentTab, currentTab } = useTabContext()
  const { isOpen } = useLayoutContext();
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string | null>(
    (router.query.tab as string) || "dashboard"
  );
  const { currentSpace } = useCookieContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollY } = window;
        const speed = 0.2; // Adjust this value to change the speed. Values between 0.1 to 1 work best.
        const offset = scrollY * speed;
        containerRef.current.style.backgroundPosition = `center ${-offset}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setCurrentTab(router.query.tab as string);
  }, [router.query.tab]);

  const handleChangeTab = (value: string | null) => {
    router.replace(`${_PATH_FRONTEND.dashboard.root}?tab=${value}`);
  };
  if (!isInitialized) return <SimpleLayout />;
  if (!user) {
    router.push(_PATH_FRONTEND.auth.login);
  }
  return (
    <Tabs
      onChange={handleChangeTab}
      keepMounted={false}
      defaultValue="dashboard"
      value={currentTab}
    >
      <SystemAdminDashboardHeaderSearch />
      <Box
        data-loggedas={user?.loggedAs}
        ref={containerRef}
        className={`${classes.pageContent} ${classes.bg}`}
        style={{
          paddingTop: 55,
          backgroundImage: `url(${currentSpace?.image})`,
        }}
      >
        <NavbarVertical />
        <Box data-is-pen={isOpen} className={classes.contentWrapper}>
          {children}
        </Box>
      </Box>
    </Tabs>
  );
};

const SimpleLayout = () => {
  const { currentSpace } = useCookieContext();
  const { user } = useAuth();
  const { isOpen, closeBar } = useLayoutContext();
  const isMediaScreen = useMediaQuery("(max-width: 750px)");
  const isSuperAdmin = user?.isSuperAdmin;
  const chooseText = isSuperAdmin ? "Organization" : "Space";

  const chooseHref = "";
  return (
    <Box
      className={`${classes.pageContent} ${classes.bg}`}
      style={{
        // paddingTop: 55,
        backgroundImage: `url(${currentSpace?.image})`,
      }}
    >
      <nav className={`${classesNav.navbar} nav-bar-vertical`} data-show="true" data-hidden="false">
        <ScrollArea>
          <div className={classesNav.navbarMain}>
            {/* <ProfilePopover /> */}
            <Divider className={classesNav.divider} />
          </div>
          <Stack>
            <Group>
              <Skeleton height={50} width={50} circle />
              <Skeleton height={50} width={200} />
            </Group>
            <Skeleton height={30} width={300} />
            <Skeleton height={30} width={300} />
            <Skeleton height={30} width={300} />
          </Stack>
          <div className={classesNav.footer}>
            <Stack>
              <Skeleton height={30} width={300} />
            </Stack>
          </div>
        </ScrollArea>
      </nav>
      <Box className={`${classes.invBox} `} data-fadein={isOpen} onClick={closeBar} />{" "}
      <Box className={classes.contentWrapper}></Box>
    </Box>
  );
};

export default SystemAdminDashboardLayout;
