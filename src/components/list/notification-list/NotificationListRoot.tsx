import { Avatar, Box, Card, Group, Text } from '@mantine/core';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import classes from './NotificationList.module.css';
import { IMAGES_ARRAY, PATH_IMAGE } from '../../../lib/image-paths';
import { MaintenanceNotificationList } from './MaintenanceNotificationList';

export const CATEGORIES = {
  maintenances: 'Maintenance',
  threads: 'Post',
  other: 'Other',
} as const;

type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

type NotificationListProps = {
  data: {
    category: Category;
  };
};

export const NotificationListRoot = (props: NotificationListProps) => {
  const { category } = props.data;

  const lists: Record<Category, ((props: NotificationListProps) => JSX.Element) | null> = {
    Maintenance: MaintenanceNotificationList,
    Post: null,
    Other: null,
  };
  const List = lists[category] || '';
  return List ? <List {...props} /> : null;
  return (
    <Box className={classes.cardContent}>
      <Image src={PATH_IMAGE.flatmateLogo1} height={60} width={60} alt="avatar" />
      <div className={classes.body}>
        <Text tt="uppercase" c="dimmed" fw={700} size="xs">
          technology
        </Text>
        <Text className={classes.title} mt="xs" mb="md">
          The best laptop for Frontend engineers in 2022
        </Text>
        <Group spacing={1}>
          <Group spacing={2}>
            <Avatar
              size={20}
              src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
            />
            <Text size="xs">Elsa Typechecker</Text>
          </Group>
          <Text size="xs" c="dimmed">
            •
          </Text>
          <Text size="xs" c="dimmed">
            Feb 6th
          </Text>
        </Group>
      </div>
    </Box>
  );
};
