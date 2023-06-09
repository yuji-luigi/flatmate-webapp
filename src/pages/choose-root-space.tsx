import React, { ReactElement } from 'react';
import useAuth from '../../hooks/useAuth';
import { Box, Button, Divider, Group, Stack, Text, createStyles } from '@mantine/core';
import { CardArticleVerticalTextBottom, CardData } from '../components/card/CardVerticalTextBottom';
import { CARD_LINK_PATH, PATH_DASHBOARD } from '../path/page-paths';
import axiosInstance from '../utils/axios-instance';
import { PATH_API } from '../path/api-routes';

import useSWR from 'swr';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../layouts';
import { UserModel } from '../types/models/user-model';
const useStyles = createStyles((theme) => ({
  pinContainer: {
    // position: 'absolute',
    // width: '100%',
    // left: '50%',
    // transform: 'translateX(-50%)',
    display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(400px, max-content))',
    gridTemplateColumns: 'repeat(auto-fill, 400px)',
    // gridAutoColumns: 'repeat(400px, minmax(400px, 1fr))',
    gridAutoRows: 'minmax(50px, auto)',
    justifyContent: 'center',
    gap: 10,
  },
}));

export const fetchSpaceSelections = async (user?: UserModel | null) => {
  if (!user) return null;
  const res = await axiosInstance.get(PATH_API.getSpaceSelections);
  return res.data?.data;
};

const ChooseRootSpacePage = () => {
  const { user } = useAuth();
  const { classes, cx, theme } = useStyles();
  const router = useRouter();
  const title = user?.role === 'super_admin' ? 'Choose organization' : 'Which building to operate?';
  const hrefRoot = CARD_LINK_PATH.rootSpaceSelected;
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(user, fetchSpaceSelections);

  if (user?.role === 'super_admin') {
    router.push(PATH_DASHBOARD.chooseOrganization);
    return null;
  }
  if (!rootSpaces || isLoading) return <p>loading</p>;

  const handleSpaceSelected = async (mainSpace: SpaceModel) => {
    await axiosInstance.get(`${PATH_API.spaceCookie}/${mainSpace._id}`);
    // router.push(PATH_DASHBOARD.root);
    router.push(`${PATH_DASHBOARD.root}/${mainSpace.slug}`);
  };

  return (
    <Stack p={32}>
      <Group position="apart" align="center">
        <Text variant="text" size={36} weight={600} align="center">
          {title}
        </Text>
      </Group>

      <Box
        className={classes.pinContainer}
        py="xl" /* cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} */
      >
        {rootSpaces.map((rootSpace) => (
          <CardArticleVerticalTextBottom
            key={rootSpace._id}
            data={rootSpace as CardData}
            image={rootSpace.cover?.url}
            onClick={() => handleSpaceSelected(rootSpace)}
            // href={`${hrefRoot}/${rootSpace._id}`}
          />
        ))}
      </Box>
    </Stack>
  );
};

ChooseRootSpacePage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;

export default ChooseRootSpacePage;
