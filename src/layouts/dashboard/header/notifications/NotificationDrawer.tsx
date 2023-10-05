import { Drawer, Divider } from '@mantine/core';
import React, { Fragment } from 'react';
import { NotificationListRoot } from '../../../../components/list/notification-list/NotificationListRoot';
import classes from './HeaderNotificationButton.module.css';

type NotificationDrawerProps = {
  opened: boolean;
  close: () => void;
  notifications: any[];
};

export const NotificationDrawer = (props: NotificationDrawerProps) => {
  const { opened, close, notifications } = props;
  return (
    <Drawer
      position="right"
      size="xs"
      opened={opened}
      onClose={close}
      title="Notifications"
      classNames={{
        body: classes.drawerBody,
      }}
    >
      {notifications.map((data) => (
        <Fragment key={data._id}>
          <NotificationListRoot data={data} closeDrawer={close} />
          <Divider variant="dotted" size={2} />
        </Fragment>
      ))}
    </Drawer>
  );
};
