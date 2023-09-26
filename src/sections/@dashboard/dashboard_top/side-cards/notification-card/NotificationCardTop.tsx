import React, { memo } from 'react';
import { Stack } from '@mantine/core';
import TextWithIcon from '../../../../../components/text/TextWithIcon';
import { dashboardStyle } from '../../../../../styles/global-useStyles';
import CardWithTitle from '../../../../../components/profile/side/CardWithTitle';
import { SimpleLinkTile } from '../../../../../components/list/SimpleLinkTile';

const data = [
  {
    _id: '1',
    title: 'Notification 1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    _id: '2',
    title: 'Notification 2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    _id: '3',
    title: 'Notification 3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
  },
  {
    _id: '4',
    title: 'Notification 4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    _id: '5',
    title: 'Notification 5',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
  },
];

export const NotificationCardTop = () => {
  return (
    <CardWithTitle indicator="9" title="Notifications">
      {data.map((d) => (
        <SimpleLinkTile
          _id={d._id}
          key={d._id}
          title={d.title}
          href={`/dashboard/notifications/${d._id}`}
          createdAt={d.createdAt}
        />
      ))}
    </CardWithTitle>
  );
};
