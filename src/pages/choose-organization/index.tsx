import React, { ReactElement, useEffect } from 'react';
import { Box, Divider, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useAuth from '../../../hooks/useAuth';
import { PATH_CLIENT } from '../../path/path-frontend';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API, PATH_AUTH } from '../../path/path-api';
import Layout from '../../layouts';
import { OrganizationModel } from '../../types/models/organization-model';
import { SpaceModel } from '../../types/models/space-model';
import { CardForListSmall } from '../../components/card/CardForListSmall';
import classes from '../../styles/global-useStyles.module.css';
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
const ChooseOrganizationPage = (props: { user: UserModel }) => {
  const { user } = props;
  const [organizations, setOrganizations] = React.useState<OrganizationModel[] | SpaceModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (user.role !== 'super_admin') {
      router.push(PATH_CLIENT.chooseRootSpace);
      return;
    }

    axiosInstance.get(`${PATH_API.getOrganizationsForAdmin}`).then((res) => {
      setOrganizations(res.data.data);
    });
  }, [user?.role]);

  const title = user?.role === 'super_admin' ? 'Choose organization' : 'Choose space';
  const hrefRoot = PATH_CLIENT.chooseOrganization;

  if (user?.role !== 'super_admin') {
    router.push(PATH_CLIENT.login);
    return null;
  }

  return (
    <Box className={classes.container}>
      <Stack justify="center">
        <Text variant="text" fz={36} fw={600} ta="center">
          {title}
        </Text>
        <Divider />

        <Box
          className={classes.pinContainer}
          py="xl" /* cols={2} breakpoints={[{ max-width: 'sm', cols: 1 }]} */
        >
          {user?.role === 'super_admin' && (
            <CardForListSmall title="All organizations" href={PATH_CLIENT.root} image="" />
          )}

          {organizations.map((organization) => (
            <CardForListSmall
              key={organization._id}
              title={`• ${organization.name}`}
              description={organization.address}
              // subtitle={organization.admins[0]?.name || ''}
              href={`${hrefRoot}/${organization._id}`}
              image=""
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};
ChooseOrganizationPage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;
export default ChooseOrganizationPage;
