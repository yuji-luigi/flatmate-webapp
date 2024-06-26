import React from "react";

import { useRouter } from "next/router";
import { Table } from "@mantine/core";
import { ActionCells } from "./action-cell/ActionCells";
// import { useCrudSlice } from '../../../../hooks/redux-hooks/useCrudSlice';
import { TableCellDecorator } from "../TableCellDecorator";
import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";
import classes from "../header/StaticTableHeader.module.css";
import { useCustomMQuery } from "../../../../hooks/useCustomMQuery";
import { AllModels } from "../../../types/models/allmodels";
import { Entity } from "../../../types/redux/CrudSliceInterfaces";
import { MongooseBaseModel } from "../../../types/models/mongoose-base-model";

export function StaticTableRow({
  rowData,
  sectionFormFields,
  overridingEntity,
  actions,
}: {
  actions?: any;
  overridingEntity?: Entity;
  rowData: MongooseBaseModel;
  sectionFormFields: Array<FormFieldTypes>;
}) {
  /** use hook context */
  /** use hook router hook */
  const { query } = useRouter();
  /** use hook useCrudSlice */
  const { isMobile } = useCustomMQuery();
  /** get runtime value of the entity */
  const entity = overridingEntity || (query.entity as Entity);

  // if (isMobile) {
  //   return (
  //     <tr>
  //       {sectionFormFields.map((cellConfig) =>
  //         cellConfig.noTable ? null : (
  //           <>
  //             <td>
  //               <Accordion key={cellConfig.id}>
  //                 <Accordion.Item value={rowData._id} key={rowData.name}>
  //                   <Accordion.Control>{rowData.title}</Accordion.Control>
  //                   <Accordion.Panel>
  //                     <Text size="sm">{rowData.title}</Text>
  //                   </Accordion.Panel>
  //                 </Accordion.Item>
  //               </Accordion>
  //             </td>
  //           </>
  //         )
  //       )}
  //       {/*
  //       Action cells defined here(modify, delete button)
  //   */}
  //       {actions && <ActionCells rowData={rowData} overridingEntity={entity} />}
  //     </tr>
  //   );
  // }

  return (
    <Table.Tr>
      {/*
          Regular cells defined here
      */}
      {sectionFormFields.map((cellConfig) =>
        cellConfig.noTable ? null : (
          <Table.Td key={cellConfig.id} className={classes.tableCellContent}>
            <TableCellDecorator cellConfig={cellConfig} rowData={rowData} />
          </Table.Td>
        )
      )}
      {/*
          Action cells defined here(modify, delete button)
      */}
      {actions && <ActionCells rowData={rowData} overridingEntity={entity} />}
    </Table.Tr>
  );
}
