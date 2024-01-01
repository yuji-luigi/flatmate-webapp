import { Card, Box, Title, Divider } from '@mantine/core';
import React from 'react';
import AttachmentsRow from '../../files/AttachmentsRow';
import ImagesInArticle from '../../carousel/ImagesInArticle';
import useAuth from '../../../../hooks/useAuth';
import { _PATH_FRONTEND } from '../../../path/path-frontend';
import { TEXT_SIZE } from '../../text/text-size';
import { FeedDescription } from './FeedDescription';
import classesM from './PostFeedCard.module.css';
import { FeedHeading } from './feed-heading/FeedHeading';
import { FeedCardProps } from '../../../types/components-types/feed/post-feed-card-type';

const PostFeedCard = ({ data, style = {}, ...others }: FeedCardProps) => {
  const { createdBy, title, description, attachments, images, createdAt, receipts, invoices, _id } =
    data;
  const { user } = useAuth();

  return (
    <Card className={classesM.feedCard}>
      <FeedHeading {...data} />
      <Box>
        <Title size={TEXT_SIZE.titleCard} mb={16}>
          {title}
        </Title>
        {/* <Text>{description}</Text> */}
        <FeedDescription {...others} className={classesM.description} data={data} />
      </Box>
      <ImagesInArticle images={images} />

      {!!attachments?.length && (
        <>
          <Divider mb={16} />
          <AttachmentsRow attachments={attachments} withToolTip />
        </>
      )}
    </Card>
  );
};

export default PostFeedCard;
