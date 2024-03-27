import { Box, Group, Text } from "@mantine/core";
import React from "react";
import {
  StaticOption,
  StaticSelectFormFieldType,
  TextFormType,
} from "../../../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "./Cell.module.css";
import { useLocale } from "../../../../../../hooks/useLocale";

export const StaticSelectCell = ({
  cellValue,
  cellConfig,
  rowData,
}: {
  rowData: any;
  cellValue: string;
  cellConfig: StaticSelectFormFieldType;
}) => {
  // console.log(cellValue);
  // return cellValue;
  const { t } = useLocale("common");

  const Icon = cellConfig.options?.find((option: StaticOption) => option.value === cellValue)?.icon;
  const dataHidden = !!(cellConfig.type === "static-select" && Icon);
  const text = cellConfig.options?.find(
    (option: StaticOption) => option.value === cellValue
  )?.label;
  return (
    <Box className={classes.staticSelectBox}>
      {Icon && <Icon className={classes.icon} />}
      <Text className={classes.text} data-hidden={dataHidden}>
        {t(text || "")}
      </Text>
    </Box>
  );
};
