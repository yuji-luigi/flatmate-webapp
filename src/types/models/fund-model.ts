import { MongooseBaseModel } from './mongoose-base-model';
import { SpaceModel } from './space-model';
import { UserModel } from './user-model';

export interface FundModel extends MongooseBaseModel {
  amount?: number;
  // fundRules?: string[] | FundModelRuleMode[] | undefined;
  space?: string | SpaceModel;

  user?: string | UserModel | undefined;
}
