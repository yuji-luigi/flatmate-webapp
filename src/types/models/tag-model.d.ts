import { MongooseBaseModel } from './mongoose-base-model';
import { SpaceModel } from './space-model';

export interface TagModel extends MongooseBaseModel {
  description?: string;
  color?: string;
  space?: string | SpaceModel;
}
