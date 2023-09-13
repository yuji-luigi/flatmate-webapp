import { BookmarkModel } from './bookmark-model';
import { CommentModel } from './comment-model';
import { FundModel } from './fund-model';
import { FundRuleModel } from './fund-rule-model';
import { MongooseBaseModel } from './mongoose-base-model';
import { ProposalModel } from './proposal-model';
import { TagModel } from './tag-model';
import { ThreadModel } from './thread-model';
import { UserModel } from './user-model';
import { UserSettingModel } from './user-setting-model';
import { WalletModel } from './wallet-model';

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
export type AllModels = MongooseBaseModel;
