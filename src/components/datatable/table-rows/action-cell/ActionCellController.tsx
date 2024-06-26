import { RowAction } from "../../../../types/data/json/sections-json";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { QrCodeButton } from "../tablecell/action-cells/QrCodeButton";
import { DeleteActionCell } from "./DeleteActionCell";
import { EditActionCell } from "./EditActionCell";

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
  const Action = ActionButtons[action];
  return <Action row={row} entity={entity} {...other} />;
};
const ActionButtons = {
  delete: DeleteActionCell,
  modify: EditActionCell,
  qr_code: QrCodeButton,
};
