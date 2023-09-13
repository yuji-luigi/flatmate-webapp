import React, { ReactElement } from 'react';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from './dashboard/DashboardLayout';
import { HomepageLayout } from './homepage';
import { CookieContextProvider } from '../context/CookieContext';

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
        <DashboardLayout>{children}</DashboardLayout>
      </CookieContextProvider>
    </AuthGuard>
  );
};

export default Layout;
