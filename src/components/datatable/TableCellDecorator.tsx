import React, { Fragment } from 'react';
import BadgeCell from './table-rows/tablecell/crud-cells/BadgeCell';
// import BadgeCell from './table-rows/tablecell/BadgeCell';
import TableCellController from './table-rows/tablecell/TableCellController';
import { FormFieldTypes } from '../../types/general/data/data-table/formField-types';

function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value) && typeof value !== 'string';
}

export function TableCellDecorator({
  rowData,
  cellConfig,
}: {
  rowData: UsersTableRow;
  cellConfig: FormFieldTypes;
}) {
  /**
   * cellData can be an array of objects or a single object or a string.
   */
  const cellData = rowData[cellConfig.name];

  let badgeCell = (
    <BadgeCell
      key={cellConfig.id}
      cellConfig={cellConfig}
      color={''}
      rowData={rowData}
      cellData={''}
    />
  );

  let tableCell =
    typeof cellData === 'string' ? (
      <TableCellController cellData={cellData} cellConfig={cellConfig} rowData={rowData} />
    ) : cellConfig.type === 'select' &&
      cellConfig.multi &&
      cellConfig.cellType !== 'link-children' &&
      !Array.isArray(cellData) ? (
      // ) : typeof cellData === 'object' && !Array.isArray(cellData) ? (
      <TableCellController
        key={cellData._id}
        cellData={
          cellConfig.selectValues
            ?.map((key: string) => cellData[key])
            // .concat('')
            .join('-') || ''
        }
        cellConfig={cellConfig}
        rowData={rowData}
      />
    ) : null;

  /**
   * if the cellData is an array, then we need to render multiple cells.
   */
  if (
    Array.isArray(cellData) &&
    cellConfig.type === 'select' &&
    cellConfig.cellType !== 'link-children'
  ) {
    tableCell = (
      <>
        {cellData.map((cellData) => {
          const key = typeof cellData === 'string' ? cellData : cellData._id;
          return (
            <TableCellController
              key={key}
              cellData={
                cellConfig.selectValues
                  ?.map((key: string) => cellData[key])
                  // .concat('')
                  .join('-') || ''
              }
              cellConfig={cellConfig}
              rowData={rowData}
            />
          );
        })}
      </>
    );
    badgeCell = (
      <Fragment key={cellConfig.id}>
        {cellData.map((cellData) => {
          console.log(cellData._id);
          return (
            <BadgeCell
              key={cellData?._id || cellData}
              cellConfig={cellConfig}
              color={cellData.color as string}
              rowData={rowData}
              cellData={
                cellConfig.selectValues
                  ?.map((key: string) => cellData[key])
                  // .concat('')
                  .join('-') || ''
              }
            />
          );
        })}
      </Fragment>
    );
  }

  // decorate the TableCellController component before render.
  // EX put style: Array<string> then decorate the cell based on the style.
  if (cellConfig.noTable) return null;

  // if (cellConfig.badge) {
  //   return badgeCell;
  // }

  return tableCell;
}
