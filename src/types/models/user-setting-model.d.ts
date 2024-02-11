import { MongooseBaseModel } from './mongoose-base-model';

export interface UserSettingModel extends MongooseBaseModel {
  pushNotification: boolean;
  smsNotification: boolean;
  administrator: string | UserModel;
}
