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
} from '@mantine/core';
import React, { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import ProfileCover, { DataProp } from '../../../components/profile/ProfileCover';
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
const spaceFormField = {
  id: 'space',
  label: 'Space',
  required: true,
  helperText: 'Select a space',
};
const useStyles = createStyles((theme) => ({
  container: {
    // paddingInline: 'auto',
    paddingBlock: 32,
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    // height: rem(100),
    // backgroundColor: theme.colors.blue[6],

    // Media query with value from theme
    // [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.xl) - 1)})`]: {
    //   backgroundColor: theme.colors.pink[6],
    // },

    // Simplify media query writing with theme functions
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      // backgroundColor: theme.cdolors.yellow[6],
    },

    // Static media query
    [`@media (max-width: ${em(800)})`]: {
      // backgroundColor: theme.colors.orange[6],
    },
  },
  cardMain: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '70%',
    [theme.fn.smallerThan('md')]: {
      width: '60%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
  },
  sideBox: {
    width: '30%',
    gap: 16,
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
    },
    [theme.fn.smallerThan('sm')]: {
      width: '100%', // backgroundColor: theme.cdolors.yellow[6],
      // flexDirection: 'row',
    },
  },
  feedCard: {
    minHeight: 200,
  },
  feedContent: {
    padding: 16,
    paddingInline: 24,
  },
}));

const getMaintainer = async (id?: string) => {
  if (!id) return;
  const res = await axiosInstance.get(`${PATH_API.maintainers}/${id}`);
  return res.data.data;
};

const MaintainerDetailsPage = () => {
  const { cx, classes, theme } = useStyles();
  const router = useRouter();

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
    : ({} as DataProp);
  // create about data
  const aboutData = {
    // title: 'About',
    email: document?.email,
    tel: document?.tel,
    company: document?.company,
    address: document?.address,
  };
  const handleAddMaintainer = async () => {
    console.log('add maintainer');
    console.log(document?._id);
    console.log(document?.name);
    // fetch mainSpaces of organization
    const res = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
    console.log(res.data.data);
    const data: SelectItem[] = res.data.data.map((space: SpaceModel) => ({
      value: space._id,
      label: space.name,
    }));
    openConfirmModal({
      title: 'Add Maintainer to Building',
      labels: {
        confirm: 'Confirm',
        cancel: 'Cancel',
      },
      centered: true,
      children: '',
      type: 'confirm',

      onConfirm: function (data: any): void {},
    });
  };

  const profileSide = (
    <ProfileSide
      contents={
        <>
          <Button onClick={handleAddMaintainer} variant="outline" color="yellow">
            Add Maintainer to Building
          </Button>
          <AboutCard aboutData={aboutData} />
          <></>
        </>
      }
      aboutData={aboutData}
    />
  );

  return (
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
  );
};

MaintainerDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default MaintainerDetailsPage;
