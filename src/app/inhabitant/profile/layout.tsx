"use client";
import React, { ReactElement, ReactNode } from "react";
import DashboardLayoutAppRouter from "../../_component/_layout/DashboardLayoutAppRouter";
import { ClientSideWrapper } from "../../_component/_layout/ClientSideWrapper";

const InhabitantProfilePage = ({ children }: { children: ReactElement }) => {
  return (
    <ClientSideWrapper>
      <DashboardLayoutAppRouter>{children}</DashboardLayoutAppRouter>
    </ClientSideWrapper>
  );
};

export default InhabitantProfilePage;
