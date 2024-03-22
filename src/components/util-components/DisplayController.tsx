import React, { ReactNode } from "react";
import classes from "./DisplayController.module.css";

const DisplayController = ({ children }: { children: ReactNode }) => {
  return <div className={classes.container}>{children}fsas</div>;
};

export default DisplayController;
