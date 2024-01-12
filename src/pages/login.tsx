import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Card,
  Group,
} from '@mantine/core';
import { ReactElement, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import classes from './login.module.css';
import Layout from '../layouts';
import { API_BASE_URL, PATH_AUTH } from '../path/path-api';
import axiosInstance from '../utils/axios-instance';
import LoginForm from '../sections/@login_signup/LoginForm';
import { AUTH, PATH_CLIENT } from '../path/path-frontend';
import GuestGuard from '../guards/GuestGuard';
import { UserModel } from '../types/models/user-model';
import CardWithTitle from '../components/profile/side/CardWithTitle';
import TextWithIcon from '../components/text/TextWithIcon';
import { LanguageMenu } from '../components/menu/LanguageMenu/LanguageMenu';
import { useLocale } from '../../hooks/useLocale';

export default function LoginPage(props: { initialUser?: UserModel }) {
  const { initialUser } = props;
  const { push } = useRouter();
  const { t } = useLocale('common');
  // const { changeLanguage, t } = useLocale();
  useEffect(() => {
    // changeLanguage('it');
    if (initialUser) {
      push(PATH_CLIENT.chooseRootSpace);
    }
  }, [initialUser]);
  // return null;
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          {t('Welcome back to Flatmate!')}
        </Title>
        <CardWithTitle title={t('Use this credential')}>
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
        </CardWithTitle>
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
  const translationObj = await serverSideTranslations(context.locale || 'it', ['common'], null, [
    'it',
    'en',
  ]);
  try {
    const jwtToken = context.req.cookies.jwt;
    if (!jwtToken) {
      return { props: { user: null, ...translationObj } };
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
