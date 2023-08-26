import {
  Card,
  Group,
  Avatar,
  Stack,
  Box,
  Title,
  Divider,
  Text,
  createStyles,
  em,
  Sx,
  ActionIcon,
} from '@mantine/core';
import React from 'react';
import { Icons } from '../../../data/icons';
import AttachmentsRow from '../AttachmentsRow';
import CarouselBasic from '../../carousel/CarouselBasic';
import { UserModel } from '../../../types/models/user-model';
import useAuth from '../../../../hooks/useAuth';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';
import { UploadModel } from '../../../types/models/upload-model';
const useStyles = createStyles((theme) => ({
  feedCard: {
    minHeight: 200,
  },
  feedContent: {
    padding: 16,
    paddingInline: 24,
  },
}));

interface PostFeedCardProps {
  createdBy?: UserModel;
  title: string;
  body: string;
  attachments: UploadModel[];
  images: UploadModel[];
  /** convert to date in the component */
  createdAt: string | Date;
  sx?: Sx;
}

const PostFeedCard = ({
  createdBy,
  title,
  body,
  attachments,
  images,
  createdAt,
  sx = {},
}: PostFeedCardProps) => {
  const { cx, classes, theme } = useStyles();
  const { user } = useAuth();

  return (
    <Card className={classes.feedCard} sx={sx}>
      <Group sx={{ height: 80, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Group sx={{ height: '100%' }}>
          <Avatar
            src={createdBy?.avatar?.url || 'https://picsum.photos/410/300'}
            radius={90}
            size={80}
          />
          <Stack spacing={0} justify="flex-end" style={{ height: '100%', alignItems: 'flex-end' }}>
            <Text size="lg" weight="bold">
              {createdBy?.name}
            </Text>
            <Text>{intlDateFormat(createdAt)}</Text>
          </Stack>
        </Group>

        {user?._id === createdBy?._id && (
          <Box sx={{ alignSelf: 'start' }}>
            <ActionIcon onClick={() => window.alert('edit fired: PostFeedCard.tsx')}>
              <Icons.dots />
            </ActionIcon>
          </Box>
        )}
      </Group>

      <Box className={classes.feedContent}>
        <Title mb={16}>{title}</Title>
        <Text>{body}</Text>
      </Box>
      <CarouselBasic images={images} />
      {!!attachments.length && (
        <>
          <Divider mb={16} />
          <AttachmentsRow attachments={attachments} />
        </>
      )}
    </Card>
  );
};

export default PostFeedCard;
