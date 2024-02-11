import { Group, Avatar, Stack, ActionIcon, Text, Box } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Icons } from '../../../../data/icons/icons';
import { _PATH_FRONTEND } from '../../../../path/path-frontend';
import { intlDateFormat } from '../../../../utils/helpers/date-formatters';
import { TEXT_SIZE } from '../../../text/text-size';
import useAuth from '../../../../../hooks/useAuth';
import { FeedCardData } from '../../../../types/components-types/feed/post-feed-card-type';
import classes from './FeedHeading.module.css';

export const FeedHeading = (props: FeedCardData) => {
  const { createdBy, createdAt, _id, receipts, className = '', invoices } = props;
  const { user } = useAuth();
  const hasChecks = !!receipts?.length || !!invoices?.length;
  return (
    <Group className={`${classes.container} ${className}`}>
      <Group>
        <Avatar
          src={createdBy?.avatar?.url || 'https://picsum.photos/410/300'}
          radius={90}
          size={40}
        />
        <Box className={classes.headerInfo}>
          <Text className={classes.name}>{createdBy?.name}</Text>
          <Text fz={TEXT_SIZE.cardTile}>
            {intlDateFormat(createdAt)}
            <span className={classes.timeAgo}>
              ({`${formatDistanceToNow(new Date(createdAt))} ago)`})
            </span>
          </Text>
        </Box>
      </Group>
      <Group>
        {hasChecks && (
          <ActionIcon
            // color="primary"
            component={Link}
            href={_PATH_FRONTEND.maintenances.checksPage(_id)}
          >
            <Icons.receipt />
          </ActionIcon>
        )}
        {user?._id === createdBy?._id && (
          <ActionIcon onClick={() => window.alert('edit fired: PostFeedCard.style')}>
            <Icons.dots />
          </ActionIcon>
        )}
      </Group>
    </Group>
  );
};
