import { MaintainerModel } from './maintainer-model';
import { MaintenanceModel } from './maintenance-model';
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
  space?: string | SpaceModel;
}
