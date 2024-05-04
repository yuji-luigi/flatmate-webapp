export interface InvitationAuth {
  _id: string;
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
