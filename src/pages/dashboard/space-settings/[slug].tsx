import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../layouts';
import { Grid } from '@mantine/core';
import { dashboardStyle, profilePageStyle } from '../../../styles/global-useStyles';

import { maintainersTableData } from '../../../../json/dataTable/formfields/maintainersTableData';

import ProfileCover, { CoverDataProp } from '../../../components/profile/ProfileCover';

import { SpaceSettingForm } from '../../../sections/dashboard_pages/space_setting_section/SpaceSettingForm';
import useSWR from 'swr';
import axiosInstance, { AxiosResDataGeneric } from '../../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../../path/path-api';
import { AxiosError } from 'axios';
import LoadingScreen from '../../../components/screen/LoadingScreen';

import { SpaceSlugResponse } from '../../../types/api-response/space-response';
import { SpaceSettingMaintainersSection } from '../../../sections/dashboard_pages/space_setting_section/maintainers_section/SpaceSettingMaintainersSection';
import { useCookieContext } from '../../../context/CookieContext';
import { PATH_CLIENT } from '../../../path/path-frontend';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const SpaceSettingSinglePage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { currentSpace } = useCookieContext();
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();
  const { crudDocument: space } = useCrudSelectors('spaces');
  const { crudDocuments: maintainers } = useCrudSelectors('maintainers');
  const [isSpaceAdmin, setIsSpaceAdmin] = useState(false);
  const { classes: classes1 } = useStyles();
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  // const { data, error, isLoading } = useSWR<SpaceSlugResponse | null, AxiosError>(`${slug}}`, () =>
  //   spaceFetcher(slug)
  // );

  useEffect(() => {
    if (currentSpace && currentSpace.slug) {
      router.push(`${PATH_CLIENT.spaceSettings}/${currentSpace.slug}`);
      axiosInstance.get(`${_PATH_API.spaces.settings}/${currentSpace?.slug}`).then((rawRes) => {
        const data = rawRes.data.data;
        setIsSpaceAdmin(data.isSpaceAdmin);
        setCrudDocument({ entity: 'spaces', document: data.space });
        setCrudDocuments({ entity: 'maintainers', documents: data.maintainers });
      });
    }
  }, [currentSpace?.slug]);

  // useEffect(() => {
  //   if (data?.space) {
  //     setCrudDocument({ entity: 'spaces', document: data.space });
  //   }
  // }, [data?.space._id]);

  if (!space) return <LoadingScreen />;
  console.log(space.name);
  const coverData: CoverDataProp = {
    title: space.name,
    subtitle: space.address,
    coverUrl: space.cover?.url,
    avatarUrl: space.avatar?.url,
  };
  // return null;
  return (
    <Grid className={classes.container}>
      {/* <Box className={classes.box}> */}
      {/* <Box className={classes.cardMain}> */}
      <Grid.Col md={12} lg={5}>
        <ProfileCover
          noAvatar
          sx={{ height: '100%' }}
          data={coverData}
          enableCover={isSpaceAdmin}
        />
      </Grid.Col>
      <Grid.Col md={12} lg={7}>
        <SpaceSettingForm data={space} isSpaceAdmin={isSpaceAdmin} sx={{ width: '100%' }} />
      </Grid.Col>
      <Grid.Col span={12}>
        <SpaceSettingMaintainersSection maintainers={maintainers} />
      </Grid.Col>
    </Grid>
  );
};

// get layout
SpaceSettingSinglePage.getLayout = (page: ReactElement) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default SpaceSettingSinglePage;
