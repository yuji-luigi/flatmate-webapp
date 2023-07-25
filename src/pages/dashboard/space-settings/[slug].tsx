import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import { Grid } from '@mantine/core';
import { dashboardStyle, profilePageStyle } from '../../../styles/global-useStyles';

import { maintainersTableData } from '../../../../json/dataTable/formfields/maintainersTableData';

import ProfileCover, { CoverDataProp } from '../../../components/profile/ProfileCover';

import { SpaceSettingForm } from '../../../sections/dashboard_pages/space_setting_section/SpaceSettingForm';
import useSWR from 'swr';
import axiosInstance, { AxiosResDataGeneric } from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/api-routes';
import { AxiosError } from 'axios';
import LoadingScreen from '../../../components/screen/LoadingScreen';

import { SpaceSlugResponse } from '../../../types/api-response/space-response';
import { SpaceSettingMaintainersSection } from '../../../sections/dashboard_pages/space_setting_section/maintainers_section/SpaceSettingMaintainersSection';
import { useCookieContext } from '../../../context/CookieContext';
import { PATH_CLIENT } from '../../../path/page-paths';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const spaceFetcher = async (args: string) => {
  try {
    // get single space and also maintainers of the space
    const rawSpace = await axiosInstance.get(`${PATH_API.spaceSlug}/${args}`);
    return rawSpace.data.data;
  } catch (error: any) {
    console.error(error.message || error);
  }
};

const SpaceSettingSinglePage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { currentSpace } = useCookieContext();

  const { classes: classes1 } = useStyles();
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const { data, error, isLoading } = useSWR<SpaceSlugResponse | null, AxiosError>(slug, () =>
    spaceFetcher(slug)
  );

  useEffect(() => {
    if (currentSpace && currentSpace.slug) {
      router.push(`${PATH_CLIENT.spaceSettings}/${currentSpace.slug}`);
    }
  }, [currentSpace?.slug]);

  if (!data) return <LoadingScreen />;
  const { space, maintainers } = data;
  const coverData: CoverDataProp = {
    title: space.name,
    subtitle: space.address,
    coverUrl: space.cover?.url,
    avatarUrl: space.avatar?.url,
  };

  return (
    <Grid className={classes.container}>
      {/* <Box className={classes.box}> */}
      {/* <Box className={classes.cardMain}> */}
      <Grid.Col md={12} lg={5}>
        <ProfileCover
          noAvatar
          sx={{ height: '100%' }}
          formFields={maintainersTableData}
          data={coverData}
        />
      </Grid.Col>
      <Grid.Col md={12} lg={7}>
        <SpaceSettingForm data={data} sx={{ width: '100%' }} />
      </Grid.Col>
      <Grid.Col span={12}>
        <SpaceSettingMaintainersSection maintainers={data.maintainers} />
      </Grid.Col>
    </Grid>
  );
};

// get layout
SpaceSettingSinglePage.getLayout = (page: ReactElement) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default SpaceSettingSinglePage;
