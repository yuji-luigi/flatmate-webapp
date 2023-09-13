import { MongooseBaseModel } from './mongoose-base-model';
import { SpaceModel } from './space-model';
import { UserModel } from './user-model';

export interface FundRuleModel extends MongooseBaseModel {
  executeCondition?: 'every' | 'majority';
  space?: string | SpaceModel | undefined;
  user?: string | UserModel | undefined;
}
