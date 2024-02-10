import { ReactElement } from 'react';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import { PATH_CLIENT, _PATH_FRONTEND } from '../path/path-frontend';
import axiosInstance, { AxiosMeResponse, AxiosResDataGeneric } from '../utils/axios-instance';
import { PATH_API, PATH_AUTH, _PATH_API } from '../path/path-api';

import Layout from '../layouts';
import { UserModel } from '../types/models/user-model';
import { SpaceModel } from '../types/models/space-model';
import { ChooseSpaceSection } from '../sections/login_signup/choose-space/ChooseSpaceSection';
import LoadingScreen from '../components/screen/LoadingScreen';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;
    const { loggedAs, jwt: jwtToken } = context.req.cookies;
    if (!jwtToken) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }

    const rawRes = await axiosInstance.get<AxiosMeResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    const { data } = rawRes;
    const { user } = data;
    if (!user) {
      throw new Error('User is not present from GET /me');
    }
    if (loggedAs === 'inhabitant' && user.role.inhabitant?.rootSpaces.length > 1) {
      return {
        props: {
          ...(await serverSideTranslations(locale || 'it', ['common', 'otherNamespace'])),
          initialUser: user,

          // other props you may need to pass to the page
        },
      };
    }
    return {
      redirect: {
        destination: _PATH_FRONTEND.administrator.dashboard.root,
      },
    };

    if (user.isSuperAdmin || loggedAs === 'administrator' || loggedAs === 'maintainer') {
      return {
        redirect: {
          destination: _PATH_FRONTEND.administrator.dashboard.root,
        },
      };
    }
    // in case check for inhabitant. even though there is only inhabitant at this point.
    if (loggedAs === 'inhabitant' && user.role.inhabitant?.rootSpaces.length === 1) {
      // only inhabitants with multiple buildings see this page to select which building he is seeing in case inhabitant has registered in multiple buildings
      return {
        props: {
          ...(await serverSideTranslations(locale || 'it', ['common', 'otherNamespace'])),
          initialUser: user,

          // other props you may need to pass to the page
        },
      };
    }
    return {
      redirect: {
        destination: _PATH_FRONTEND.auth.chooseOrganization,
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

export const fetchSpaceSelections = async (
  userId?: string | null,
  orgId: string | string[] = ''
) => {
  if (!userId) return null;
  const params = orgId ? { organization: orgId } : {};
  // when the organization id query is present
  if (orgId && typeof orgId === 'string') {
    await axiosInstance.get(_PATH_API.organizations.cookie(orgId));
  }
  const res = await axiosInstance.get<AxiosResDataGeneric<SpaceModel[]>>(
    PATH_API.getSpaceSelections,
    { params }
  );
  return res.data?.data;
};

const ChooseRootSpacePage = (props: { initialUser?: UserModel }) => {
  const { initialUser } = props;
  const router = useRouter();
  const { organizationId } = router.query;
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(initialUser?._id, () =>
    fetchSpaceSelections(initialUser?._id, organizationId)
  );

  if (!initialUser) {
    throw new Error('Something went wrong');
  }

  if (!rootSpaces || isLoading) {
    return <LoadingScreen />;
  }

  return <ChooseSpaceSection spaces={rootSpaces} />;
};

ChooseRootSpacePage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;

export default ChooseRootSpacePage;
