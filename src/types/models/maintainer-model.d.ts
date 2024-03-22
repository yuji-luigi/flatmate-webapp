import { MAINTAINER_TYPES } from "../../lib/enums";
import { IUser } from "../context/auth/useAuth";
import { MongooseBaseModel } from "./mongoose-base-model";
import { SpaceModel } from "./space-model";
import { UploadModel } from "./upload-model";

export interface MaintainerModel extends MongooseBaseModel {
  name: string;
  company: string;
  cover?: UploadModel;
  avatar?: UploadModel;
  homepage: string;
  type: string;
  tel: string;
  email: string;
  logo: UploadModel;
  description: string;
  address: string;
  isIndividual: boolean;
  spaces: SpaceModel[];
  password: string;
  isInSpace: boolean;
  createdBy: string | IUser;
  slug: string;
  jobTitle?: string;
}
