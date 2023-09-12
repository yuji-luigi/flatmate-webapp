import { CheckInterface } from './check-type';
import { MongooseBaseModel } from './mongoose-base-model';

export interface MaintenanceModel extends MongooseBaseModel {
  title: string;
  images: UploadModel[] | [];
  description: string;
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
  createdBy: IUser | string;
  isImportant: boolean;
  owner: IOwner | string;
  space: SpaceModel;
  receipts: string | CheckInterface[];
  invoices: string | CheckInterface[];
  /** formatted in some way. from api schema level */
  _createdAt: string;
  createdBy: IUser;
  organization: OrganizationModel;
}
