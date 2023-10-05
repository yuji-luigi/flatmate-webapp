import { ActionIcon, Divider, Drawer, Indicator, Stack } from '@mantine/core';
import React, { Fragment, useMemo } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Icons } from '../../../../data/icons/icons';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';

import { MaintenanceModel } from '../../../../types/models/maintenance-model';
import { NotificationDrawer } from './NotificationDrawer';
import { CATEGORIES } from '../../../../components/list/notification-list/categories';

export const HeaderNotificationButton = () => {
  // todo: add Notification route in Api to get formatted data. (threads, maintenances, etc. in formatted way as notifications)
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');

  const memoedMaintenances = useMemo(() => {
    return maintenances.map((maintenance) => ({
      ...maintenance,
      entity: 'maintenances',
      category: CATEGORIES.maintenances,
    }));
  }, [maintenances]);
  const notifications = [...memoedMaintenances];

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon onClick={open}>
        <Indicator color="red" size={16} label={maintenances.length}>
          <Icons.bell />
        </Indicator>
      </ActionIcon>
      <NotificationDrawer notifications={notifications} opened={opened} close={close} />
    </>
  );
};
