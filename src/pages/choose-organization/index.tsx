import React, { ReactElement, useEffect } from 'react';
import { Box, Divider, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { _PATH_FRONTEND } from '../../path/path-frontend';
import axiosInstance, { AxiosMeResponse } from '../../utils/axios-instance';
import { PATH_AUTH, _PATH_API } from '../../path/path-api';
import Layout from '../../layouts';
import { OrganizationModel } from '../../types/models/organization-model';
import { SpaceModel } from '../../types/models/space-model';
import { CardForListSmall } from '../../components/card/CardForListSmall';
import { Role, UserWithRoleModel } from '../../types/models/user-model';
import classes from './chooose-organization-page.module.css';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;
    const { jwt: jwtToken } = context.req.cookies;
    if (!jwtToken) {
      return {
        redirect: {
          destination: '/500',
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
    const { user, loggedAs } = data;
    if (!user) {
      throw new Error('Invalid access');
    }
    // if (loggedAs === 'inhabitant' || loggedAs === 'maintainer') {
    //   return {
    //     redirect: {
    //       destination: _PATH_FRONTEND.auth.chooseSpace,
    //       permanent: true,
    //     },
    //   };
    // }
    return {
      props: {
        ...(await serverSideTranslations(locale || 'it', ['common', 'otherNamespace'])),
        initialUser: user,
        initialLoggedAs: loggedAs,
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
const ChooseOrganizationPage = (props: {
  initialUser: UserWithRoleModel;
  initialLoggedAs: Role;
}) => {
  const { initialUser, initialLoggedAs } = props;
  const [organizations, setOrganizations] = React.useState<OrganizationModel[] | SpaceModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) return;
    axiosInstance.get(`${_PATH_API.organizations.selections}`).then((res) => {
      setOrganizations(res.data.data);
    });
  }, [initialUser?.role]);

  const title = initialUser?.role.isSuperAdmin ? 'Choose organization' : 'Choose space';
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Text variant="text" fz={36} fw={600} ta="center">
          {title}
        </Text>
      </div>

      <Box className={classes.list}>
        {initialUser?.role.isSuperAdmin && (
          <CardForListSmall
            title="All organizations"
            href={{
              pathname: _PATH_FRONTEND[initialLoggedAs].dashboard.root,
              query: {
                tab: 'dashboard',
              },
            }}
            image=""
          />
        )}

        {organizations.map((organization) => (
          <CardForListSmall
            key={organization._id}
            title={`• ${organization.name}`}
            description={organization.address}
            // subtitle={organization.admins[0]?.name || ''}
            href={{
              pathname: _PATH_FRONTEND.auth.chooseSpace,
              query: { organizationId: organization._id },
            }}
            image=""
          />
        ))}
        {organizations.length === 0 && (
          <>
            <Text variant="text" fz={24} ta="center">
              No organizations found
            </Text>
            <Link href={_PATH_FRONTEND.homepage.root}>Go back to home</Link>
          </>
        )}
      </Box>
    </div>
  );
};
ChooseOrganizationPage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;
export default ChooseOrganizationPage;
