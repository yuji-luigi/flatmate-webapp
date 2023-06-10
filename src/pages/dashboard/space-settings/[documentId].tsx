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

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const SpaceSettingSinglePage = () => {
  const router = useRouter();
  const { classes: classes1 } = useStyles();
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const isMobile = useMediaQuery('(max-width: 800px)');

  const profileSide = (
    <ProfileSide
      contents={
        <>
          <Button onClick={() => {}} variant="outline" color="yellow">
            Add Maintainer to Building
          </Button>
          {/* <AboutCard aboutData={aboutData} /> */}

          <CardWithTitle titleSx={{ fontSize: 24 }} title="Condominium/Office">
            <Text>No spaces assigned</Text>
          </CardWithTitle>
        </>
      }
    />
  );

  return (
    <Container className={classes.container}>
      <Box className={classes.box}>
        <Box className={classes.cardMain}>
          <ProfileCover
            formFields={maintainersTableData}
            data={{ title: 'title', subtitle: 'sub' }}
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

// get layout
SpaceSettingSinglePage.getLayout = (page: ReactElement) => (
  <Layout variant="dashboard">{page}</Layout>
);
export default SpaceSettingSinglePage;
