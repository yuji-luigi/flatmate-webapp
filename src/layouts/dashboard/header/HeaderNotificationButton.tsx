import { ActionIcon, Drawer, Indicator, Stack } from '@mantine/core';
import React, { useMemo } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Icons } from '../../../data/icons/icons';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import {
  CATEGORIES,
  NotificationListRoot,
} from '../../../components/list/notification-list/NotificationListRoot';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import classes from './HeaderNotificationButton.module.css';

export const HeaderNotificationButton = () => {
  // todo: add Notification route in Api to get formatted data. (threads, maintenances, etc. in formatted way as notifications)
  const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');

  const memoedMaintenances = useMemo(() => {
    return maintenances.map((maintenance) => ({
      ...maintenance,
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
      <Drawer position="right" size="xs" opened={opened} onClose={close} title="Notifications">
        <Stack className={classes.listContainer}>
          {notifications.map((data) => (
            <NotificationListRoot key={data._id} data={data} />
          ))}
        </Stack>
      </Drawer>
    </>
  );
};
