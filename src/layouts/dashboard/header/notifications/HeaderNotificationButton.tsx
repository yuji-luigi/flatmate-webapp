import { ActionIcon, Indicator } from '@mantine/core';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import useSWR from 'swr';
import { Icons } from '../../../../data/icons/icons';

import { NotificationDrawer } from './NotificationDrawer';
import axiosInstance, { AxiosResDataGeneric } from '../../../../utils/axios-instance';
import { _PATH_API } from '../../../../path/path-api';
import { NotificationModel } from '../../../../types/models/notification-model';

const fetchNotifications = async () => {
  const res = await axiosInstance.get<AxiosResDataGeneric<NotificationModel[]>>(
    _PATH_API.notifications.root
  );
  return res.data.data;
};
export const HeaderNotificationButton = () => {
  // todo: add Notification route in Api to get formatted data. (threads, maintenances, etc. in formatted way as notifications)
  // const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');
  const { data } = useSWR(() => _PATH_API.notifications.root, fetchNotifications, {});
  // const notifications = useMemo(() => {
  //   return maintenances.map((maintenance) => ({
  //     ...maintenance,
  //     entity: 'maintenances',
  //     category: CATEGORIES.maintenances,
  //   }));
  // }, [maintenances]);

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="subtle" onClick={open}>
        <Indicator color="red" size={16} label={data?.length}>
          <Icons.bell />
        </Indicator>
      </ActionIcon>
      <NotificationDrawer notifications={data} opened={opened} close={close} />
    </>
  );
};
