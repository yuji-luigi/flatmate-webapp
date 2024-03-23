import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import Layout from "../../../../layouts";
import classes from "../../../styles/global-useStyles.module.css";

import ProfileCoverGeneric, {
  CoverDataProp,
} from "../../../../components/profile/ProfileCoverGeneric";

// import ProfileCoverGeneric, {
//   CoverDataProp,
// } from '../../../components/profile/ProfileCoverGenericGeneric';

import { SpaceSettingForm } from "../../../../sections/dashboard/space_setting_section/SpaceSettingForm";
import axiosInstance from "../../../../utils/axios-instance";
import { _PATH_API } from "../../../../path/path-api";
import LoadingScreen from "../../../../components/screen/LoadingScreen";

import { SpaceSettingMaintainersSection } from "../../../../sections/dashboard/space_setting_section/maintainers_section/SpaceSettingMaintainersSection";
import { useCookieContext } from "../../../../context/CookieContext";
import { PATH_CLIENT } from "../../../../path/path-frontend";
import { useCrudSelectors, useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import { SpaceModel } from "../../../../types/models/space-model";
import { MaintainerModel } from "../../../../types/models/maintainer-model";

const SpaceSettingSinglePage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { currentSpace } = useCookieContext();
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();
  const { crudDocument: space } = useCrudSelectors<SpaceModel>("spaces");
  const { crudDocuments: maintainers } = useCrudSelectors<MaintainerModel>("maintainers");
  const [isSpaceAdmin, setIsSpaceAdmin] = useState(false);

  // const { data, error, isLoading } = useSWR<SpaceSlugResponse | null, AxiosError>(`${slug}}`, () =>
  //   spaceFetcher(slug)
  // );

  useEffect(() => {
    if (currentSpace && currentSpace.slug) {
      router.push(`${PATH_CLIENT.spaceSettings}/${currentSpace.slug}`);
      axiosInstance.get(`${_PATH_API.spaces.settings}/${currentSpace?.slug}`).then((rawRes) => {
        const { data } = rawRes.data;
        setIsSpaceAdmin(data.isSpaceAdmin);
        setCrudDocument({ entity: "spaces", document: data.space });
        setCrudDocuments({ entity: "maintainers", documents: data.maintainers });
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
      <Grid.Col span={{ md: 12, lg: 5 }}>
        <ProfileCoverGeneric
          noAvatar
          style={{ height: "100%" }}
          data={coverData}
          enableCover={isSpaceAdmin}
        />
      </Grid.Col>
      <Grid.Col span={{ md: 12, lg: 7 }}>
        <SpaceSettingForm data={space} isSpaceAdmin={isSpaceAdmin} style={{ width: "100%" }} />
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
