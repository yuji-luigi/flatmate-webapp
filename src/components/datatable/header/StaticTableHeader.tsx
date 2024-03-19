import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Table } from "@mantine/core";
import formFields from "../../../../json/dataTable/formfields";
import { Sections } from "../../../types/general/data/sections-type";
import {
  BaseFormType,
  FormFieldTypes,
} from "../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "./StaticTableHeader.module.css";
import { getAlignmentDataAttribute } from "../../../utils/data-table/getAlignmentDataAttribute";
import { useLocale } from "../../../../hooks/useLocale";

const StaticTableHeader = ({ json, actions }: { json: FormFieldTypes[]; actions?: any }) => {
  const { query } = useRouter();
  const { t } = useLocale("common");

  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a?.priority || 0 - (b?.priority || 0));
  return (
    <Table.Thead>
      <Table.Tr>
        {json?.map((cellData) => {
          const dataAlign = getAlignmentDataAttribute(cellData.align);
          const _label = typeof cellData.label === "string" ? t(cellData.label) : cellData.label;
          return (
            <Fragment key={cellData.id}>
              {!cellData.noTable && (
                <Table.Th {...dataAlign} className={classes.tableCellContent}>
                  {_label}
                </Table.Th>
              )}
            </Fragment>
          );
        })}
        {actions && <Table.Th>actions</Table.Th>}
      </Table.Tr>
    </Table.Thead>
  );
};

export default StaticTableHeader;
