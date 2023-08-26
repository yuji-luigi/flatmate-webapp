import { MaintainerModel } from '../models/maintainer-model';
import { SpaceModel } from '../models/space-model';

export type SpaceSlugResponse = {
  space: SpaceModel;
  maintainers: MaintainerModel[];
};

// export type ApiError = {
//   message: string;
//   success: false;
//   stack?: string;
// };
