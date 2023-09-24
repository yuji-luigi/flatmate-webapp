import { Button } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../data/icons/icons';
import { navbarVerticalStyle } from './navbarStyle';
import useAuth from '../../../../hooks/useAuth';

const LogoutButton = () => {
  const { classes, cx } = navbarVerticalStyle();
  const { logout } = useAuth();

  return (
    <Button variant="outline" className={cx(classes.button, classes.link)} onClick={logout}>
      <Icons.logout className={classes.linkIcon} stroke={1.5} />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
