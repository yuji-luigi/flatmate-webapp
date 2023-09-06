import React from 'react';
import { useCookieContext } from '../../context/CookieContext';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { PATH_CLIENT } from '../../path/page-paths';
import useAuth from '../../../hooks/useAuth';
import { NextRequest } from 'next/server';
import { useRouter } from 'next/router';

const isChoosePage = (path: string) =>
  path === PATH_CLIENT.chooseRootSpace || path === PATH_CLIENT.chooseOrganization;

/**
 *
 * @description regular login button. color dark
 */
export const LoginButton = () => {
  const { pathname } = useRouter();

  if (pathname === PATH_CLIENT.login) {
    return null;
  }
  return (
    <Button component={Link} variant="default" href={PATH_CLIENT.login}>
      Log in
    </Button>
  );
};
