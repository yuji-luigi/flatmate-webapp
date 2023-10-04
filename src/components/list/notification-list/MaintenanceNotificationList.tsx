import { Box, Group, Avatar, Text } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import { PATH_IMAGE } from '../../../lib/image-paths';
import classes from './NotificationList.module.css';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';

export const MaintenanceNotificationList = (props: any) => {
  const { data } = props;
  const { title, description, createdBy, createdAt, category } = data;
  return (
    <Box className={classes.cardContent}>
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
          {description?.substring(0, 55)}
        </Text>
        <Group spacing={1}>
          <Group spacing={2}>
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
