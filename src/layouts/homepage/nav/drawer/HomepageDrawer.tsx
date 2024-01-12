import { Drawer, ScrollArea, Divider, Stack, Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { LogoBanner } from '../../../../components/banner/LogoBanner';
import { LanguageMenu } from '../../../../components/menu/LanguageMenu/LanguageMenu';
import classes from './HomepageDrawer.module.css';
import useAuth from '../../../../../hooks/useAuth';
import { LoginLink } from './LoginLink';
import { LogoutLink } from './LogoutLink1';
import { SignUpLink } from './SignUpLink';
import { Icons } from '../../../../data/icons/icons';
import DisplayController from '../../../../components/util-components/DisplayController';
import { LanguageMenuSmall } from '../../../../components/menu/LanguageMenu/LanguageMenuSmall';

export function HomepageDrawer({
  drawerOpened,
  closeDrawer,
}: {
  drawerOpened: boolean;
  closeDrawer: () => void;
}) {
  const { user } = useAuth();
  return (
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size="xs"
      padding="md"
      title={<LogoBanner transparent />}
      className={classes.hiddenDesktop}
      zIndex={1000000}
    >
      <ScrollArea
        style={{
          height: 'calc(100vh - 60px)',
        }}
        mx="-md"
      >
        <Box className={classes.control}>
          <LanguageMenu />
        </Box>
        <Divider my="sm" />

        <Link href="/" className={classes.link}>
          <Icons.home className={classes.logIcon} />
          Home
        </Link>
        <Divider my="sm" />
        {user ? (
          <LogoutLink />
        ) : (
          <>
            <SignUpLink />
            <LoginLink />
          </>
        )}
        <Stack pb="xl" px="md" />
      </ScrollArea>
    </Drawer>
  );
}
