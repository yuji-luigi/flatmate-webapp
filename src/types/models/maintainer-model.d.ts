interface MaintainerModel extends MongooseBaseModel {
  name: string;
  company: string;
  cover?: IUpload | string;
  avatar?: IUpload;
  homepage: string;
  type: string;
  tel: string;
  email: string;
  logo: IUpload;
  description: string;
  address: string;
  isIndividual: boolean;
  spaces: ISpace[];
  password: string;
  isInSpace: boolean;
  createdBy: string | IUser;
}

type MaintainerType = 'carpenter' | 'electrician' | 'plumber';
