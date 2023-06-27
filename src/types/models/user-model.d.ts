import { UserRoles } from '../../lib/enums';

interface UserModel extends MongooseBaseModel {
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
