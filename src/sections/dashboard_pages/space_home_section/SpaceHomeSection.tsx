import { useRouter } from 'next/router';
import React from 'react';
import { Box, Group, LoadingOverlay, Stack, Tabs } from '@mantine/core';
import { dashboardStyle, profilePageStyle } from '../../../styles/global-useStyles';
import ProfileSide from '../../../components/profile/side/ProfileSide';
import CardWithTitle from '../../../components/profile/side/CardWithTitle';
import { Icons } from '../../../data/icons/icons';

import ProfileCoverGeneric from '../../../components/profile/ProfileCoverGeneric';
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

  const [selectedTab, setSelectedTab] = React.useState(TabListConfig[0].value);
  const handleSetTab = (selected: string) => setSelectedTab(selected);
  const profileSide = (
    <ProfileSide
      contents={
        <Stack>
          <CardWithTitle title="Maintainers">
            <MaintainerList maintainers={maintainers} />
          </CardWithTitle>
          <MaintenanceListCard />
        </Stack>
      }
    />
  );

  if (!document) {
    router.push('/404');
    return <LoadingOverlay visible />;
  }
  const hideSide = selectedTab !== TabListConfig[0].value;
  return (
    <Box className={classes.container}>
      <SettingButtonSpaceHome />
      <Tabs
        onTabChange={handleSetTab}
        keepMounted={false}
        defaultValue={TabListConfig[0].value}
        sx={{ width: '100%' }}
      >
        <Box className={classes.box}>
          <Box className={classes.cardMain}>
            <Group>
              <ProfileCoverGeneric
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
              {!isMobile && !hideSide && profileSide}
            </Group>
            {isMobile && !hideSide && profileSide}
            <TabList list={TabListConfig} />
            <TabPanels list={TabListConfig} />
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
};

export default SpaceHomeSection;
