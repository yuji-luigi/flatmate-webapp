import { Box, Group, Avatar, Text } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PATH_IMAGE } from '../../../lib/image-paths';
import classes from './NotificationList.module.css';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';
import { _PATH_FRONTEND } from '../../../path/path-frontend';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { CATEGORIES } from './categories';
import { ThreadModel } from '../../../types/models/thread-model';

export type MaintenanceNotification = (MaintenanceModel | ThreadModel) & {
  category: typeof CATEGORIES.maintenances;
  entity: 'maintenances';
};
type MaintenanceNorificationListProps = {
  data: MaintenanceNotification;
  closeDrawer: () => void;
};

export const MaintenanceNotificationList = (props: MaintenanceNorificationListProps) => {
  const { data, closeDrawer } = props;
  const { title, description = '', createdBy, createdAt, category, entity, _id } = data;

  const _description =
    description.length > 55 ? `${description?.substring(0, 55)}...` : description;
  return (
    <Box
      component={Link}
      href={_PATH_FRONTEND[entity].byId(_id)}
      onClick={closeDrawer}
      className={classes.cardContent}
    >
      <div className={classes.body}>
        <Text size="xs" c="dimmed">
          {category}
        </Text>
        <Group>
          <Text tt="uppercase" c="dimmed" fw={700} size="xs">
            {title}
          </Text>
        </Group>
        <Text className={classes.title} mt="xs" mb="md">
          {_description}
        </Text>
        <Group gap={1}>
          <Group gap={2}>
            <Avatar size={20} src={createdBy.avatar?.url} />
            <Text size="xs">
              {createdBy.name} {createdBy.surname}
            </Text>
          </Group>
          <Text size="xs" c="dimmed">
            •
          </Text>
          <Text size="xs" c="dimmed">
            {intlDateFormat(createdAt)}
          </Text>
        </Group>
      </div>
    </Box>
  );
};
