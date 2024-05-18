import { UserType } from "../../lib/enums";

export interface InvitationAuth {
  _id: string;
  status: InvitationStatus;
  userType: UserType;
  createdBy: {
    name: string;
    surname: string;
    email: string;
  };
  space: {
    name: string;
    address: string;
  };
}

export const invitationStatuses = ["pending", "accepted", "declined"] as const;

type InvitationStatus = (typeof invitationStatuses)[number];
