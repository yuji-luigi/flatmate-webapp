import { Sections } from '../general/data/sections-type';

export interface MongooseBaseModel /* <ChildModel> */ {
  _id: string;
  // children?: Array<ChildModel>;
  createdAt: string;
  updatedAt: string;
  __entity?: Sections;
}
