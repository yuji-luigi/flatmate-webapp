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
  return (
    <div className={classes.wrapper}>
      <Card>
        <RoleTabsLogin />
      </Card>
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
    if (context.query.redirect === 'no') {
      return { props: { user: null, ...translationObj } };
    }
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
