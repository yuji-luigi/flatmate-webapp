import React, { ReactElement, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API, PATH_AUTH } from '../../path/path-api';
import Layout from '../../layouts';

import { PATH_CLIENT } from '../../path/path-frontend';
import useAuth from '../../../hooks/useAuth';
import { useCookieContext } from '../../context/CookieContext';
import { SpaceModel } from '../../types/models/space-model';
import { ParsedQueryCustom } from '../../types/nextjs-custom-types/useRouter-types';
import { ChooseSpaceSection } from '../../sections/@login_signup/choose-space/ChooseSpaceSection';
import { UserModel } from '../../types/models/user-model';

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
        initialUser: user,
        // other props you may need to pass to the page
      },
    };
  } catch (error) {
    return {
      props: {
        initialUser: null,
      },
    };
  }
}
const fetchSpaces = async (organizationId: string) => {
  if (!organizationId) return null;
  const res = await axiosInstance.get(`${PATH_API.organizationCookie}/${organizationId}`);
  return res.data.data;
};

const ChooseSpaceInOrganizationPage = (props: { initialUser: UserModel }) => {
  const router: NextRouter & { query: ParsedQueryCustom; pathname: string } = useRouter();

  const { setCurrentOrganization } = useCookieContext();

  useEffect(() => {
    if (router.query.organizationId) {
      setCurrentOrganization(router.query.organizationId);
    }
  }, []);
  const { data: spaces } = useSWR<SpaceModel[] | null, AxiosError>(
    router.query.organizationId,
    fetchSpaces
  );

  if (!spaces) return <p>loading...</p>;
  return <ChooseSpaceSection spaces={spaces} />;
};

ChooseSpaceInOrganizationPage.getLayout = (page: ReactElement) => {
  return <Layout variant="main">{page}</Layout>;
};

export default ChooseSpaceInOrganizationPage;
