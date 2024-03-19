import { MongooseBaseModel } from "./mongoose-base-model";
import { UserModel } from "./user-model";

export interface WalletModel extends MongooseBaseModel {
  amount?: number | undefined;
  user?: string | UserModel | undefined;
}
