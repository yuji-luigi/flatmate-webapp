"use client";
import React, { ReactNode } from "react";
import { MantineProviderCustom } from "../theme/MantineProviderCustom";

export const MantineProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <MantineProviderCustom>{children}</MantineProviderCustom>;
};
