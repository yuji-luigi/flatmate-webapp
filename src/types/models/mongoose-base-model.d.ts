export interface MongooseBaseModel /* <ChildModel> */ {
  _id: string;
  // children?: Array<ChildModel>;
  createdAt: string | Date;
  updatedAt: string | Date;
  [key: string]: any;
}
