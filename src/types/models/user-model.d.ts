import { UserRoles } from '../../lib/enums';
import { MongooseBaseModel } from './mongoose-base-model';
import { UploadModel } from './upload-model';

export interface UserModel extends MongooseBaseModel {
  surname: string;
  name: string;
  email: string;
  active: boolean;
  role: UserRoles;
  rootSpaces: Array<string>;
  password: string;
  phone?: string;
  avatar?: UploadModel;
  organization: string;
}
