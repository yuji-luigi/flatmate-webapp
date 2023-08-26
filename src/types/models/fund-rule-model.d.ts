import { MongooseBaseModel } from './mongoose-base-model';

export interface FundRuleModel extends MongooseBaseModel {
  executeCondition?: 'every' | 'majority';
  building?: string | Building | undefined;
  user?: string | UserModel | undefined;
}
