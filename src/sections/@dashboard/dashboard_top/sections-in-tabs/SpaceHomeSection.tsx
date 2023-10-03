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

const SpaceHomeSection = () => {
  const { classes: classes1 } = useStyles();
  const entity = 'spaces';
  const { currentTab } = useTabContext();
  // combine styles
  const { classes: classes2 } = useStyles2();
  // put 2 styles together in one object
  const classes = { ...classes1, ...classes2 };
  const { crudDocument: document } = useCrudSelectors<SpaceModel>(entity);

  if (!document) {
    // router.push('/404');
    return <LoadingOverlay visible />;
  }
  return (
    <Box className={classes.container}>
      <TabPanels list={TAB_LIST_CONFIG} />
    </Box>
  );
};

export default memo(SpaceHomeSection);
