import { MaintainerModel } from '../models/maintainer-model';

export type SpaceSlugResponse = {
  space: SpaceModel;
  maintainers: MaintainerModel[];
};
