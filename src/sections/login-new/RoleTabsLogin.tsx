import { Anchor, Box, Group, Select, Stack, Tabs, Text, rem } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { useLocale } from '../../../hooks/useLocale';
import { AUTH } from '../../path/path-frontend';
import LoginForm from '../login_signup/LoginForm';
import classes from './RoleTabsLogin.module.css';
import { LoginTitleWithLogo } from './LoginTitleWithLogo';
import { Role } from '../../types/models/space-model';

type RoleTabsLoginProps = {};

const tabs: {
  value: 'Users' | 'Administrators' | 'Maintainers';
  role: Role;
  component: ReactNode;
}[] = [
  {
    value: 'Users',
    role: 'Inhabitant',
    component: 'Administrators',
  },
  {
    value: 'Administrators',
    role: 'Administrator',
    component: 'Administrators',
  },
  {
    value: 'Maintainers',
    role: 'Maintainer',
    component: 'Administrators',
  },
];

const iconStyle = { width: rem(12), height: rem(12) };
export const RoleTabsLogin: React.FC<RoleTabsLoginProps> = (props: RoleTabsLoginProps) => {
  const { t } = useLocale('login');

  return (
    <>
      <Tabs
        // orientation="vertical"
        defaultValue="Users"
        classNames={{
          tab: 'login-tab',
          list: 'login-tab-list',
          panel: 'login-tab-panel',
          root: 'login-tab-root',
          tabLabel: 'login-tab-label',
          tabSection: 'login-tab-section',
        }}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              // leftSection={<IconPhoto style={iconStyle} />}
            >
              <span>{t(tab.value)}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            {' '}
            <Box className={classes.container}>
              <LoginTitleWithLogo />
              <Stack gap={0}>
                <Text>You can use this credentials({tab.value})</Text>
                <Group>
                  <Text>email:</Text>
                  <Text>
                    <b> admin.sato@demo.com</b>
                  </Text>
                </Group>
                <Group>
                  <Text>password:</Text>
                  <Text>
                    <b> testabc</b>
                  </Text>
                </Group>
              </Stack>

              <LoginForm role={tab.role} />

              <Text ta="center">
                Don&apos;t have an account?{' '}
                <Anchor<'a'> href={AUTH.SIGNUP} fw={700}>
                  Register
                </Anchor>
              </Text>
            </Box>
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};
