import { Group, Text } from "@mantine/core";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Icons } from "../../../../../data/icons/icons";
import { intlDateFormat } from "../../../../../utils/helpers/date-formatters";
import { useLocale } from "../../../../../../hooks/useLocale";

export const DateCell = ({ cellValue }: { cellValue: string }) => {
  return <>{intlDateFormat(cellValue, "it-IT")}</>;
};
