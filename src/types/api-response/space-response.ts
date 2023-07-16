import { MaintainerModel } from '../models/maintainer-model';

export type SpaceSlugResponse = {
  space: SpaceModel;
  maintainers: MaintainerModel[];
};

// export type ApiError = {
//   message: string;
//   success: false;
//   stack?: string;
// };
