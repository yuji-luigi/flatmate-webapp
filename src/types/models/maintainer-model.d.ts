interface MaintainerModel extends MongooseBaseModel {
  name: string;
  company: string;
  avatar?: UploadModel;
  homepage: string;
  type: string;
  tel: string;
  email: string;
  cover?: UploadModel;
  description: string;
  address: string;
  isIndividual: boolean;
  // organizations: IOrganization[];
  // spaces: ISpaces[];
  type: MaintainerType;
  createdBy: string | IUser;
}

type MaintainerType = 'carpenter' | 'electrician' | 'plumber';
