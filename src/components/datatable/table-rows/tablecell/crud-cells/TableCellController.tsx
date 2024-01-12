import React from 'react';
import { isArray } from 'util';
import {
  BadgeCellConfig,
  FormFieldTypes,
} from '../../../../../types/general/data/data-table/formField-types';
import { AvatarCell } from './AvatarCell';
import { TextCell } from './TextCell';
import { BooleanCell } from './BooleanCell';
import LinkChildrenCell from './LinkChildrenCell';
import {
  CellTypes,
  LinkChildrenCellFunc,
  PartialCellTypes,
  RegularCellFunc,
} from '../../../../../types/general/data/data-table/cellTypes';
import { TextOnHoverCell } from './TextOnHoverCell';
import { TextOnDialogCell } from './TextOnDialogCell';
import BadgeCellDecorator from './BadgeCellDecorator';
import { DateCell } from './DateCell';
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

  // !todo: figure out how to correctly type formFieldTypes
  // const cells: PartialCellTypes = {
  const cells: any = {
    avatar: AvatarCell,
    boolean: BooleanCell,
    date: DateCell,
    'link-children': LinkChildrenCell,
    'text-on-hover': TextOnHoverCell,
    'text-on-dialog': TextOnDialogCell,
  };

  // default cell is TextCell
  const Cell = cells[type] || TextCell;

  if (cellConfig.badge) {
    return (
      <BadgeCellDecorator cellConfig={cellConfig as BadgeCellConfig} value={cellValue}>
        <Cell cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />
      </BadgeCellDecorator>
    );
  }
  return <Cell cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />;
};
export default TableCellController;
