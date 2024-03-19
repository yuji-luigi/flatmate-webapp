import { IUser } from "../context/auth/useAuth";
import { MongooseBaseModel } from "./mongoose-base-model";
import { SpaceModel } from "./space-model";

export interface ProposalModel extends MongooseBaseModel {
  amount?: number | undefined;
  description?: string | undefined;
  // fundRule?: string | FundModelRule | undefined;
  headSpace?: string | SpaceModel;
  proposals?: string[] | ProposalModel[] | undefined;
  user?: string | IUser | undefined;
}
