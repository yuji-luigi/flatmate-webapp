import { UserRoles } from '../../lib/enums';

export interface AuthTokenModel extends MongooseBaseModel {
  nonce: number;
  linkId: string;
  used: boolean;
}

export type HiddenAuthTokenInterface = Omit<AuthTokenModel, 'nonce'>;
