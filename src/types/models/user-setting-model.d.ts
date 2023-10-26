import { MongooseBaseModel } from './mongoose-base-model';
import { UserModel } from './user-model';

export interface UserSettingModel extends MongooseBaseModel {
  pushNotification: boolean;
  smsNotification: boolean;
  administrator: string | UserModel;
}
