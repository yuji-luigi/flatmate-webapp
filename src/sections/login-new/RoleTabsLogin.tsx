import { Anchor, Box, Group, Stack, Tabs, Text, rem } from '@mantine/core';
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
    role: 'inhabitant',
    component: 'Administrators',
  },
  {
    value: 'Administrators',
    role: 'administrator',
    component: 'Administrators',
  },
  {
    value: 'Maintainers',
    role: 'maintainer',
    component: 'Administrators',
  },
];

const iconStyle = { width: rem(12), height: rem(12) };
export const RoleTabsLogin: React.FC<RoleTabsLoginProps> = (props: RoleTabsLoginProps) => {
  const { t } = useLocale('login');

  return (
    <>
      <Tabs defaultValue="Users">
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              leftSection={<IconPhoto style={iconStyle} />}
            >
              {t(tab.value)}
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
