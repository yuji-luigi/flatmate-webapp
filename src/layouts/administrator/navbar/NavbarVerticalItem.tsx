import React from "react";
import Link from "next/link";
import { Box, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { Icons } from "../../../data/icons/icons";
import classes from "./NavbarVertical.module.css";

type NavbarVerticalItemProp = {
  navbarContent: any;
  // active: string;
  // setActive: (active: string) => void;
};

export const NavbarVerticalItem = (props: NavbarVerticalItemProp) => {
  const { navbarContent } = props;
  // return null;
  const Icon = Icons[navbarContent.entity as IconIndexTypes] || Icons.home;
  const { asPath } = useRouter();
  const pattern = new RegExp(`/dashboard/${navbarContent.entity}$`);
  const isActive = pattern.test(asPath);
  if (navbarContent.hide) return null;
  return (
    <Link className={classes.link} data-active={isActive || undefined} href={navbarContent.link}>
      <Group align="center">
        <Icon className={classes.linkIcon} stroke={1.5} />
        {navbarContent.navbarTitle}
      </Group>
    </Link>
  );
};
