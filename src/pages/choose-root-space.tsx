import React, { ReactElement, useEffect } from 'react';
import { Box, Card, LoadingOverlay } from '@mantine/core';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import useAuth from '../../hooks/useAuth';
import { CARD_LINK_PATH, PATH_CLIENT } from '../path/path-frontend';
import axiosInstance, { AxiosResDataGeneric } from '../utils/axios-instance';
import { PATH_API, PATH_AUTH } from '../path/path-api';

import Layout from '../layouts';
import { UserModel } from '../types/models/user-model';
import { SpaceModel } from '../types/models/space-model';
import { useCookieContext } from '../context/CookieContext';
import { ChooseSpaceSection } from '../sections/@login_signup/choose-space/ChooseSpaceSection';
import LoadingScreen from '../components/screen/LoadingScreen';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;
    const jwtToken = context.req.cookies.jwt;
    if (!jwtToken) {
      return { props: { user: null } };
    }

    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const { data } = rawRes;
    const { user } = data;
    return {
      props: {
        ...(await serverSideTranslations(locale || 'it', ['common', 'otherNamespace'])),
        user,
        // other props you may need to pass to the page
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
}

export const fetchSpaceSelections = async (userId?: string | null) => {
  if (!userId) return null;
  const res = await axiosInstance.get<AxiosResDataGeneric<SpaceModel[]>>(
    PATH_API.getSpaceSelections
  );
  return res.data?.data;
};

const ChooseRootSpacePage = (props: { user?: UserModel }) => {
  const { user } = props;
  const router = useRouter();
  // const title = t('choose-building-title');
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(user?._id, fetchSpaceSelections);

  useEffect(() => {
    if (!user) {
      router.push(PATH_CLIENT.login);
    }
  }, []);

  if (user?.role === 'super_admin') {
    router.push(PATH_CLIENT.chooseOrganization);
    return null;
  }
  if (!rootSpaces || isLoading) {
    return <LoadingScreen />;
  }

  return <ChooseSpaceSection spaces={rootSpaces} />;
};

ChooseRootSpacePage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;

export default ChooseRootSpacePage;
