import React, { ReactElement } from 'react';
import { Box } from '@mantine/core';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useAuth from '../../hooks/useAuth';
import { CARD_LINK_PATH, PATH_CLIENT } from '../path/path-frontend';
import axiosInstance, { AxiosResDataGeneric } from '../utils/axios-instance';
import { PATH_API } from '../path/path-api';

import Layout from '../layouts';
import { UserModel } from '../types/models/user-model';
import { SpaceModel } from '../types/models/space-model';
import { useCookieContext } from '../context/CookieContext';
import { ChooseSpaceSection } from '../sections/@login_signup/choose-space/ChooseSpaceSection';

export const fetchSpaceSelections = async (userId?: string | null) => {
  if (!userId) return null;
  const res = await axiosInstance.get<AxiosResDataGeneric<SpaceModel[]>>(
    PATH_API.getSpaceSelections
  );
  return res.data?.data;
};

const ChooseRootSpacePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  // const title = t('choose-building-title');
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(user?._id, fetchSpaceSelections);

  if (user?.role === 'super_admin') {
    router.push(PATH_CLIENT.chooseOrganization);
    return null;
  }
  if (!rootSpaces || isLoading) return <p>loading</p>;

  return <ChooseSpaceSection spaces={rootSpaces} />;
};

ChooseRootSpacePage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;

export default ChooseRootSpacePage;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'it', ['common'])),
    },
  };
}
