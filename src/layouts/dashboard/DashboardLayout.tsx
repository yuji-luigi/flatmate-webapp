import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { set } from 'nprogress';
import { DashboardHeaderSearch } from './header/DashboardHeaderSearch';
import { NavbarVertical } from './navbar/NavbarVertical';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { useCookieContext } from '../../context/CookieContext';
import { useTabContext } from '../../context/tab-context/TabContextProvider';
import { TAB_LIST_CONFIG } from '../../sections/dashboard/dashboard_top/sections-in-tabs/tabList';
import classes from './DashboardLayout.module.css';
import { PATH_CLIENT, _PATH_FRONTEND } from '../../path/path-frontend';
import useAuth from '../../../hooks/useAuth';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const { setCurrentTab, currentTab } = useTabContext();
  const { isOpen } = useLayoutContext();
  const { loggedAs } = useAuth();
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<string | null>(router.query.tab as string);
  const { currentSpace } = useCookieContext();
  const containerRef = useRef<HTMLDivElement>(null);
  // const bgColor = theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
  // const section = router.pathname.split('/').pop();
  useEffect(() => {
    // setCurrentTab(TAB_LIST_CONFIG[0].value);
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollY } = window;
        const speed = 0.3; // Adjust this value to change the speed. Values between 0.1 to 1 work best.
        const offset = scrollY * speed;
        containerRef.current.style.backgroundPosition = `center ${-offset}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    setCurrentTab((router.query.tab as string) || '');
  }, [router.query.tab]);
  const handleChangeTab = (value: string | null) => {
    console.log(router);
    if (!value) return;
    if (!loggedAs) return;
    router.replace(`${_PATH_FRONTEND[loggedAs].dashboard.root}?tab=${value}`);
  };

  return (
    <Tabs
      onChange={handleChangeTab}
      keepMounted={false}
      defaultValue={currentTab}
      value={currentTab}
    >
      <DashboardHeaderSearch />
      <Box
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

export default DashboardLayout;
