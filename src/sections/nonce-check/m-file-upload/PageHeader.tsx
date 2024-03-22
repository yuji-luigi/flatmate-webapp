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
import { Main } from "next/document";
import { UploadModel } from "../../../types/models/upload-model";
import classes from "./ProfileCoverGeneric.module.css";
import { useLocale } from "../../../../hooks/useLocale";
import { MaintenanceModel } from "../../../types/models/maintenance-check-type";
import { intlDateFormat, intlFormatDateTime } from "../../../utils/helpers/date-formatters";
import { SpaceModel } from "../../../types/models/space-model";

export interface CoverDataProp {
  // _id?: string;
  space: SpaceModel;
  maintenance: MaintenanceModel;
}

export const PageHeader = (props: CoverDataProp) => {
  const { colorScheme } = useMantineColorScheme();
  const { t } = useLocale();
  const { maintenance, space } = props;

  return (
    <Box className="maintenance-single-page-header">
      <div>
        <Text className="full" fw={700} size="xl">
          {t("Maintenance to do")}
        </Text>
        <Text fw={700} size="lg">
          {t("at")} {space.name} - {space.address}
        </Text>
        <Text fw={700} size="xl"></Text>
      </div>
      <div className="contacts">
        <div className="contact">
          <Text size="md">{t("contact")}</Text>
          <Text size="md">
            {maintenance.createdBy.name} {maintenance.createdBy.surname}:{" "}
          </Text>
          <div className="page-header-info">
            <a href={`mailto:${maintenance.createdBy.email}`}>{maintenance.createdBy.email}</a>
            <a href={`tel:${maintenance.createdBy.phone}`}>
              {maintenance.createdBy.phone}3458897777
            </a>
            more
          </div>
        </div>
      </div>
    </Box>
  );
};
