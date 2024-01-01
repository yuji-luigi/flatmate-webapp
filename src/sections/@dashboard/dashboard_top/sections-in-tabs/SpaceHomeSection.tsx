import React, { memo } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';
import classes from '../../../../styles/global-useStyles.module.css';

import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { SpaceModel } from '../../../../types/models/space-model';
import { TAB_LIST_CONFIG } from './tabList';
import { TabPanels } from '../../../../components/tab/TabPanels';

const SpaceHomeSection = () => {
  const entity = 'spaces';

  const { crudDocument: document } = useCrudSelectors<SpaceModel>(entity);

  if (!document) {
    // router.push('/404');
    return <LoadingOverlay visible />;
  }
  return null;
  <Box className={classes.container}>
    <TabPanels list={TAB_LIST_CONFIG} />
  </Box>;
};

export default memo(SpaceHomeSection);
