import React, { ReactElement } from 'react';
import { Box } from '@mantine/core';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from './dashboard/DashboardLayout';
import { HomepageLayout } from './homepage';
import { CookieContextProvider } from '../context/CookieContext';
import { TabContextProvider } from '../context/tab-context/TabContextProvider';
import classes from './index.module.css';

export type LayoutVariants = 'main' | 'logoOnly' | 'dashboard';

const Layout = ({
  variant = 'dashboard',
  children,
}: {
  variant?: LayoutVariants;
  children: ReactElement;
}) => {
  if (variant === 'logoOnly') {
    return (
      <>
        <p>logo only layout</p>
        {children}
      </>
    );
  }
  // homepage
  if (variant === 'main') {
    return <HomepageLayout>{children}</HomepageLayout>;
  }
  return (
    <AuthGuard>
      <CookieContextProvider>
        <TabContextProvider>
          <DashboardLayout>
            <Box className={classes.dashboardContainer}>{children}</Box>
          </DashboardLayout>
        </TabContextProvider>
      </CookieContextProvider>
    </AuthGuard>
  );
};

export default Layout;
