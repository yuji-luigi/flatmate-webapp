interface SpaceModel extends MongooseBaseModel {
  organization: OrganizationModel;
  address?: string;
  floors?: string[];
  password: string;
  threads?: string[] | ThreadModel[] | undefined;
  fund: string[] | FundModel;
  administrator: string | UserModel;
  // ! todo add virtuals in api
  _createdAt: string;
}
