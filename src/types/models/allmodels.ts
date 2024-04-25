import { MongooseBaseModel } from "./mongoose-base-model";

// export type AllModels =
//   | BookmarkModel
//   | CommentModel
//   | FundModel
//   | FundRuleModel
//   | ProposalModel
//   | TagModel
//   | ThreadModel
//   | UserModel
//   | UserSettingModel
//   | WalletModel
//   | Record<string, unknown>;
export type AllModels = MongooseBaseModel | Record<string, any>;

export function isAllModels(arg: any): arg is AllModels {
  return arg && arg._id; /* && arg.createdAt && arg.updatedAt; */
}
