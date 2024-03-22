import { Box } from "@mantine/core";
import { ReactNode } from "react";
import { LogoBanner } from "../../components/banner/LogoBanner";
import { ColorSchemeToggle } from "../../components/color-schemeToggle/ColorSchemeToggle";
import classes from "./AuthTokenLayoutHeader.module.css";
import { useCustomMQuery } from "../../../hooks/useCustomMQuery";
import useLayoutContext from "../../../hooks/useLayoutContext";

export const AuthTokenLayoutHeader = (props: { title: ReactNode }) => {
  const { title } = props;
  const { isMobile } = useCustomMQuery();

  return (
    <header className={classes.header}>
      <LogoBanner link="/" transparent className={classes.logo} />
      <Box className={classes.title}>{title}</Box>
      {!isMobile && <ColorSchemeToggle className={classes.colorScheme} />}
    </header>
  );
};
