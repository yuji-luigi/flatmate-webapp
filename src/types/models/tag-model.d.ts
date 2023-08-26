import { MongooseBaseModel } from './mongoose-base-model';

export interface TagModel extends MongooseBaseModel {
  description?: string;
  color?: string;
  building?: string | Building;
}
