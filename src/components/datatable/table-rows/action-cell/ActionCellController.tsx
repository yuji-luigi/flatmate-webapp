import { FC } from "react";
import { RowAction, RowActionType } from "../../../../types/data/json/sections-json";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { QrCodeButton } from "../tablecell/action-cells/QrCodeButton";
import { DeleteActionCell } from "./DeleteActionCell";
import { EditActionCell } from "./EditActionCell";
import { ActionCellProps } from "./action-cell-types";
import { RemoveUserFromUnitAction } from "../tablecell/action-cells/RemoveUserFromUnitAction";

type ActionCellControllerProps = {
  action: RowAction;
  row: MongooseBaseModel;
  entity: FrontendEntity;
  parentId?: string;
};

export const ActionCellController: React.FC<ActionCellControllerProps> = ({
  action,
  row,
  entity,
  ...other
}: ActionCellControllerProps) => {
  const Action = ActionButtons[action.type];
  return <Action row={row} entity={entity} {...other} action={action} />;
};

export const ActionMenuController: React.FC<ActionCellControllerProps> = ({
  action,
  row,
  entity,
  ...other
}: ActionCellControllerProps) => {
  const Action = ActionButtons[action.type];
  return <Action row={row} entity={entity} {...other} action={action} isMenu />;
};
const ActionButtons: Record<RowActionType, FC<ActionCellProps>> = {
  delete: DeleteActionCell,
  modify: EditActionCell,
  qr_code: QrCodeButton,
  remove_unit_user: RemoveUserFromUnitAction,
} as const;
