import { FundModel } from './fund-model';
import { MongooseBaseModel } from './mongoose-base-model';
import { OrganizationModel } from './organization-model';
import { ThreadModel } from './thread-model';
import { UploadModel } from './upload-model';
import { UserModel } from './user-model';

export interface SpaceModel extends MongooseBaseModel {
  name: string;
  avatar?: UploadModel;
  cover?: UploadModel;
  organization: OrganizationModel;
  address?: string;
  floors?: string[];
  password: string;
  threads?: string[] | ThreadModel[] | undefined;
  fund: string[] | FundModel;
  slug: string;
  administrator: string | UserModel;
  // ! todo add virtuals in api
  _createdAt: string;
}
