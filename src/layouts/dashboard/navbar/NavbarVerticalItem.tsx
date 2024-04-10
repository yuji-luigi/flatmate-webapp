import React from "react";
import Link from "next/link";
import { Box, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { Icons } from "../../../data/icons/icons";
import classes from "./NavbarVertical.module.css";
import { NavConfigContent } from "../../../types/data/json/sections-json";

type NavbarVerticalItemProp = {
  navbarContent: NavConfigContent;
  // active: string;
  // setActive: (active: string) => void;
};

export const NavbarVerticalItem = (props: NavbarVerticalItemProp) => {
  const { navbarContent } = props;
  // return null;
  const Icon = Icons[navbarContent.icon] || Icons.home;
  const { asPath } = useRouter();
  const pattern = new RegExp(navbarContent.link);
  const isActive = pattern.test(asPath);
  if (navbarContent.hide) return null;
  return (
    <Link className={classes.link} data-active={isActive || undefined} href={navbarContent.link}>
      <Group align="center">
        <Icon className={classes.linkIcon} stroke={1.5} />
        {navbarContent.title}
      </Group>
    </Link>
  );
};
