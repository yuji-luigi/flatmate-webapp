export interface InvitationAuth {
  _id: string;
  status: InvitationStatus;
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
