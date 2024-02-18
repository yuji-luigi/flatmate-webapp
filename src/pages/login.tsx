import { Card, Stack } from '@mantine/core';
import { ReactElement, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { useRouter } from 'next/router';
import classes from './login-new.module.css';
import Layout from '../layouts';
import { PATH_AUTH } from '../path/path-api';
import { PATH_CLIENT, _PATH_FRONTEND } from '../path/path-frontend';
import { useLocale } from '../../hooks/useLocale';
import { RoleTabsLogin } from '../sections/login-new/RoleTabsLogin';
import { AxiosMeResponse } from '../utils/axios-instance';
import { UserModel } from '../types/models/space-model';

export default function LoginPage(props: { initialUser?: UserModel }) {
  const { initialUser } = props;
  const { push, pathname, replace } = useRouter();
  const { t } = useLocale('common');
  // const { changeLanguage, t } = useLocale();
  useEffect(() => {
    // changeLanguage('it');
    if (initialUser) {
      push(PATH_CLIENT.chooseRootSpace);
    }
    if (pathname === _PATH_FRONTEND.auth.logout) {
      replace(_PATH_FRONTEND.auth.login);
    }
  }, [initialUser]);
  return (
    <div className={classes.wrapper}>
      <Stack>
        <Card p={0}>
          <RoleTabsLogin />
          {/* <Box className={classes.form}>
            <Group style={{ position: 'relative' }} justify="space-between" align="baseline">
              <Title order={2} className={classes.title} ta="center">
                {t('Welcome back to Flatmate!')}
              </Title>
              <LogoSquare className={classes.logo} size={60} />
            </Group>
            <Stack gap={0}>
              <Text>You can use this credentials</Text>
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

            <LoginForm />

            <Text ta="center">
              Don&apos;t have an account?{' '}
              <Anchor<'a'> href={AUTH.SIGNUP} fw={700}>
                Register
              </Anchor>
            </Text>
          </Box> */}
        </Card>
      </Stack>
    </div>
  );
}
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || 'it', ['common'], null, [
    'it',
    'en',
  ]);
  try {
    const { jwt: jwtToken, loggedAs } = context.req.cookies;
    if (!jwtToken) {
      return { props: { user: null, ...translationObj } };
    }
    const rawRes = await axios.get<AxiosMeResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    const { data } = rawRes;
    const { user } = data;
    if (user) {
      return {
        redirect: {
          destination: _PATH_FRONTEND.pathAfterLogin,
          permanent: false,
        },
      };
    }
    return {
      props: {
        ...translationObj,
        initialUser: user,
      },
    };
  } catch (error) {
    return {
      props: {
        initialUser: null,
        ...translationObj,
      },
    };
  }
}
