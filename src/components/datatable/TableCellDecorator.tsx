import React, { Fragment } from 'react';
// import BadgeCell from './table-rows/tablecell/BadgeCell';
import TableCellController from './table-rows/tablecell/crud-cells/TableCellController';
import {
  BadgeCellConfig,
  FormFieldTypes,
} from '../../types/general/data/data-table/formField-types';
import BadgeCellDecorator from './table-rows/tablecell/crud-cells/BadgeCellDecorator';
import { AllModels } from '../../types/models/mongoose-models';
import classes from './TableCellDecorator.module.css';

function isObject(value: any): boolean {
  return (
    (value && typeof value === 'object') || (!Array.isArray(value) && typeof value === 'object')
  );
}
function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

//! todo: refactor this component to be more readable and rational.

export function TableCellDecorator({
  rowData,
  cellConfig,
}: {
  rowData: AllModels;
  cellConfig: FormFieldTypes;
}) {
  /** get value of the cell (from object/array/primitive) */
  const cellValue = getCellValue({ rowData, cellConfig });

  // if (cellConfig.badge) {
  //   return (
  //     <BadgeCellDecorator cellConfig={cellConfig as BadgeCellConfig} value={cellValue}>
  //       {tableCell}
  //     </BadgeCellDecorator>
  //   );
  // }

  if (cellConfig.noTable) return null;

  // inside of the cell
  if (isArray(cellValue)) {
    return (
      <>
        {cellValue.map((value, index) => (
          <div key={value} className={classes.cellContent}>
            <TableCellController cellValue={value} cellConfig={cellConfig} rowData={rowData} />
          </div>
        ))}
      </>
    );
  }
  return (
    <div className={classes.cellContent}>
      {' '}
      <TableCellController cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />
    </div>
  );
}

type ValueFunction = () => string;
type ValueOrFunction = string | ValueFunction;
const isFunction = (value: ValueOrFunction): value is ValueFunction => typeof value === 'function';

function getCellValue({ rowData, cellConfig }: { rowData: any; cellConfig: FormFieldTypes }) {
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
  const valueType: typeof value & 'array' = typeof value;
  // valueType = Array.isArray(value) ? 'array' : valueType;

  const valueObject: Record<typeof value, string | ValueOrFunction> = {
    string: () => value.toString(),
    number: () => value.toString(),
    boolean: () => value.toString(),
    object: () => handleObjectType({ value, cellConfig }),
  };
  const returnValue = valueObject[valueType];
  const result = isFunction(returnValue) ? returnValue() : returnValue;
  return result;
}

// recursively get the value of the cell indexed by the selectValues array.
//ignore ts error
// @ts-ignore
function getCellValueRecursive({
  value,
  selectValues,
  object,
}: {
  value: any;
  selectValues: Array<string>;
  object: any;
}) {
  if (selectValues?.length === 0) {
    return value.join('');
  }

  if (selectValues[0].startsWith('_$')) {
    const divider = selectValues[0].replaceAll('_$', '');
    const clonedValue = structuredClone(value);
    clonedValue[clonedValue.length - 1] = `${clonedValue[clonedValue.length - 1]}${divider}`;
    return getCellValueRecursive({
      value: clonedValue,
      selectValues: selectValues.slice(1),
      object,
    });
  }

  if (!isArray(value) && isObject(value)) {
    return getCellValueRecursive({
      value: [value[selectValues[0]]],
      selectValues: selectValues.slice(1),
      object,
    });
  }
  value.push(object[selectValues[0]]);
  return getCellValueRecursive({
    value,
    selectValues: selectValues.slice(1),
    object,
  });
}

function handleObjectType({ value, cellConfig }: { value: any; cellConfig: FormFieldTypes }) {
  if (cellConfig.type !== 'select') return '';
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '';
    }
    if (typeof value[0] === 'object') {
      // do not join if it is an array of objects. return the array. then handle array of objects create correct component/cell
      const result = value.map((singleValue) => {
        const resultInMap = getCellValueRecursive({
          value: singleValue,
          selectValues: cellConfig.selectValues,
          object: singleValue,
        });
        return resultInMap;
      });
      return result;
    }
    return value.map((item) => item.toString());
  }
  if (!cellConfig.selectValues?.length) {
    return value.name || 'set the selectValues array';
  }
  const result = getCellValueRecursive({
    value,
    selectValues: cellConfig.selectValues,
    object: value,
  });
  return result;
}
