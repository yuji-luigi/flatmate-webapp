import React, { ReactElement } from 'react';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from './dashboard/DashboardLayout';
import { HomepageLayout } from './homepage';
import { CookieContextProvider } from '../context/CookieContext';
import { TabContextProvider } from '../context/tab-context/TabContextProvider';

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
          <DashboardLayout>{children}</DashboardLayout>
        </TabContextProvider>
      </CookieContextProvider>
    </AuthGuard>
  );
};

export default Layout;
