import { ActionIcon, Indicator } from "@mantine/core";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import useSWR from "swr";
import { Icons } from "../../../../data/icons/icons";

import { NotificationDrawer } from "./NotificationDrawer";
import axiosInstance, { AxiosResDataGeneric } from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { NotificationModel } from "../../../../types/models/notification-model";
import { useCookieContext } from "../../../../context/CookieContext";

const fetchNotifications = async () => {
  const res = await axiosInstance.get<AxiosResDataGeneric<NotificationModel[]>>(
    apiEndpoint.notifications.root
  );
  return res.data.data;
};
export const HeaderNotificationButton = () => {
  // TODO: add Notification route in Api to get formatted data. (threads, maintenances, etc. in formatted way as notifications)
  // const { crudDocuments: maintenances } = useCrudSelectors<MaintenanceModel>('maintenances');
  const { currentSpace, currentOrganization } = useCookieContext();

  const { data } = useSWR(
    () => [currentSpace, currentOrganization, apiEndpoint.notifications.root],
    fetchNotifications,
    {}
  );
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
      <Indicator color="red" offset={4} size={16} label={data?.length}>
        <ActionIcon radius={999} variant="subtle" size={32} onClick={open}>
          <Icons.bell />
        </ActionIcon>
      </Indicator>
      <NotificationDrawer notifications={data} opened={opened} close={close} />
    </>
  );
};
