import React from 'react';
import { useCookieContext } from '../../context/CookieContext';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { PATH_CLIENT } from '../../path/path-frontend';
import useAuth from '../../../hooks/useAuth';
import { NextRequest } from 'next/server';
import { useRouter } from 'next/router';

const isChoosePage = (path: string) =>
  path === PATH_CLIENT.chooseRootSpace || path === PATH_CLIENT.chooseOrganization;

/**
 *
 * @description login button for logged users. color primary
 */
export const EnterButton = () => {
  const { currentSpace } = useCookieContext();
  const { user } = useAuth();
  const isSA = user?.role === 'super_admin';
  const { pathname } = useRouter();
  let hrefEnter = currentSpace
    ? `${PATH_CLIENT.dashboard}/${currentSpace.slug} `
    : PATH_CLIENT.chooseRootSpace;
  hrefEnter = isSA && !currentSpace ? `${PATH_CLIENT.chooseOrganization}` : hrefEnter;
  if (isChoosePage(pathname)) {
    return null;
  }
  return (
    <Button component={Link} href={hrefEnter}>
      Login
    </Button>
  );
};
