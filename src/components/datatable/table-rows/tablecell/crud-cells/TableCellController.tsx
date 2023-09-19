import React from 'react';
import { FormFieldTypes } from '../../../../../types/general/data/data-table/formField-types';
import { AvatarCell } from './AvatarCell';
import { TextCell } from './TextCell';
import { BooleanCell } from './BooleanCell';
import LinkChildrenCell from './LinkChildrenCell';
import {
  CellTypes,
  PartialCellTypes,
} from '../../../../../types/general/data/data-table/cellTypes';
// import { IconPencil, IconTrash } from '@tabler/icons-react';
// import { UsersTableRow } from '../../../../types/general/data/datatable/objects';
export const jobColors: Record<string, string> = {
  engineer: 'blue',
  manager: 'cyan',
  designer: 'pink',
};

const TableCellController = ({
  cellValue,
  cellConfig,
  rowData,
}: {
  cellValue: string;
  cellConfig: FormFieldTypes;
  rowData: any;
}) => {
  if (cellConfig.noTable) {
    return null;
  }

  const type: CellTypes = cellConfig.cellType || cellConfig.type;

  const cells: PartialCellTypes = {
    avatar: AvatarCell,
    boolean: BooleanCell,
    'link-children': LinkChildrenCell,
  };

  // default cell is TextCell
  const Cell = cells[type] || TextCell;
  return <Cell cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />;
};
export default TableCellController;
