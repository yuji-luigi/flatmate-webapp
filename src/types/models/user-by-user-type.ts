import { SpaceModel } from "./space-model";

export interface UserByUserType {
  _id: string;
  name: string;
  surname: string;
  email: string;
  // role: '$userRole.name',
  // isPublicProfile: '$userRegistry.isPublic',
  cover: SimpleUpload;
  avatar: SimpleUpload;
  spaces: SpaceModel[];
  jobTitle: string;
  slug: string;
}

interface SimpleUpload {
  url: string;
  fileName: string;
}
