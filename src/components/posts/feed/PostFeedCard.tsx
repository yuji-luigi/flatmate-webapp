import { Card, Box, Title, Divider } from "@mantine/core";
import React from "react";
import AttachmentsRow from "../../files/AttachmentsRow";
import ImagesInArticle from "../../carousel/ImagesInArticle";
import useAuth from "../../../../hooks/useAuth";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import { TEXT_SIZE } from "../../text/text-size";
import { FeedDescription } from "./FeedDescription";
import classesM from "./PostFeedCard.module.css";
import { FeedHeading } from "./feed-heading/FeedHeading";
import { FeedCardProps } from "../../../types/components-types/feed/post-feed-card-type";

const PostFeedCard = (props: FeedCardProps) => {
  const { data, style = {}, ...others } = props;
  const { createdBy, title, description, attachments, images, createdAt, receipts, invoices, _id } =
    data;
  const { user } = useAuth();

  return (
    <Card className={classesM.feedCard}>
      <PostFeedCardContent {...props} />
    </Card>
  );
};

export default PostFeedCard;

export const PostFeedCardContent = (props: FeedCardProps) => {
  const { data, style = {}, ...others } = props;
  const { createdBy, title, description, attachments, images, createdAt, receipts, invoices, _id } =
    data;
  return (
    <Box className="flex-box-column">
      <FeedHeading {...data} />
      <Title size={TEXT_SIZE.titleCard}>{title}</Title>
      <FeedDescription {...others} className={classesM.description} data={data} />
      <ImagesInArticle images={images} />

      {!!attachments?.length && (
        <>
          <Divider />
          <AttachmentsRow attachments={attachments} withToolTip />
        </>
      )}
    </Box>
  );
};
