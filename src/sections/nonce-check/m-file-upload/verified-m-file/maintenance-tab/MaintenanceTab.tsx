import React from "react";
import { Box, Divider, Text, Title } from "@mantine/core";
import Image from "next/image";
import { MaintenanceModel } from "../../../../../types/models/maintenance-check-type";
import { FeedDescription } from "../../../../../components/posts/feed/FeedDescription";
import ImagesInArticle from "../../../../../components/carousel/ImagesInArticle";
import AttachmentsRow from "../../../../../components/files/AttachmentsRow";
import { TEXT_SIZE } from "../../../../../components/text/text-size";

export const MaintenanceTab = (props: { maintenance: MaintenanceModel }) => {
  const { maintenance } = props;
  const { title, description, attachments, images, createdAt, createdBy, space, ...others } =
    maintenance;
  return (
    <Box className="flex-box-column">
      <Title size={TEXT_SIZE.titleCard}>{title}</Title>
      <Box>
        <Text>{description}</Text>
      </Box>
      <div>
        {images.map((image, i) => (
          <Image
            key={image._id}
            src={image.url}
            width={300}
            height={300}
            alt={image.originalFileName}
          />
        ))}
      </div>

      {!!attachments?.length && (
        <>
          <Divider />
          <AttachmentsRow attachments={attachments} withToolTip />
        </>
      )}
    </Box>
  );
};
