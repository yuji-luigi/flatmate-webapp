/* eslint-disable react/jsx-pascal-case */
import { createStyles, Paper, Text, Title } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';

import Page from '../components/Page';
import GuestGuard from '../guards/GuestGuard';
import Layout from '../layouts';
import { API_BASE_URL, PATH_AUTH } from '../path/path-api';
import { AUTH } from '../path/path-frontend';
import LoginForm from '../sections/@login_signup/LoginForm';
import DashboardTopPage from './dashboard/statistics';
import { DeleteAlertModal } from '../components/modal/DeleteAlertModal';
import { UserModel } from '../types/models/user-model';
import axiosInstance from '../utils/axios-instance';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    max-width: 450,
    padding-top: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      max-width: '100%',
    },
  },

  title: {
    color: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
    font-family: Greycliff CF, var(--mantine-font-family),
  },
  link: {
    // color: 'black',
    fontWeight: 700,
    marginLeft: 8,
    textDecoration: 'none',
    color: theme.colors.green[5],
  },
  logo: {
    color: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  demoAccountBox: {
    padding: 10,
    border: 'solid black 1px',
    borderColor: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
    border-radius: 10,
    background: theme.colorScheme === 'dark' ? theme.colors.gray : '',
    color: light-dark(var(--mantine-color-black), var(--mantine-color-white)),
  },
}));

const LoginPage = ({ user }: { user?: UserModel }) => {
  const { classes } = useStyles();
  // if (user?.active) {
  //   return <DashboardTopPage />;
  // }
  // return null;
  return (
    <GuestGuard>
      <Page title="Login">
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
              Welcome back to Flatmates!
            </Title>
            <div className={classes.demoAccountBox}>
              <b>
                <span>-demo account-</span>
                <br />
                email: contardo@admin.com
                <br />
                password: user$$$
              </b>
            </div>
            <br />
            <LoginForm />
            <Text align="center" mt="md">
              Don&apos;t have an account?{' '}
              <Link className={classes.link} href={AUTH.SIGNUP}>
                Register
              </Link>
            </Text>
          </Paper>
        </div>
      </Page>
    </GuestGuard>
  );
};

export default LoginPage;

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
