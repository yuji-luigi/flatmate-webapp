import { Box, Group } from '@mantine/core';
import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useMediaQuery } from '@mantine/hooks';
import Layout from '../../../../../layouts';
import ProfileCoverGeneric, {
  CoverDataProp,
} from '../../../../../components/profile/ProfileCoverGeneric';
import { useCrudSliceStore } from '../../../../../redux/features/crud/crudSlice';
import { getEntityFromUrl } from '../../../../../utils/helpers/helper-functions';
import axiosInstance from '../../../../../utils/axios-instance';
import { PATH_API } from '../../../../../path/path-api';
import AboutCard from '../../../../../components/profile/side/AboutCard';
import ProfileSide from '../../../../../components/profile/side/ProfileSide';
import { RANDOM_UPLOAD_MODELS } from '../../../../../lib/image-paths';
import PostFeedCard from '../../../../../components/posts/feed/PostFeedCard';
import { lorem100 } from '../../../../../_mock/strings';
import { maintainersTableData } from '../../../../../../json/dataTable/formfields/maintainersTableData';
import { useCustomModalContext } from '../../../../../context/modal-context/_ModalContext';
import AddMaintainerModal from '../../../../../sections/dashboard/maintenance_detail_page/AddMaintainerModal';

import classes from '../../../../styles/global-useStyles.module.css';

import { UserModel } from '../../../../../types/models/user-model';
import { BuildingCard } from '../../../../../sections/dashboard/maintainer_detail_page/BuildingCard';
import { AddRemoveButton } from '../../../../../sections/dashboard/maintainer_detail_page/AddRemoveButton';
import { ThreadModel } from '../../../../../types/models/thread-model';

const getMaintainer = async (slug?: string) => {
  if (!slug) return null;
  const res = await axiosInstance.get(`${PATH_API.maintainersSlug}/${slug}`);
  return res.data.data;
};

const MaintainerDetailsPage = () => {
  const router = useRouter();

  const { openConfirmModal } = useCustomModalContext();

  const _entity = getEntityFromUrl();
  const {
    data: fetchedData,
    // error,
    isLoading,
  } = useSWR(['maintainer', router.query.slug], () => getMaintainer(router.query.slug as string));

  const { setCrudDocument } = useCrudSliceStore();
  // const { crudDocument: document } = useCrudSelectors(_entity);

  const isMobile = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    if (fetchedData) {
      setCrudDocument({ entity: _entity, document: fetchedData });
    }
  }, [fetchedData?._id]);

  if (isLoading) return 'isLoading';

  const data = fetchedData
    ? {
        title: fetchedData.name,
        subtitle: fetchedData.company,
        avatarUrl: fetchedData.avatar?.url,
        coverUrl: fetchedData.cover?.url,
      }
    : ({} as CoverDataProp);
  // create about data
  const aboutData = {
    // title: 'About',
    email: fetchedData?.email,
    tel: fetchedData?.tel,
    company: fetchedData?.company,
    address: fetchedData?.address,
  };
  const handleAddMaintainer = async () => {
    // setSpaces(data);
    // setIsOpened(true);
    openConfirmModal({
      type: 'custom',
      title: 'Add Maintainer to Building',
      centered: true,
      children: <AddMaintainerModal />,
      // onConfirm(): void {
      //   throw new Error('Function not implemented.');
      // },
    });
  };

  const profileSide = (
    <ProfileSide
      contents={
        <>
          <AddRemoveButton onClick={handleAddMaintainer} />
          <AboutCard aboutData={aboutData} />
          <BuildingCard />
        </>
      }
    />
  );

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.box}>
          <Box className={classes.cardMain}>
            <Group>
              <ProfileCoverGeneric formFields={maintainersTableData} data={data} />
              {isMobile && profileSide}
              {!isMobile && profileSide}
            </Group>
            <PostFeedCard
              data={
                {
                  _id: 'd',
                  createdAt: new Date(),
                  createdBy: { name: 'No name user' } as UserModel,
                  title: 'The First Job! maintainers detail page!',
                  description: lorem100,
                  images: RANDOM_UPLOAD_MODELS,
                  attachments: [],
                } as ThreadModel
              }
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

MaintainerDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default MaintainerDetailsPage;