import React, { ReactNode } from "react";
import classes from "./PropertyGridMd.module.css";

export const PropertyGridMd = ({ children }: { children: ReactNode }) => {
  return <div className={`grid-auto-fill ${classes["property-grid-md"]}`}>{children}</div>;
};
