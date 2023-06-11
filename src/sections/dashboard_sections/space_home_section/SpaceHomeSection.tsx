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
import ProfileCover from '../../../components/profile/ProfileCover';
import { RANDOM_UPLOAD_MODELS } from '../../../lib/image-paths';
import { useMediaQuery } from '@mantine/hooks';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const SpaceHomeSection = () => {
  const router = useRouter();
  const { classes: classes1 } = useStyles();
  const entity = 'spaces';
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const isMobile = useMediaQuery('(max-width: 800px)');
  const { selectedCrudDocument: document }: { selectedCrudDocument: SpaceModel } =
    useCrudSelectors(entity);

  const profileSide = (
    <ProfileSide
      contents={
        <>
          {/* <AboutCard aboutData={aboutData} /> */}
          <CardWithTitle titleSx={{ fontSize: 24 }} title="Condominium/Office">
            <Text>No spaces assigned</Text>
          </CardWithTitle>
        </>
      }
    />
  );
  console.log(document);
  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        <Box className={classes.cardMain}>
          <ProfileCover
            noAvatar
            entity={entity}
            formFields={maintainersTableData}
            data={{
              title: document.name,
              _id: document._id,
              subtitle: document.address,
              avatarUrl: document.avatar?.url,
              coverUrl: document.cover?.url,
            }}
          />
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

export default SpaceHomeSection;
