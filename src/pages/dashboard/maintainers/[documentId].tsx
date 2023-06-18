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
import Layout from '../../../layouts';
import ProfileCover, { CoverDataProp } from '../../../components/profile/ProfileCover';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { useRouter } from 'next/router';
import { getWordNextToFromUrl } from '../../../utils/helper-functions';
import { Sections } from '../../../types/general/data/sections-type';
import useSWR from 'swr';
import axiosInstance from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/api-routes';
import AboutCard from '../../../components/profile/side/AboutCard';
import { useMediaQuery } from '@mantine/hooks';
import ProfileSide from '../../../components/profile/side/ProfileSide';
import Image from 'next/image';
import { PATH_IMAGE, RANDOM_UPLOAD_MODELS } from '../../../lib/image-paths';
import AttachmentsRow from '../../../components/posts/AttachmentsRow';
import { Icons } from '../../../data/icons';
import PostFeedCard from '../../../components/posts/feed/PostFeedCard';
import { lorem100 } from '../../../_mock/strings';
import { maintainersTableData } from '../../../../json/dataTable/formfields/maintainersTableData';
import { use_ModalContext } from '../../../context/modal-context/_ModalContext';
import CrudSelect from '../../../components/input/crud-inputs/CrudSelect';
import AddMaintainerModal from '../../../sections/single_maintenance_section/AddMaintainerModal';
import CardWithTitle from '../../../components/profile/side/CardWithTitle';
import TextWithIcon from '../../../components/text/TextWithIcon';
import { profilePageStyle } from '../../../styles/global-useStyles';
const spaceFormField = {
  id: 'space',
  label: 'Space',
  required: true,
  helperText: 'Select a space',
};
const useStyles = profilePageStyle;

const getMaintainer = async (id?: string) => {
  if (!id) return;
  const res = await axiosInstance.get(`${PATH_API.maintainers}/${id}`);
  return res.data.data;
};

const MaintainerDetailsPage = () => {
  const { cx, classes, theme } = useStyles();
  const router = useRouter();

  const [space, setSpace] = useState<string | null>(null);
  // const ref = React.useRef<HTMLInputElement>(null);

  const { openModal, openConfirmModal } = use_ModalContext();

  const _entity = getWordNextToFromUrl() as Sections;
  const {
    data: document,
    error,
    isLoading,
  } = useSWR(['maintainer', router.query.documentId], () =>
    getMaintainer(router.query.documentId as string)
  );

  const { setCrudDocument } = useCrudSliceStore();

  const isMobile = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    if (document) {
      setCrudDocument({ entity: _entity, document });
    }
  }, [document?._id]);

  if (isLoading) return 'isLoading';

  const data = document
    ? {
        title: document.name,
        subtitle: document.company,
        avatarUrl: document.avatar?.url,
        coverUrl: document.cover?.url,
      }
    : ({} as CoverDataProp);
  // create about data
  const aboutData = {
    // title: 'About',
    email: document?.email,
    tel: document?.tel,
    company: document?.company,
    address: document?.address,
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

  const setMaintainerToSpace = async () => {
    console.log(space);
  };

  const profileSide = (
    <ProfileSide
      contents={
        <>
          <Button onClick={handleAddMaintainer} variant="outline" color="yellow">
            Add Maintainer to Building
          </Button>
          <AboutCard aboutData={aboutData} />

          <CardWithTitle titleSx={{ fontSize: 24 }} title="Condominium/Office">
            {document.spaces.length ? (
              document.spaces?.map((space: SpaceModel) => (
                <TextWithIcon key={space._id} icon={<Icons.buildings />} text={space.name} />
              ))
            ) : (
              <Text>No spaces assigned</Text>
            )}
          </CardWithTitle>
        </>
      }
    />
  );

  return (
    <>
      <Container className={classes.container}>
        <Box className={classes.box}>
          <Box className={classes.cardMain}>
            <ProfileCover formFields={maintainersTableData} data={data} />
            {isMobile && profileSide}
            <PostFeedCard
              createdBy={{ name: 'No name user' } as UserModel}
              title="The First Job!"
              body={lorem100}
              images={RANDOM_UPLOAD_MODELS}
              attachments={[]}
            />
          </Box>
          {!isMobile && profileSide}
        </Box>
      </Container>
    </>
  );
};

MaintainerDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default MaintainerDetailsPage;
