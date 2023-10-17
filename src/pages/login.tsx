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
import { ReactElement } from 'react';
import { GetServerSidePropsContext } from 'next';
import classes from './login.module.css';
import Layout from '../layouts';
import { API_BASE_URL, PATH_AUTH } from '../path/path-api';
import axiosInstance from '../utils/axios-instance';
import LoginForm from '../sections/@login_signup/LoginForm';
import { AUTH, PATH_CLIENT } from '../path/path-frontend';
import GuestGuard from '../guards/GuestGuard';

export default function LoginPage() {
  return (
    <GuestGuard>
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
    </GuestGuard>
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
    const rawRes = await axiosInstance.get(`${API_BASE_URL}/${PATH_AUTH.me}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const { data } = rawRes;
    // const data = await response.json();

    return {
      props: { user: data.user },
    };
  } catch (error) {
    return {
      props: { user: null },
    };
  }
}
