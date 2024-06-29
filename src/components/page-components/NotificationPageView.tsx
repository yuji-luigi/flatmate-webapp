import { Container, Stack, Title, Text } from "@mantine/core";
import { t } from "i18next";
import React, { ReactNode } from "react";
import { PATH_IMAGE } from "../../lib/image-paths";

export const NotificationPageView = ({
  imageUrl,
  imageContribution,
  title,
  description,
  imgHeight = 300,
  imgWidth = 400,
  CTA,
}: {
  imageUrl?: string;
  imageContribution?: ReactNode;
  title: ReactNode;
  description: string;
  imgHeight?: number;
  imgWidth?: number;
  CTA?: ReactNode;
}) => {
  return (
    <Stack justify="center" align="center" style={{ height: "100%" }}>
      <Title ta="center">{title}</Title>
      {imageUrl && (
        <Stack justify="center" gap={0}>
          <img
            src={imageUrl}
            alt=""
            height={imgHeight}
            width={imgWidth}
            style={{ objectFit: "contain" }}
          />
          {imageContribution && imageContribution}
        </Stack>
      )}
      <Text ta="center">{description}</Text>
      {CTA && CTA}
    </Stack>
  );
};
