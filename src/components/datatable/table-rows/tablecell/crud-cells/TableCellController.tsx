import { ReactNode } from "react";
import { FormFieldTypes } from "../../../../../types/general/data/data-table/form-field-type/formField-types";
import { AvatarCell } from "./AvatarCell";
import { TextCell } from "./TextCell";
import { BooleanCell } from "./BooleanCell";
import LinkChildrenCell from "./LinkChildrenCell";
import { CellTypes } from "../../../../../types/general/data/data-table/cellTypes";
import { TextOnHoverCell } from "./TextOnHoverCell";
import { TextOnDialogCell } from "./TextOnDialogCell";
import BadgeCellDecorator from "./BadgeCellDecorator";
import { DateCell } from "./DateCell";
import { UserNameEmailCell } from "../specific-cells/UserNameEmailCell";
import { StaticSelectCell } from "./StaticSelectCell";
import { FormTypes } from "../../../../../types/general/data/data-table/form-field-type/base-form-type";
// import { IconPencil, IconTrash } from '@tabler/icons-react';
// import { UsersTableRow } from '../../../../types/general/data/datatable/objects';
export const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
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

  const cells: Record<string, (props: any) => ReactNode> = {
    avatar: AvatarCell,
    boolean: BooleanCell,
    date: DateCell,
    "user-name-email-head": UserNameEmailCell,
    "link-children": LinkChildrenCell,
    "text-on-hover": TextOnHoverCell,
    "text-on-dialog": TextOnDialogCell,
    "static-select": StaticSelectCell,
  };

  // default cell is TextCell
  const Cell = cells[type] || TextCell;

  if (cellConfig.badge) {
    return (
      <BadgeCellDecorator cellConfig={cellConfig} value={cellValue}>
        <Cell cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />
      </BadgeCellDecorator>
    );
  }
  return <Cell cellValue={cellValue} cellConfig={cellConfig} rowData={rowData} />;
};
export default TableCellController;
