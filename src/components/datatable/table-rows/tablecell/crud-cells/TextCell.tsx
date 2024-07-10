import { Box, Group, Text } from "@mantine/core";
import React from "react";
import {
  StaticOption,
  StaticSelectFormFieldType,
  TextFormType,
} from "../../../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "./Cell.module.css";
import { useLocale } from "../../../../../../hooks/useLocale";

export const TextCell = ({
  cellValue,
  cellConfig,
  rowData,
}: {
  rowData: any;
  cellValue: string;
  cellConfig: TextFormType | StaticSelectFormFieldType;
}) => {
  // console.log(cellValue);
  // return cellValue;
  return (
    <Text className={classes.text} size="sm">
      {cellValue}
    </Text>
  );
};
