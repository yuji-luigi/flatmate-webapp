import { FundModel } from './fund-model';
import { MongooseBaseModel } from './mongoose-base-model';
import { UserModel } from './user-model';

export interface CommentModel extends MongooseBaseModel {
  title: string;
  body?: string;
  password: string;
  fund: string[] | FundModel;
  user?: string | UserModel | undefined;
}
