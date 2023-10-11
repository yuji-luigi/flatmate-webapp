import { IUser } from '../context/auth/useAuth';
import { MaintenanceModel } from './maintenance-model';
import { MongooseBaseModel } from './mongoose-base-model';
import { OrganizationModel } from './organization-model';
import { SpaceModel } from './space-model';
import { ThreadModel } from './thread-model';
import { UploadModel } from './upload-model';

export interface NotificationModel extends MongooseBaseModel {
  title?: string;
  images: UploadModel[] | [];
  description?: string;
  attachments?: UploadModel[] | [];
  tags?: string[];
  /** root space */
  space?: string | SpaceModel;
  createdBy: IUser;
  isImportant: boolean;
  organization: OrganizationModel | string;
  /** formatted in some way. from api schema level */
  _createdAt: string;
  category?: string;
  entity: 'threads' | 'maintenances';
}
