"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Box, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import { DashboardHeaderSearch } from "./header/DashboardHeaderSearch";
import { NavbarVertical } from "./navbar/NavbarVertical";
import useLayoutContext from "../../../hooks/useLayoutContext";
import { useCookieContext } from "../../context/CookieContext";
import classes from "./DashboardLayout.module.css";
import { PATH_CLIENT, PATH_DASHBOARD_ROOT, _PATH_FRONTEND } from "../../path/path-frontend";
import useAuth from "../../../hooks/useAuth";
import LoadingScreen from "../../components/screen/LoadingScreen";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const { setCurrentTab, currentTab } = useTabContext()

  const { isOpen } = useLayoutContext();
  const { user } = useAuth();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string | null>(
    (router.query.tab as string) || "dashboard"
  );
  const { currentSpace } = useCookieContext();
  const containerRef = useRef<HTMLDivElement>(null);
  // const bgColor = theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
  // const section = router.pathname.split('/').pop();
  useEffect(() => {
    // setCurrentTab(dashboardTabsByUserType[0].value);
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

  if (!user?.loggedAs) {
    router.push(PATH_CLIENT.login);
    return <LoadingScreen />;
  }
  const handleChangeTab = (value: string | null) => {
    router.push({
      pathname: PATH_DASHBOARD_ROOT[user.loggedAs],
      query: { tab: value },
    });
  };

  if (user?.loggedAs === "system_admin") {
    router.push(_PATH_FRONTEND.systemAdmin.root);
  }
  return (
    <Tabs
      onChange={handleChangeTab}
      keepMounted={false}
      defaultValue="dashboard"
      value={currentTab}
    >
      <DashboardHeaderSearch />
      <Box
        data-loggedas={user?.loggedAs}
        ref={containerRef}
        className={`${classes.pageContent} ${classes.bg}`}
        style={{
          paddingTop: 55,
          ...(currentSpace?.image && { backgroundImage: `url(${currentSpace?.image})` }),
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

export default DashboardLayout;
