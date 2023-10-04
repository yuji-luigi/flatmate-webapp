import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { Accordion, Text } from '@mantine/core';
import { ActionCells } from './ActionCells';
// import { useCrudSlice } from '../../../../hooks/redux-hooks/useCrudSlice';
import { TableCellDecorator } from '../TableCellDecorator';
import { useDrawerContext } from '../../../context/DataTableDrawerContext';
import { usePaginationContext } from '../../../context/PaginationContext';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { Sections } from '../../../types/general/data/sections-type';
import { FormFieldTypes } from '../../../types/general/data/data-table/formField-types';
import { AllModels } from '../../../types/models/allmodels';
import classes from './StaticTableHeader.module.css';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';

export function StaticTableRow({
  rowData,
  sectionFormFields,
  overridingEntity,
  actions,
}: {
  actions?: any;
  overridingEntity?: Sections;
  rowData: AllModels;
  sectionFormFields: Array<FormFieldTypes>;
}) {
  /** use hook context */
  /** use hook router hook */
  const { query } = useRouter();
  /** use hook useCrudSlice */
  const { isMobile } = useCustomMQuery();
  /** get runtime value of the entity */
  const entity = overridingEntity || (query.entity as Sections);

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
    <tr>
      {/*
          Regular cells defined here
      */}
      {sectionFormFields.map((cellConfig) =>
        cellConfig.noTable ? null : (
          <td key={cellConfig.id} className={classes.tableCellContent}>
            <TableCellDecorator cellConfig={cellConfig} rowData={rowData} />
          </td>
        )
      )}
      {/*
          Action cells defined here(modify, delete button)
      */}
      {actions && <ActionCells rowData={rowData} overridingEntity={entity} />}
    </tr>
  );
}
