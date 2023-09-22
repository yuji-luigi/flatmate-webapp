import React from 'react';
import Link from 'next/link';
import { Icons } from '../../../data/icons/icons';
import { navbarVerticalStyle } from './navbarStyle';

type NavbarVerticalItemProp = {
  navbarContent: any;
  active: string;
};

export const NavbarVerticalItem = (props: NavbarVerticalItemProp) => {
  const { navbarContent, active } = props;
  const { classes, cx } = navbarVerticalStyle();

  const Icon = Icons[navbarContent.entity as IconIndexTypes] || Icons.home;
  if (navbarContent.hide) return null;
  return (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: `${navbarContent.link}/` === active,
      })}
      href={navbarContent.link}
      key={navbarContent.navbarTitle}
    >
      <Icon className={classes.linkIcon} stroke={1.5} />
      {navbarContent.navbarTitle}
    </Link>
  );
};
