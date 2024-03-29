import { Box } from "@mantine/core";
import React, { ReactNode } from "react";

export const HeaderContainer = ({ children }: { children: ReactNode }) => {
  return <Box style={{ paddingTop: 24, paddingInline: 32 }}>{children}</Box>;
};
