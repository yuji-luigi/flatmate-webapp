import React, { ReactNode } from "react";
import classes from "./CardTransparent.module.css";
export const CardTransparent = ({ children }: { children: ReactNode; className?: string }) => {
  return <div className={`border flex-column-sm ${classes.card}`}>{children}</div>;
};
