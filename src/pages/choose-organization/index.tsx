import React, { ReactElement, useEffect } from 'react';
import { Box, Divider, Stack, Text, createStyles } from '@mantine/core';
import { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';
import PostList from '../../sections/@dashboard/posts_list_page/PostList';
import {
  CardArticleVerticalTextBottom,
  CardData,
} from '../../components/card/CardVerticalTextBottom';
import { CARD_LINK_PATH, PATH_CLIENT } from '../../path/path-frontend';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/path-api';
import { CardArticleVerticalTextCenter } from '../../components/card/CardVerticalTextCenter';
import Layout from '../../layouts';
import { OrganizationModel } from '../../types/models/organization-model';
import { SpaceModel } from '../../types/models/space-model';
import { CardArticleSmall } from '../../components/card/CardArticleSmall';
import { CardForListSmall } from '../../components/card/CardForListSmall';

const useStyles = createStyles((theme) => ({
  pinContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 600,
    margin: 'auto',
    gap: 8,
  },
  // pinContainer: {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(auto-fill, 400px)',
  //   gridAutoRows: 'minmax(50px, auto)',
  //   justifyContent: 'center',
  //   gap: 10,
  // },
}));
const ChooseOrganizationPage = () => {
  const { user } = useAuth();
  const [organizations, setOrganizations] = React.useState<OrganizationModel[] | SpaceModel[]>([]);
  const { classes, cx, theme } = useStyles();
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
    return null;
  }

  return (
    <Stack justify="center">
      <Text variant="text" size={36} weight={600} align="center">
        {title}
      </Text>
      <Divider />

      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {user?.role === 'super_admin' && (
          <CardForListSmall title="All organizations" href={PATH_CLIENT.root} image="" />
          // <CardArticleVerticalTextCenter
          //   data={{
          //     href: PATH_CLIENT.root,
          //     _id: '',
          //     name: ' Browse all organizations',
          //     address: '',
          //     createdAt: '',
          //   }}
          // />
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
          // <CardArticleVerticalTextBottom
          //   key={organization._id}
          //   data={organization as CardData}
          //   href={`${hrefRoot}/${organization._id}`}
          // />
        ))}
      </Box>
    </Stack>
  );
};
ChooseOrganizationPage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;
export default ChooseOrganizationPage;
