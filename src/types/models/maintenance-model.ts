import { IUser } from '../context/auth/useAuth';
import { CheckInterface } from './check-type';
import { MongooseBaseModel } from './mongoose-base-model';
import { OrganizationModel } from './organization-model';
import { SpaceModel } from './space-model';
import { UploadModel } from './upload-model';

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
  isImportant: boolean;
  entity: 'maintenances';
  space: SpaceModel;
  receipts: CheckInterface[];
  invoices: CheckInterface[];
  /** formatted in some way. from api schema level */
  _createdAt: string;
  createdBy: IUser;
  organization: OrganizationModel;
  cost: number;
}
