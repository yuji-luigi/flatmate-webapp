import { Button } from "@mantine/core";
import React from "react";
import { Icons } from "../../../data/icons/icons";
import classes from "./NavbarVertical.module.css";
// import classes from './navbarStyle.module.css';
import useAuth from "../../../../hooks/useAuth";

const LogoutButton = () => {
  // const { classes, cx } = navbarVerticalStyle();
  const { logout } = useAuth();

  return (
    <Button variant="outline" className={`${classes.button} ${classes.link}`} onClick={logout}>
      <Icons.logout className={classes.linkIcon} stroke={1.5} />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
