import { Avatar, Card, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { PATH_DASHBOARD } from '../../../../path/page-paths';

export const NoMaintainerCard = ({ type }: { type: string }) => {
  return (
    <Card
      component={Link}
      href={`${PATH_DASHBOARD.maintainers}?type=${type}`}
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
    >
      {' '}
      <Avatar size={160} radius="md" />
      <Stack>
        <Text fw={600} size={24}>
          NO MAINTAINER IS SELECTED
        </Text>
        <Text size={16}>Click here and search {type}</Text>
      </Stack>
    </Card>
  );
};
