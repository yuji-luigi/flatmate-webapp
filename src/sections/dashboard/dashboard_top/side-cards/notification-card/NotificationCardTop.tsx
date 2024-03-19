import React from "react";
import { Button, Skeleton } from "@mantine/core";
import useSWR from "swr";
import { useTranslation } from "next-i18next";
import { useDisclosure } from "@mantine/hooks";
import CardWithTitle from "../../../../../components/profile/side/CardWithTitle";
import { SimpleLinkTile } from "../../../../../components/list/SimpleLinkTile";
import { useCustomMQuery } from "../../../../../../hooks/useCustomMQuery";
import { Icons } from "../../../../../data/icons/icons";
import { _PATH_API } from "../../../../../path/path-api";
import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
import { NotificationModel } from "../../../../../types/models/notification-model";
import { NotificationDrawer } from "../../../../../layouts/dashboard/header/notifications/NotificationDrawer";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";

const fetchNotifications = async () => {
  const res = await axiosInstance.get<AxiosResDataGeneric<NotificationModel[]>>(
    _PATH_API.notifications.root
  );
  return res.data.data;
};
const MAX_NOTIFICATIONS = 6;
export const NotificationCardTop = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { isMobile } = useCustomMQuery();
  const title = !isMobile ? "Notifications" : <Icons.alert />;
  const { data } = useSWR(() => _PATH_API.notifications.root, fetchNotifications, {});
  const { t } = useTranslation("common");

  return (
    <>
      <CardWithTitle indicator={data?.length} title={title}>
        {data
          ?.slice(0, MAX_NOTIFICATIONS)
          .map((d) => (
            <SimpleLinkTile
              _id={d._id}
              key={d._id}
              title={d.title}
              href={_PATH_FRONTEND[d.entity].byId(d._id)}
              createdAt={d.createdAt}
            />
          )) || <Skeleton height={100} />}
        {data?.length && data.length > MAX_NOTIFICATIONS && (
          <Button onClick={open} mt={16} variant="outline" color="orange">
            {t("Show All")}
          </Button>
        )}
      </CardWithTitle>
      <NotificationDrawer notifications={data} opened={opened} close={close} />
    </>
  );
};
