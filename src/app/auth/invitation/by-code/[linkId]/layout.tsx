"use client";
import { ReactNode } from "react";
import { MantineProviderCustom } from "../../../../../components/theme/MantineProviderCustom";
import { ClientSideWrapper } from "../../../../_component/_layout/ClientSideWrapper";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ClientSideWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100dvh",
        }}
      >
        {children}
      </div>
    </ClientSideWrapper>
  );
};

export default LayoutWrapper;
