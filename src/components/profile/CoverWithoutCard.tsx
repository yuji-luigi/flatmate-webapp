import React from "react";
import {
  Card,
  Avatar,
  Text,
  Box,
  Group,
  MantineStyleProp,
  useMantineColorScheme,
} from "@mantine/core";
import { UploadModel } from "../../types/models/upload-model";
import classes from "./ProfileCoverGeneric.module.css";
import { useLocale } from "../../../hooks/useLocale";

export interface CoverDataProp {
  // _id?: string;
  title?: string;
  name?: string;
  description?: string;
  // subtitle?: string;
  avatar?: UploadModel;
  disableAvatar?: boolean;
  cover?: UploadModel;
  // backgroundImage?: string;
  style?: MantineStyleProp;
}

export const PageHeader = (props: CoverDataProp) => {
  const { colorScheme } = useMantineColorScheme();
  const { t } = useLocale();
  const { avatar, style, cover, name, description, disableAvatar, title } = props;

  return (
    <Box className="">
      <Text fw={700} size="xl">
        {title}
      </Text>
      <Text fw={700} size="xl">
        {name}
      </Text>
      <Text size="md">{description}</Text>
    </Box>
  );
};
