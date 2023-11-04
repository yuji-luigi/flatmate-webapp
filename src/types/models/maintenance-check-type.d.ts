import { MaintainerModel } from './maintainer-model';
// import { MaintenanceModel } from './maintenance-model';
import { MongooseBaseModel } from './mongoose-base-model';
import { OrganizationModel } from './organization-model';
import { SpaceModel } from './space-model';
import { UploadModel } from './upload-model';

export const checkTypes = ['invoices', 'receipts'] as const;
export type CheckType = (typeof checkTypes)[number];
export interface CheckInterface extends MongooseBaseModel {
  //virtual field name get from maintenance.name
  name: string;
  maintainer: MaintainerModel;
  maintenance: MaintenanceModel;
  total: number;
  files: UploadModel[];
  organization: OrganizationModel;
  mainSpace: SpaceModel;
  type: CheckType;
  total: number;
  subtoal: number;
  space?: string | SpaceModel;
}

export const MAINTENANCE_STATUS = {
  INCOMPLETE: 'incomplete',
  // INVOICED: 'invoiced',// ! to deprecate
  COMPLETED: 'completed',
  IN_PROGRESS: 'inProgress',
} as const;
export type MAINTENANCE_STATUS_TYPE = (typeof MAINTENANCE_STATUS)[keyof typeof MAINTENANCE_STATUS];

export interface MaintenanceModel extends MongooseBaseModel {
  title: string;
  images: UploadModel[] | [];
  description: string;
  attachments?: UploadModel[] | [];
  status: MAINTENANCE_STATUS_TYPE;

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
  receiptsTotal: number;
  invoicesTotal: number;
  completedAt?: string;
  organization: OrganizationModel;
  cost: number;
}
