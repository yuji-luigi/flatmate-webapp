import { Stack } from "@mantine/core";
import React, { ReactNode } from "react";
import classes from "./StackOverride.module.css";

/**
 * @description Mantine Stack component with gap var(--flex-gap) accepts className prop
 */
export const StackOverride = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <Stack className={`${classes.stack} ${className || ""}`}>{children}</Stack>;
};
