import React, { Fragment } from 'react';
// import BadgeCell from './table-rows/tablecell/BadgeCell';
import TableCellController from './table-rows/tablecell/crud-cells/TableCellController';
import { FormFieldTypes } from '../../types/general/data/data-table/formField-types';
import BadgeCellDecorator from './table-rows/tablecell/crud-cells/BadgeCellDecorator';

function isObject(value: any): boolean {
  return value && typeof value === 'object' && !Array.isArray(value) && typeof value !== 'string';
}

//! todo: refactor this component to be more readable and rational.

export function TableCellDecorator({
  rowData,
  cellConfig,
}: {
  rowData: UsersTableRow;
  cellConfig: FormFieldTypes;
}) {
  /** get value of the cell (from object/array/primitive) */
  const cellValue = getCellValue({ rowData, cellConfig });

  let tableCell = (
    <TableCellController cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />
  );

  if (cellConfig.noTable) return null;

  if (cellConfig.badge) {
    return <BadgeCellDecorator cellConfig={cellConfig}>{tableCell}</BadgeCellDecorator>;
  }

  return tableCell;
}

type ValueFunction = () => string;
type ValueOrFunction = string | ValueFunction;
const isFunction = (value: ValueOrFunction): value is ValueFunction => typeof value === 'function';

function getCellValue({ rowData, cellConfig }: { rowData: any; cellConfig: FormFieldTypes }) {
  // console.log(rowData[cellConfig.name]);

  // LIST OUT CASES.
  // 1. VALUE IS OBJECT AND NOT ARRAY
  // 2. VALUE IS ARRAY OF OBJECTS
  // 3. VALUE IS ARRAY OF PRIMITIVES
  // 4. VALUE IS PRIMITIVE
  // 5. VALUE IS NULL OR UNDEFINED
  // 6. VALUE IS BOOLEAN
  // 7. VALUE IS DATE
  // case primitive toString and return
  const value = rowData[cellConfig.name] ?? ''; // check for null or undefined
  const valueType = typeof value;

  const valueObject: Record<typeof value, string | ValueOrFunction> = {
    string: () => value.toString(),
    number: () => value.toString(),
    boolean: () => value.toString(),
    object: () => handleObjectType({ value, cellConfig }),
  };

  const returnValue = valueObject[valueType];
  // console.log(returnValue);
  // console.log(cellConfig.name);
  // console.log('\n');
  return isFunction(returnValue) ? returnValue() : returnValue;
}

// recursively get the value of the cell indexed by the selectValues array.
function getCellValueRecursive({
  value,
  selectValues,
}: {
  value: any;
  selectValues: Array<string>;
}) {
  if (selectValues?.length === 0) {
    return value;
  }
  if (isObject(value)) {
    return getCellValueRecursive({
      value: value[selectValues[0]],
      selectValues: selectValues.slice(1),
    });
  }
  // now it is an array of objects
  if (Array.isArray(value)) {
    return value.map((item) =>
      getCellValueRecursive({ value: item[selectValues[0]], selectValues: selectValues.slice(1) })
    );
  }

  return null;
}

function handleObjectType({ value, cellConfig }: { value: any; cellConfig: FormFieldTypes }) {
  {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '';
      }
      if (typeof value[0] === 'object') {
        // do not join if it is an array of objects. return the array. then handle array of objects create correct component/cell
        return getCellValueRecursive({ value, selectValues: cellConfig.selectValues }).join(',');
      }
      return value.map((item) => item.toString());
    }
    return value;
  }
}
