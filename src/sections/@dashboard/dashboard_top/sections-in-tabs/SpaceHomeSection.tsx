import React, { memo } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import { dashboardStyle, profilePageStyle } from '../../../../styles/global-useStyles';

import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { SpaceModel } from '../../../../types/models/space-model';
import { TAB_LIST_CONFIG } from './tabList';
import { useTabContext } from '../../../../context/tab-context/TabContextProvider';
import { useCustomMQuery } from '../../../../../hooks/useCustomMQuery';
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
      {/* <Box className={classes.box}> */}
      {/* <Box className={classes.coverTop}> */}
      {/* {currentTab === TAB_LIST_CONFIG[0].value && homeSummary} */}
      <TabPanels list={TAB_LIST_CONFIG} />
      {/* </Box> */}
      {/* </Box> */}
    </Box>
  );
};

export default memo(SpaceHomeSection);
