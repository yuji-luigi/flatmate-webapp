import { IUser } from '../context/auth/useAuth';
import { MongooseBaseModel } from './mongoose-base-model';

export interface OrganizationModel extends MongooseBaseModel {
  name: string;
  phone: string;
  email: string;
  address: string;
  homepage: string;
  logoBanner?: string;
  logoSquare?: string;
  admins: string[] | IUser[];
  /** decides if everyone in the world can see or only under the organization. */
  isPublic: boolean;
}
