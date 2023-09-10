import { useRouter } from 'next/router';
import React from 'react';
import { Box, LoadingOverlay, Tabs } from '@mantine/core';
import { dashboardStyle, profilePageStyle } from '../../../styles/global-useStyles';
import ProfileSide from '../../../components/profile/side/ProfileSide';
import CardWithTitle from '../../../components/profile/side/CardWithTitle';
import { Icons } from '../../../data/icons';

import ProfileCover from '../../../components/profile/ProfileCover';
import { useMediaQuery } from '@mantine/hooks';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';

import { SpacePostSection } from './SpacePostSection';
import { SpaceMaintenanceSection } from './SpaceMaintenanceSection';
import { TabList } from '../../../components/profile/tab/TabList';
import { TabPanels } from '../../../components/profile/tab/TabPanels';
import { MaintainerList } from './side-cards/maintainerCard/MaintainerList';
import { SettingButtonSpaceHome } from './SettingButtonSpaceHome';
import { MaintainerModel } from '../../../types/models/maintainer-model';
import { MaintenanceListCard } from './side-cards/maintenance-card/MaintenancesCard';
import { SpaceModel } from '../../../types/models/space-model';
import { spacesTableData } from '../../../../json/dataTable/formfields/spacesTableData';
import useAuth from '../../../../hooks/useAuth';
import { useCookieContext } from '../../../context/CookieContext';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const TabListConfig = [
  {
    label: 'Posts',
    value: 'posts',
    icon: <Icons.article size="0.8rem" />,
    component: SpacePostSection,
  },
  {
    label: 'Maintenance',
    value: 'maintenance',
    icon: <Icons.maintenance size="0.8rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: 'Invoice',
    value: 'invoice',
    icon: <Icons.invoice size="0.8rem" />,
    component: SpaceMaintenanceSection,
  },
];

const SpaceHomeSection = () => {
  const router = useRouter();
  const { crudDocuments: maintainers } = useCrudSelectors<MaintainerModel>('maintainers');
  const { currentSpace } = useCookieContext();
  const { user } = useAuth();
  const { classes: classes1 } = useStyles();
  const entity = 'spaces';
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const isMobile = useMediaQuery('(max-width: 800px)');
  const { crudDocument: document } = useCrudSelectors<SpaceModel>(entity);

  const profileSide = (
    <ProfileSide
      contents={
        <>
          <CardWithTitle titleSx={{ fontSize: 24 }} title="Maintainers">
            <MaintainerList maintainers={maintainers} />
          </CardWithTitle>
          <MaintenanceListCard />
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
      <Tabs
        placement="right"
        keepMounted={false}
        defaultValue={TabListConfig[0].value}
        sx={{ width: '100%' }}
      >
        <Box className={classes.box}>
          <Box className={classes.cardMain}>
            <ProfileCover
              noAvatar
              enableCover={!!(currentSpace && user?.role !== 'user')}
              entity={entity}
              // formFields={spacesTableData}
              data={{
                title: document.name,
                _id: document._id,
                subtitle: document.address,
                avatarUrl: document.cover?.url,
                coverUrl: document.cover?.url,
              }}
            />
            {isMobile && profileSide}
            <TabList list={TabListConfig} />
            <TabPanels list={TabListConfig} />
          </Box>
          {!isMobile && profileSide}
        </Box>
      </Tabs>
    </Box>
  );
};

export default SpaceHomeSection;
