import { UserType } from "../../lib/enums";

export const pendingInvitationStatuses = ["pending", "pending-register"] as const;

type InvitationStatus =
  | (typeof pendingInvitationStatuses)[number]
  | (typeof otherInvitationStatuses)[number];

export const otherInvitationStatuses = ["accepted", "declined", "outdated"] as const;

export const invitationStatuses = [
  ...pendingInvitationStatuses,
  ...otherInvitationStatuses,
] as const;

type PendingInvitationStatus = (typeof pendingInvitationStatuses)[number];

export function isPendingStatus(status: InvitationStatus): status is PendingInvitationStatus {
  return pendingInvitationStatuses.includes(status as PendingInvitationStatus);
}

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

export const INVITATION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
} as const;
