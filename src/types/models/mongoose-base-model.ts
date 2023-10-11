import { Sections } from '../general/data/sections-type';

export interface MongooseBaseModel /* <ChildModel> */ {
  _id: string;
  // children?: Array<ChildModel>;
  createdAt: string | Date;
  updatedAt: string | Date;
  __entity?: Sections;
}
