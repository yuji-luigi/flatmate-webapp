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
import { Icons } from '../../../data/icons/icons';
import AttachmentsRow from '../AttachmentsRow';
import CarouselBasic from '../../carousel/CarouselBasic';
import { UserModel } from '../../../types/models/user-model';
import useAuth from '../../../../hooks/useAuth';
import { intlDateFormat } from '../../../utils/helpers/date-formatters';
import { UploadModel } from '../../../types/models/upload-model';
import { TEXT_SIZE } from '../../text/text-size';
import Link from 'next/link';
import { PATH_CLIENT, _PATH_FRONTEND } from '../../../path/path-frontend';
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
  _id: string;
  createdBy?: UserModel;
  title: string;
  body: string;
  attachments: UploadModel[];
  images: UploadModel[];
  /** convert to date in the component */
  createdAt: string | Date;
  sx?: Sx;
}

const PostFeedCard = (props: PostFeedCardProps) => {
  const { _id, createdBy, title, body, attachments, images, createdAt, sx = {} } = props;

  const { cx, classes, theme } = useStyles();
  const { user } = useAuth();
  const description = body?.length > 500 ? body.substring(0, 497) : body;
  return (
    <Card className={classes.feedCard} sx={sx}>
      <Group sx={{ height: 40, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Group sx={{ height: '100%' }}>
          <Avatar src={createdBy?.avatar?.url} radius={90} size={40} />
          <Stack spacing={0} justify="flex-end" style={{ height: '100%', alignItems: 'flex-end' }}>
            <Text size={TEXT_SIZE.cardTile} weight="bold">
              {createdBy?.name}
            </Text>
            <Text size={TEXT_SIZE.cardTile}>{intlDateFormat(createdAt)}</Text>
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
        <Title size={TEXT_SIZE.titleCard} mb={16}>
          {title}
        </Title>
        <Text>
          {description}{' '}
          <Link href={`${PATH_CLIENT.posts}/[id]`} as={`${PATH_CLIENT.posts}/${_id}`}>
            ...Read more
          </Link>
        </Text>
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
