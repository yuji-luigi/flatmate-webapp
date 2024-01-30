import React, { ReactNode, useEffect, useRef } from 'react';
import { Box, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { DashboardHeaderSearch } from './header/DashboardHeaderSearch';
import { NavbarVertical } from './navbar/NavbarVertical';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { useCookieContext } from '../../context/CookieContext';
import { useTabContext } from '../../context/tab-context/TabContextProvider';
import { TAB_LIST_CONFIG } from '../../sections/dashboard/dashboard_top/sections-in-tabs/tabList';
import classes from './DashboardLayout.module.css';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { setCurrentTab, currentTab } = useTabContext();
  const { isOpen } = useLayoutContext();

  const { currentSpace } = useCookieContext();
  const containerRef = useRef<HTMLDivElement>(null);
  // const bgColor = theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
  const router = useRouter();
  const section = router.pathname.split('/').pop();
  useEffect(() => {
    setCurrentTab(TAB_LIST_CONFIG[0].value);
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
    setCurrentTab(section || '');
  }, [section]);

  const handleChangeTab = (value: string | null) => {
    if (!value) return;
    setCurrentTab(value);
    router.push(`/dashboard/top/${value}`);
  };

  return (
    <Tabs
      // variant="pills"
      onChange={handleChangeTab}
      keepMounted={false}
      defaultValue={TAB_LIST_CONFIG[0].value}
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
