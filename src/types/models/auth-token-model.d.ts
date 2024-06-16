import { UserRoles } from "../../lib/enums";
import { MongooseBaseModel } from "./mongoose-base-model";

export interface AuthTokenModel {
  _id: string;
  nonce?: number;
  linkId: string;
  active: boolean;
}

export type HiddenAuthTokenInterface = Omit<AuthTokenModel, "nonce">;
