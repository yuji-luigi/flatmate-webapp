import { UserType } from "../../lib/enums";
import { MongooseBaseModel } from "./mongoose-base-model";

export interface UnitInterface extends MongooseBaseModel {
  name: string;
  ownerName?: string;
  tenantName?: string;
  unitSpace: string;
  space: {
    name: string;
    address: string;
  };
}

export const invitationStatuses = ["pending", "accepted", "declined"] as const;

type InvitationStatus = (typeof invitationStatuses)[number];
