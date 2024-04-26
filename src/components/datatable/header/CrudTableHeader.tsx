import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Table } from "@mantine/core";
import formFields from "../../../json/dataTable/formfields";
import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "./StaticTableHeader.module.css";
import { Entity } from "../../../types/redux/CrudSliceInterfaces";
import { useLocale } from "../../../../hooks/useLocale";

const CrudTableHeader = ({ overridingEntity }: { overridingEntity?: Entity }) => {
  const { query } = useRouter();
  const { t } = useLocale();
  const json = formFields[overridingEntity || (query.entity as Entity)];
  json?.sort((a: FormFieldTypes, b: FormFieldTypes) => a.priority || 0 - (b.priority || 0));
  return (
    <Table.Thead>
      <Table.Tr>
        {json?.map((cellData: FormFieldTypes) => {
          const cellStyle = cellData.cellConfig?.style || {};
          return (
            <Fragment key={cellData.id}>
              {!cellData.noTable && (
                <Table.Th style={cellStyle} className={classes.tableCellContent}>
                  {t(cellData.label)}
                </Table.Th>
              )}
            </Fragment>
          );
        })}
        <th>actions</th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default CrudTableHeader;
