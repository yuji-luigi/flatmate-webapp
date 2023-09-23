import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { Box, Card, Group, LoadingOverlay, Tabs, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { dashboardStyle, profilePageStyle } from '../../../../styles/global-useStyles';
import ProfileSide from '../../../../components/profile/side/ProfileSide';
import { Icons } from '../../../../data/icons/icons';

import ProfileCoverGeneric from '../../../../components/profile/ProfileCoverGeneric';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { SpacePostSection } from './SpacePostSection';
import { SpaceMaintenanceSection } from './SpaceMaintenanceSection';
import { TabList } from '../../../../components/profile/tab/TabList';
import { TabPanels } from '../../../../components/profile/tab/TabPanels';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
import { MaintenanceListCard } from '../side-cards/maintenance-card/MaintenancesCard';
import { SpaceModel } from '../../../../types/models/space-model';
import useAuth from '../../../../../hooks/useAuth';
import { useCookieContext } from '../../../../context/CookieContext';
import { ExpandedSection } from '../../../../components/grid/ExpandedSection';
import { NotificationCardTop } from '../side-cards/notification-card/NotificationCardTop';
import DashboardSection from './DashboardTopSection';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;

const TabListConfig = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
  },
  {
    label: 'Posts',
    value: 'posts',
    icon: <Icons.article size="1.5rem" />,
    component: SpacePostSection,
  },
  {
    label: 'Maintenance',
    value: 'maintenance',
    icon: <Icons.maintenance size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: 'Invoice',
    value: 'invoice',
    icon: <Icons.invoice size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
];

const SpaceHomeSection = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const bgColor = theme.colorScheme === 'dark' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';
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
        <ExpandedSection>
          <NotificationCardTop />
          <MaintenanceListCard />
        </ExpandedSection>
      }
    />
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollY } = window;
        const speed = 0.7; // Adjust this value to change the speed. Values between 0.1 to 1 work best.
        const offset = scrollY * speed;

        containerRef.current.style.backgroundPosition = `center ${-offset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (!document) {
    router.push('/404');
    return <LoadingOverlay visible />;
  }
  const hideSide = selectedTab !== TabListConfig[0].value;
  return (
    <Box
      className={classes.container}
      ref={containerRef}
      sx={{
        backgroundImage: `url(${document.cover?.url})`,
        backgroundBlendMode: 'overlay',
        backgroundColor: bgColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        // minHeight: '100vh',
        // set overlay color
      }}
    >
      {/* <SettingButtonSpaceHome /> */}
      <Tabs
        onTabChange={handleSetTab}
        keepMounted={false}
        defaultValue={TabListConfig[0].value}
        sx={{ width: '100%' }}
      >
        <TabList list={TabListConfig} spaceSetting />
        <Box className={classes.box}>
          <Box className={classes.coverTop}>
            <Group sx={{ maxHeight: 300, width: '100%' }}>
              {/* <ProfileCoverGeneric
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
              /> */}
              {!isMobile && !hideSide && profileSide}
            </Group>
            {isMobile && !hideSide && profileSide}
            <TabPanels list={TabListConfig} />
          </Box>
        </Box>
      </Tabs>
    </Box>
  );
};

export default SpaceHomeSection;
