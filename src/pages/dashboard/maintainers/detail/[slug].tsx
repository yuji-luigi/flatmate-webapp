import {
  Box,
  Card,
  Container,
  Title,
  createStyles,
  em,
  getBreakpointValue,
  rem,
  Text,
  Group,
  Avatar,
  Stack,
  Divider,
  Button,
  SelectItem,
  Select,
} from '@mantine/core';
import React, { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../../layouts';
import ProfileCover, { CoverDataProp } from '../../../../components/profile/ProfileCover';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { useRouter } from 'next/router';
import { getEntityFromUrl } from '../../../../utils/helpers/helper-functions';
import { Sections } from '../../../../types/general/data/sections-type';
import useSWR from 'swr';
import axiosInstance from '../../../../utils/axios-instance';
import { PATH_API } from '../../../../path/api-routes';
import AboutCard from '../../../../components/profile/side/AboutCard';
import { useMediaQuery } from '@mantine/hooks';
import ProfileSide from '../../../../components/profile/side/ProfileSide';
import Image from 'next/image';
import { PATH_IMAGE, RANDOM_UPLOAD_MODELS } from '../../../../lib/image-paths';
import AttachmentsRow from '../../../../components/posts/AttachmentsRow';
import { Icons } from '../../../../data/icons';
import PostFeedCard from '../../../../components/posts/feed/PostFeedCard';
import { lorem100 } from '../../../../_mock/strings';
import { maintainersTableData } from '../../../../../json/dataTable/formfields/maintainersTableData';
import { use_ModalContext } from '../../../../context/modal-context/_ModalContext';
import CrudSelect from '../../../../components/input/crud-inputs/CrudSelect';
import AddMaintainerModal from '../../../../sections/dashboard_pages/maintenance_detail_page/AddMaintainerModal';
import CardWithTitle from '../../../../components/profile/side/CardWithTitle';
import TextWithIcon from '../../../../components/text/TextWithIcon';
import { profilePageStyle } from '../../../../styles/global-useStyles';
import { UserModel } from '../../../../types/models/user-model';
import { BuildingCard } from '../../../../sections/dashboard_pages/maintainer_detail_page/BuildingCard';
import { AddRemoveButton } from '../../../../sections/dashboard_pages/maintainer_detail_page/AddRemoveButton';
const spaceFormField = {
  id: 'space',
  label: 'Space',
  required: true,
  helperText: 'Select a space',
};
const useStyles = profilePageStyle;

const getMaintainer = async (slug?: string) => {
  if (!slug) return;
  const res = await axiosInstance.get(`${PATH_API.maintainersSlug}/${slug}`);
  return res.data.data;
};

const MaintainerDetailsPage = () => {
  const { cx, classes, theme } = useStyles();
  const router = useRouter();

  const [space, setSpace] = useState<string | null>(null);
  // const ref = React.useRef<HTMLInputElement>(null);

  const { openModal, openConfirmModal } = use_ModalContext();

  const _entity = getEntityFromUrl();
  const {
    data: fetchedData,
    error,
    isLoading,
  } = useSWR(['maintainer', router.query.slug], () => getMaintainer(router.query.slug as string));

  const { setSingleCrudDocument } = useCrudSliceStore();
  const { selectedCrudDocument: document } = useCrudSelectors(_entity);

  const isMobile = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    if (fetchedData) {
      setSingleCrudDocument({ entity: _entity, document: fetchedData });
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
      onConfirm: function (data: any): void {
        throw new Error('Function not implemented.');
      },
    });
  };

  const profileSide = (
    <ProfileSide
      contents={
        <>
          <AddRemoveButton onClick={handleAddMaintainer} />
          {/* <Button onClick={handleAddMaintainer} variant="outline" color="yellow">
            Add Maintainer to Building
          </Button> */}
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
            <ProfileCover formFields={maintainersTableData} data={data} />
            {isMobile && profileSide}
            <PostFeedCard
              createdAt={new Date()}
              createdBy={{ name: 'No name user' } as UserModel}
              title="The First Job! maintainers detail page!"
              body={lorem100}
              images={RANDOM_UPLOAD_MODELS}
              attachments={[]}
            />
          </Box>
          {!isMobile && profileSide}
        </Box>
      </Box>
    </>
  );
};

MaintainerDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default MaintainerDetailsPage;
