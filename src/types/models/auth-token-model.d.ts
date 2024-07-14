import { UserRoles } from "../../lib/enums";
import { MongooseBaseModel } from "./mongoose-base-model";

export interface AuthTokenModel {
  _id: string;
  nonce?: number;
  linkId: string;
  active: boolean;
}
// TODO: WHY IT WAS HIDDEN NONCE?
export type HiddenAuthTokenInterface = AuthTokenModel;
// export type HiddenAuthTokenInterface = Omit<AuthTokenModel, "nonce">;

export interface QRCodeAuthTokenInterface extends AuthTokenModel {
  message: string;
  isAvailable: UserRoles;
}
