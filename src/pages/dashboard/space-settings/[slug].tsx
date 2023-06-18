import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Layout from '../../../layouts';
import { Box, Button, Container, Text } from '@mantine/core';
import { dashboardStyle, profilePageStyle } from '../../../styles/global-useStyles';
import ProfileSide from '../../../components/profile/side/ProfileSide';
import AboutCard from '../../../components/profile/side/AboutCard';
import CardWithTitle from '../../../components/profile/side/CardWithTitle';
import TextWithIcon from '../../../components/text/TextWithIcon';
import { Icons } from '../../../data/icons';
import { maintainersTableData } from '../../../../json/dataTable/formfields/maintainersTableData';
import { lorem100 } from '../../../_mock/strings';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import ProfileCover, { CoverDataProp } from '../../../components/profile/ProfileCover';
import { RANDOM_UPLOAD_MODELS } from '../../../lib/image-paths';
import { useMediaQuery } from '@mantine/hooks';
import { FormSpaceSetting } from '../../../sections/dashboard_sections/space_setting_section/FormSpaceSetting';
import useSWR from 'swr';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/api-routes';
import { AxiosError } from 'axios';
import LoadingScreen from '../../../components/screen/LoadingScreen';
import ExampleForm from '../../../sections/dashboard_sections/space_setting_section/example/ExampleForm';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const spaceFetcher = async (args: string) => {
  try {
    const rawSpace = await axiosInstance.get(`${PATH_API.spaceSlug}/${args}`);
    return rawSpace.data.data;
  } catch (error) {}
};

const SpaceSettingSinglePage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { classes: classes1 } = useStyles();
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const isMobile = useMediaQuery('(max-width: 800px)');

  const { data, error, isLoading } = useSWR<SpaceModel | null, AxiosError>(slug, () =>
    spaceFetcher(slug)
  );

  if (!data) return <LoadingScreen />;

  const coverData: CoverDataProp = {
    title: data.name,
    subtitle: data.address,
    coverUrl: data.cover?.url,
    avatarUrl: data.avatar?.url,
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        <Box className={classes.cardMain}>
          <ProfileCover formFields={maintainersTableData} data={coverData} />
          <FormSpaceSetting />
          <ExampleForm />
        </Box>
      </Box>
    </Container>
  );
};

// get layout
SpaceSettingSinglePage.getLayout = (page: ReactElement) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default SpaceSettingSinglePage;
