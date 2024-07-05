import { Container, Stack, Title, Text } from "@mantine/core";
import { t } from "i18next";
import React, { ReactNode, useEffect } from "react";
import { PATH_IMAGE } from "../../lib/image-paths";
/** useRouter. app router and page router uses different useRouter */
type RouterPerDirVersion = any;
export const NotificationPageView = ({
  imageUrl,
  imageContribution,
  title,
  description,
  imgHeight = 300,
  imgWidth = 400,
  CTA,
  redirectOption,
}: {
  imageUrl?: string;
  imageContribution?: ReactNode;
  title: ReactNode;
  description: string;
  imgHeight?: number;
  imgWidth?: number;
  CTA?: ReactNode;
  redirectOption?: {
    sec: number;
    redirectPath: string;
    router: RouterPerDirVersion;
  };
}) => {
  useEffect(() => {
    if (redirectOption) {
      setTimeout(() => {
        redirectOption.router.push(redirectOption.redirectPath);
      }, redirectOption.sec * 1000);
    }
  }, []);
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
