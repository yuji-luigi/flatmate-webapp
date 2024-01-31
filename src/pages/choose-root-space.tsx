import { ReactElement, useEffect } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import { PATH_CLIENT, _PATH_FRONTEND } from '../path/path-frontend';
import axiosInstance, { AxiosResDataGeneric } from '../utils/axios-instance';
import { PATH_API, PATH_AUTH } from '../path/path-api';

import Layout from '../layouts';
import { UserModel } from '../types/models/user-model';
import { SpaceModel } from '../types/models/space-model';
import { ChooseSpaceSection } from '../sections/login_signup/choose-space/ChooseSpaceSection';
import LoadingScreen from '../components/screen/LoadingScreen';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;
    const { role, jwt: jwtToken } = context.req.cookies;
    if (!jwtToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const { data } = rawRes;
    const { user } = data;
    if (!user) {
      throw new Error('User is not present from GET /me');
    }

    if (role === 'administrator') {
      console.log('admin logged in show layout for admin');
      return {
        redirect: {
          destination: _PATH_FRONTEND.administrator.dashboard.root,
        },
      };
    }
    if (role === 'maintainer') {
      console.log('maintainer logged in show layout for admin');
    }
    return {
      props: {
        ...(await serverSideTranslations(locale || 'it', ['common', 'otherNamespace'])),
        initialUser: user,
        // other props you may need to pass to the page
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
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

const ChooseRootSpacePage = (props: { initialUser?: UserModel }) => {
  const { initialUser } = props;
  const router = useRouter();
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(initialUser?._id, fetchSpaceSelections);

  // useEffect(() => {
  //   if (!initialUser) {
  //     router.push(PATH_CLIENT.login);
  //   }
  // }, []);

  if (initialUser?.role === 'super_admin') {
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
