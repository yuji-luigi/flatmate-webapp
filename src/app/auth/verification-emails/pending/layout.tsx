import React, { ReactNode } from "react";
import { ClientSideWrapper } from "../../../_component/_layout/ClientSideWrapper";

const layout = ({ children }: { children: ReactNode }) => {
  return <ClientSideWrapper>{children}</ClientSideWrapper>;
};

export default layout;
