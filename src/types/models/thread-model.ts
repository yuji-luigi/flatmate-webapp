import { IUser } from '../context/auth/useAuth';
import { MongooseBaseModel } from './mongoose-base-model';
import { OrganizationModel } from './organization-model';
import { SpaceModel } from './space-model';
import { UploadModel } from './upload-model';

export interface ThreadModel extends MongooseBaseModel {
  title: string;
  images: UploadModel[] | [];
  description?: string;
  attachments?: UploadModel[] | [];
  tags?: string[];
  rating?: number;
  listViewType: 'default' | 'bigImage';
  articleType:
    | 'default'
    | 'blog'
    | 'news'
    | 'event'
    | 'announcement'
    | 'poll'
    | 'survey'
    | 'question'
    | 'discussion';
  /** root space */
  headSpace?: string | SpaceModel;
  createdBy: IUser;
  isImportant: boolean;
  organization: OrganizationModel | string;
  /** formatted in some way. from api schema level */
  _createdAt: string;
}
