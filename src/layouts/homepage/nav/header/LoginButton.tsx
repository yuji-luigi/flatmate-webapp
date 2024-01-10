import React from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { NextRequest } from 'next/server';
import { useRouter } from 'next/router';
import { PATH_CLIENT } from '../../../../path/path-frontend';
import useAuth from '../../../../../hooks/useAuth';
import { useCookieContext } from '../../../../context/CookieContext';

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
