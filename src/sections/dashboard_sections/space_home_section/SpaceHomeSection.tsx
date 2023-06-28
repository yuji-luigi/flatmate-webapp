import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import Layout from '../../../layouts';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Tabs,
  Text,
} from '@mantine/core';
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
import { IconMessageCircle, IconSettings, IconCoin } from '@tabler/icons-react';
import { SpacePostSection } from './SpacePostSection';
import { SpaceMaintenanceSection } from './SpaceMaintenanceSection';
import { TabList } from '../../../components/profile/tab/TabList';
import { TabPanels } from '../../../components/profile/tab/TabPanels';
import { MaintainerList } from './maintainerCard/MaintainerList';
import { SettingButtonSpaceHome } from './SettingButtonSpaceHome';
import { MaintainerModel } from '../../../types/models/maintainer-model';
import { UserModel } from '../../../types/models/user-model';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const TabListConfig = [
  {
    label: 'Posts',
    value: 'posts',
    icon: <IconMessageCircle size="0.8rem" />,
    component: <SpacePostSection />,
  },
  {
    label: 'Maintenance',
    value: 'maintenance',
    icon: <IconMessageCircle size="0.8rem" />,
    component: <SpaceMaintenanceSection />,
  },
];

const SpaceHomeSection = () => {
  const router = useRouter();

  const { crudDocuments: maintainers } = useCrudSelectors<MaintainerModel>('maintainers');
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');

  const { classes: classes1 } = useStyles();
  const entity = 'spaces';
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const isMobile = useMediaQuery('(max-width: 800px)');
  const { selectedCrudDocument: document } = useCrudSelectors<SpaceModel>(entity);

  // const profileSide = <ProfileSide contents={null}></ProfileSide>;
  const profileSide = (
    <ProfileSide
      contents={
        <>
          <CardWithTitle titleSx={{ fontSize: 24 }} title="Maintainers">
            <MaintainerList maintainers={maintainers} />
          </CardWithTitle>
          <CardWithTitle titleSx={{ fontSize: 24 }} title="Maintenaces">
            {maintenances.map((maintenance) => (
              <Text>{maintenance.title}</Text>
            ))}
          </CardWithTitle>
        </>
      }
    />
  );

  if (!document) {
    router.push('/404');
    return <LoadingOverlay visible />;
  }

  return (
    <Box className={classes.container}>
      <SettingButtonSpaceHome />
      <Tabs placement="right" defaultValue={TabListConfig[0].value} sx={{ width: '100%' }}>
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
            <TabList list={TabListConfig} />
            <TabPanels list={TabListConfig} />
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
      </Tabs>
    </Box>
  );
};

export default SpaceHomeSection;
