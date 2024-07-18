import { RowAction } from "../../../../types/data/json/sections-json";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";

export type ActionCellProps = {
  row: MongooseBaseModel;
  entity: FrontendEntity;
  parentId?: string;
  isMenu?: boolean;
  action: RowAction;
};
