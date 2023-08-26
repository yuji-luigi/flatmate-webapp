import { UserRoles } from '../../lib/enums';
import { MongooseBaseModel } from './mongoose-base-model';

export interface AuthTokenModel extends MongooseBaseModel {
  nonce: number;
  linkId: string;
  active: boolean;
}

export type HiddenAuthTokenInterface = Omit<AuthTokenModel, 'nonce'>;
