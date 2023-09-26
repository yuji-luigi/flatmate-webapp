import { useRouter } from 'next/router';
import React, { memo, useEffect, useRef } from 'react';
import { Box, Card, Grid, Group, LoadingOverlay, Tabs, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { dashboardStyle, profilePageStyle } from '../../../../styles/global-useStyles';
import ProfileSide from '../../../../components/profile/side/ProfileSide';
import { Icons } from '../../../../data/icons/icons';

import ProfileCoverGeneric from '../../../../components/profile/ProfileCoverGeneric';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { SpacePostSection } from './SpacePostSection';
import { SpaceMaintenanceSection } from './SpaceMaintenanceSection';

import { MaintainerModel } from '../../../../types/models/maintainer-model';
import { MaintenanceListCard } from '../side-cards/maintenance-card/MaintenancesCard';
import { SpaceModel } from '../../../../types/models/space-model';
import useAuth from '../../../../../hooks/useAuth';
import { useCookieContext } from '../../../../context/CookieContext';
import { ExpandedSection } from '../../../../components/grid/ExpandedSection';
import { NotificationCardTop } from '../side-cards/notification-card/NotificationCardTop';
import DashboardSection from './stats-home/DashboardTopSection';
import { TAB_LIST_CONFIG } from './tabList';
import { useTabContext } from '../../../../context/tab-context/TabContextProvider';
import { useCustomMQuery } from '../../../../../hooks/useCustomMQuery';
import { TabList } from '../../../../components/tab/TabList';
import { TabPanels } from '../../../../components/tab/TabPanels';

// use style from global-useStyles
const useStyles = dashboardStyle;
const useStyles2 = profilePageStyle;
// const TAB_LIST_CONFIG = [
//   {
//     label: 'Dashboard',
//     value: 'dashboard',
//     icon: <Icons.reportAnalytics size="1.5rem" />,
//     component: DashboardSection,
//   },
//   {
//     label: 'Posts',
//     value: 'posts',
//     icon: <Icons.article size="1.5rem" />,
//     component: SpacePostSection,
//   },
//   {
//     label: 'Maintenance',
//     value: 'maintenance',
//     icon: <Icons.maintenance size="1.5rem" />,
//     component: SpaceMaintenanceSection,
//   },
//   {
//     label: 'Invoice',
//     value: 'invoice',
//     icon: <Icons.invoice size="1.5rem" />,
//     component: SpaceMaintenanceSection,
//   },
// ];

const SpaceHomeSection = () => {
  const { classes: classes1 } = useStyles();
  const entity = 'spaces';
  const { currentTab } = useTabContext();
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const { crudDocument: document } = useCrudSelectors<SpaceModel>(entity);
  const { isMobile } = useCustomMQuery();
  // const homeSummary = (
  //   <Grid justify="stretch" mt={16}>
  //     <Grid.Col md={4} span={12} sx={{ width: '100%', flex: 1 }}>
  //       <NotificationCardTop />
  //     </Grid.Col>
  //     <Grid.Col md={4} span={12} sx={{ width: '100%', flex: 1 }}>
  //       <MaintenanceListCard />
  //     </Grid.Col>
  //     <Grid.Col md={4} span={12} sx={{ width: '100%', flex: 1 }}>
  //       <MaintenanceListCard />
  //     </Grid.Col>
  //   </Grid>
  // );
  if (!document) {
    // router.push('/404');
    return <LoadingOverlay visible />;
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.box}>
        <Box className={classes.coverTop}>
          {/* {currentTab === TAB_LIST_CONFIG[0].value && homeSummary} */}
          <TabPanels list={TAB_LIST_CONFIG} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(SpaceHomeSection);
