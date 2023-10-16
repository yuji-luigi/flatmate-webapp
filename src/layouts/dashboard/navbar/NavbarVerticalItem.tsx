import React from 'react';
import Link from 'next/link';
import { Icons } from '../../../data/icons/icons';
import classes from './NavbarVertical.module.css';
// import classes from './navbarStyle.module.css';

type NavbarVerticalItemProp = {
  navbarContent: any;
  active: string;
};

export const NavbarVerticalItem = (props: NavbarVerticalItemProp) => {
  const { navbarContent, active } = props;

  const Icon = Icons[navbarContent.entity as IconIndexTypes] || Icons.home;
  if (navbarContent.hide) return null;
  return (
    <Link className={classes.Link} href={navbarContent.link} key={navbarContent.navbarTitle}>
      <Icon className={classes.linkIcon} stroke={1.5} />
      {navbarContent.navbarTitle}
    </Link>
  );
};
