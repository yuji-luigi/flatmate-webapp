import React from 'react';
import Link from 'next/link';
import { Box, Group } from '@mantine/core';
import { Icons } from '../../../data/icons/icons';
import classes from './NavbarVertical.module.css';
import {
  getEntityFromUrl,
  getEntityOrUndefinedFromUrl,
} from '../../../utils/helpers/helper-functions';
// import classes from './navbarStyle.module.css';

type NavbarVerticalItemProp = {
  navbarContent: any;
  active: string;
  setActive: (active: string) => void;
};

export const NavbarVerticalItem = (props: NavbarVerticalItemProp) => {
  const { navbarContent, active, setActive } = props;
  // return null;
  const Icon = Icons[navbarContent.entity as IconIndexTypes] || Icons.home;
  if (navbarContent.hide) return null;
  return (
    <Link
      className={classes.link}
      data-active={navbarContent.entity === active || undefined}
      href={navbarContent.link}
      onClick={() => setActive(navbarContent.entity)}
    >
      <Group align="center">
        <Icon className={classes.linkIcon} stroke={1.5} />
        {navbarContent.navbarTitle}
      </Group>
    </Link>
  );
};
