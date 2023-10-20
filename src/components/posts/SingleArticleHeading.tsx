import { Stack, Group, Text, Avatar } from '@mantine/core';
import React from 'react';
import { MaintenanceModel } from '../../types/models/maintenance-model';
import { intlDateFormat } from '../../utils/helpers/date-formatters';
import { ThreadModel } from '../../types/models/thread-model';
import classes from './SingleArticleHeading.module.css';

export const SingleArticleHeading = ({ data }: { data: MaintenanceModel | ThreadModel }) => {
  return (
    <Stack className={classes.header}>
      <Group align="center">
        <Avatar src={data.createdBy.avatar?.url} size={50} radius="xl" mr={0} />
        <Text fz="sm" inline>
          {data.createdBy.name}
        </Text>
        <Text fz="sm" inline>
          {intlDateFormat(data.createdAt)}
        </Text>
      </Group>
      <Text className={classes.title} fw={800} component="a">
        {data.title}
      </Text>
    </Stack>
  );
};
