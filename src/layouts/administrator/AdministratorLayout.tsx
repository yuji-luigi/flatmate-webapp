import { ReactNode, useEffect, useRef, useState } from "react";
import { Box, Tabs } from "@mantine/core";
import { useRouter } from "next/router";
import { AdministratorHeader } from "./header/AdministratorHeader";
import { NavbarVertical } from "./navbar/NavbarVertical";
import useLayoutContext from "../../../hooks/useLayoutContext";
import { CookieContextProvider, useCookieContext } from "../../context/CookieContext";
import { TabContextProvider } from "../../context/tab-context/TabContextProvider";
import classes from "./AdministratorLayout.module.css";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import AuthGuard from "../../guards/AuthGuard";

const AdministratorLayout = ({ children }: { children: ReactNode }) => {
  // const { setCurrentTab, currentTab } = useTabContext();
  const { isOpen } = useLayoutContext();
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
        const speed = 0.3; // Adjust this value to change the speed. Values between 0.1 to 1 work best.
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

  return (
    <LayoutContainer>
      <Tabs
        onChange={handleChangeTab}
        keepMounted={false}
        defaultValue="dashboard"
        value={currentTab}
      >
        <AdministratorHeader />
        <Box
          ref={containerRef}
          className={`${classes.pageContent} ${classes.bg}`}
          style={{
            paddingTop: 55,
            backgroundImage: `url(${currentSpace?.image})`,
          }}
        >
          <NavbarVertical />
          <Box data-is-pen={isOpen} className={`${classes.contentWrapper} dashboardContainer`}>
            {children}
          </Box>
        </Box>
      </Tabs>
    </LayoutContainer>
  );
};

export default AdministratorLayout;

function LayoutContainer({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <CookieContextProvider>
        <TabContextProvider>{children}</TabContextProvider>
      </CookieContextProvider>
    </AuthGuard>
  );
}
