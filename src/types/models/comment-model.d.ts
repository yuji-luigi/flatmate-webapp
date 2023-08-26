import { MongooseBaseModel } from './mongoose-base-model';

export interface CommentModel extends MongooseBaseModel {
  title: string;
  body?: string;
  password: string;
  fund: string[] | Fund;
  building?: string | Building;
  user?: string | UserModel | undefined;
}
