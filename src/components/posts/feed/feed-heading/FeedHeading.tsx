import { Group, Avatar, Stack, ActionIcon, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { Icons } from '../../../../data/icons/icons';
import { _PATH_FRONTEND } from '../../../../path/path-frontend';
import { intlDateFormat } from '../../../../utils/helpers/date-formatters';
import { TEXT_SIZE } from '../../../text/text-size';
import { UserModel } from '../../../../types/models/user-model';
import useAuth from '../../../../../hooks/useAuth';
import { FeedCardData } from '../../../../types/components-types/feed/post-feed-card-type';
import classes from './FeedHeading.module.css';

export const FeedHeading = (props: FeedCardData) => {
  const { createdBy, createdAt, _id, receipts } = props;
  const { user } = useAuth();

  return (
    <Group className={classes.container}>
      <Group sx={{ height: '100%' }}>
        <Avatar
          src={createdBy?.avatar?.url || 'https://picsum.photos/410/300'}
          radius={90}
          size={40}
        />
        <Stack spacing={0} justify="flex-end" style={{ height: '100%', alignItems: 'flex-end' }}>
          <Text size={TEXT_SIZE.cardTile} weight="bold">
            {createdBy?.name}
          </Text>
          <Text size={TEXT_SIZE.cardTile}>{intlDateFormat(createdAt)}</Text>
        </Stack>
      </Group>
      <Stack>
        <Group>
          {user?._id === createdBy?._id && (
            <ActionIcon onClick={() => window.alert('edit fired: PostFeedCard.tsx')}>
              <Icons.dots />
            </ActionIcon>
          )}
          {receipts?.length && (
            <ActionIcon
              color="primary"
              component={Link}
              href={_PATH_FRONTEND.maintenances.checksPage(_id)}
            >
              <Icons.receipt />
            </ActionIcon>
          )}
        </Group>
      </Stack>
    </Group>
  );
};