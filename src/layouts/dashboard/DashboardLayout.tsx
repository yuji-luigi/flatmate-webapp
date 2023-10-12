import React, { ReactNode, useEffect, useRef } from 'react';
import { Box, Tabs, createStyles, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { DashboardHeaderSearch } from './header/DashboardHeaderSearch';
import { NavbarVertical } from './navbar/NavbarVertical';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { useCookieContext } from '../../context/CookieContext';
import { TabContextProvider, useTabContext } from '../../context/tab-context/TabContextProvider';
import { TAB_LIST_CONFIG } from '../../sections/@dashboard/dashboard_top/sections-in-tabs/tabList';
import tabClasses from './tab.module.css';

const useStyles = createStyles((theme /* _params, getRef */) => ({
  pageContent: {
    zIndex: 10,
    // display: 'flex',
    // alignItems: 'center',
    paddingTop: 50,
    [theme.fn.largerThan('md')]: {
      paddingLeft: 300,
    },
  },
}));

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { classes } = useStyles();
  const { setCurrentTab, currentTab } = useTabContext();
  const theme = useMantineTheme();
  const { isOpen } = useLayoutContext();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const paddingSmOpen = isOpen && matches ? { paddingLeft: 300 } : {};
  const { currentSpace } = useCookieContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgColor = theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
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

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
    router.push(`/dashboard/top/${value}`);
    // if (section !== 'home') {
    //   router.push('/dashboard/home');
    // }
  };

  return (
    <Tabs
      onTabChange={handleChangeTab}
      keepMounted={false}
      defaultValue={TAB_LIST_CONFIG[0].value}
      value={currentTab}
    >
      <DashboardHeaderSearch />
      <Box
        className={classes.pageContent}
        style={paddingSmOpen}
        ref={containerRef}
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${currentSpace?.image})`,
          backgroundBlendMode: 'overlay',
          backgroundColor: bgColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          // minHeight: '100vh',
          // set overlay color
        }}
      >
        <NavbarVertical />
        {children}
      </Box>
    </Tabs>
  );
};

export default DashboardLayout;
