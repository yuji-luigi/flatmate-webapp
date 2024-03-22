import React, { ReactElement, ReactNode } from "react";
import { Box } from "@mantine/core";
import AuthGuard from "../guards/AuthGuard";
import DashboardLayout from "./dashboard/DashboardLayout";
import { HomepageLayout } from "./homepage";
import { CookieContextProvider } from "../context/CookieContext";
import { TabContextProvider } from "../context/tab-context/TabContextProvider";
// import classes from "./index.module.css";
import { AuthTokenRouteLayout } from "./auth-token/AuthTokenRouteLayout";
import { ClientProvider } from "./ClientProvider";

export type LayoutVariants =
  | "main"
  | "logoOnly"
  | "dashboard"
  | "auth-token"
  | "administrator-dashboard";

const Layout = ({
  variant = "dashboard",
  title,
  children,
}: {
  variant?: LayoutVariants;
  title?: ReactNode;
  children: ReactElement;
}) => {
  if (variant === "logoOnly") {
    return (
      <>
        <p>logo only layout</p>
        {children}
      </>
    );
  }
  // homepage
  if (variant === "main") {
    return <HomepageLayout>{children}</HomepageLayout>;
  }
  if (variant === "auth-token") {
    return (
      <ClientProvider>
        <CookieContextProvider>
          <AuthTokenRouteLayout title={title}>{children}</AuthTokenRouteLayout>
        </CookieContextProvider>
      </ClientProvider>
    );
  }

  return (
    <AuthGuard>
      <CookieContextProvider>
        <TabContextProvider>
          <DashboardLayout>
            <Box className="dashboardContainer">{children}</Box>
          </DashboardLayout>
        </TabContextProvider>
      </CookieContextProvider>
    </AuthGuard>
  );
};

export default Layout;
