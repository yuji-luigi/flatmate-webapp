import { MaintainerModel } from './maintainer-model';
import { MaintenanceModel } from './maintenance-model';

export const checkTypes = ['invoices', 'receipts'] as const;
export type CheckType = (typeof checkTypes)[number];
export interface CheckInterface extends MongooseBaseModel {
  //virtual field name get from maintenance.name
  name: string;
  maintainer: MaintainerModel;
  maintenance: MaintenanceModel;
  total: number;
  file: UploadModel;
  organization: OrganizationModel;
  mainSpace: SpaceModel;
  type: CheckType;
  space?: string | SpaceModel;
}
