import { useEffect } from "react";
import { Table } from "@mantine/core";
import { ActionCells } from "./ActionCells";
import { TableCellDecorator } from "../TableCellDecorator";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";
import { MongooseBaseModel } from "../../../types/models/mongoose-base-model";
import { Entity } from "../../../types/redux/CrudSliceInterfaces";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

export function CrudTableRow({
  rowData,
  sectionFormFields,
}: {
  overridingEntity?: Entity;
  rowData: MongooseBaseModel;
  sectionFormFields: Array<FormFieldTypes>;
}) {
  /** use hook context */
  /** use hook router hook */
  /** use hook useCrudSlice */
  const { selectCrudDocument } = useCrudSliceStore();

  /** get runtime value of the entity */
  const {
    query: { entity },
  } = useRouterWithCustomQuery();

  useEffect(
    () => () => {
      entity && selectCrudDocument({ entity });
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
