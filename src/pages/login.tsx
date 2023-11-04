import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { ReactElement, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { useRouter } from 'next/router';
import classes from './login.module.css';
import Layout from '../layouts';
import { API_BASE_URL, PATH_AUTH } from '../path/path-api';
import axiosInstance from '../utils/axios-instance';
import LoginForm from '../sections/@login_signup/LoginForm';
import { AUTH, PATH_CLIENT } from '../path/path-frontend';
import GuestGuard from '../guards/GuestGuard';
import { UserModel } from '../types/models/user-model';

export default function LoginPage(props: { user?: UserModel }) {
  const { user } = props;
  const { push } = useRouter();
  useEffect(() => {
    if (user) {
      push(PATH_CLIENT.chooseRootSpace);
    }
  }, [user]);
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Mantine!
        </Title>
        <LoginForm />

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href={AUTH.SIGNUP} fw={700}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const jwtToken = context.req.cookies.jwt;
    if (!jwtToken) {
      return { props: { user: null } };
    }
    const rawRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const { data } = rawRes;
    const { user } = data;
    return {
      props: {
        ...(await serverSideTranslations(context.locale || '', ['common'])),
        user,
      },
    };
  } catch (error) {
    return {
      props: { user: null },
    };
  }
}
