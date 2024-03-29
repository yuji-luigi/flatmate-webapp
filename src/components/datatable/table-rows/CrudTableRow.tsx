import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Table } from "@mantine/core";
import { ActionCells } from "./ActionCells";
// import { useCrudSlice } from '../../../../hooks/redux-hooks/useCrudSlice';
import { TableCellDecorator } from "../TableCellDecorator";
import { useDrawerContext } from "../../../context/DataTableDrawerContext";
import { usePaginationContext } from "../../../context/PaginationContext";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { Sections } from "../../../types/general/data/sections-type";
import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";
import { useCurrentEntityContext } from "../../../context/CurrentEntityContext";
import { MongooseBaseModel } from "../../../types/models/mongoose-base-model";

export function CrudTableRow({
  rowData,
  sectionFormFields,
  overridingEntity,
}: {
  overridingEntity?: Sections;
  rowData: MongooseBaseModel;
  sectionFormFields: Array<FormFieldTypes>;
}) {
  /** use hook context */
  /** use hook router hook */
  /** use hook useCrudSlice */
  const { selectCrudDocument } = useCrudSliceStore();

  /** get runtime value of the entity */
  const { currentEntity: entity } = useCurrentEntityContext();

  useEffect(
    () => () => {
      selectCrudDocument({ entity, document: null });
    },
    []
  );
  return (
    <Table.Tr key={rowData._id}>
      {/*
          Regular cells defined here
      */}
      {sectionFormFields.map((cellConfig) =>
        cellConfig.noTable ? null : (
          <Table.Td key={cellConfig.id}>
            <TableCellDecorator cellConfig={cellConfig} rowData={rowData} />
          </Table.Td>
        )
      )}
      {/*
          Action cells defined here(modify, delete button)
      */}
      <ActionCells rowData={rowData} overridingEntity={entity} />
    </Table.Tr>
  );
}
