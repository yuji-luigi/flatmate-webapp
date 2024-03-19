import { MongooseBaseModel } from "./mongoose-base-model";
import { SpaceModel } from "./space-model";
import { ThreadModel } from "./thread-model";

export interface BookmarkModel extends MongooseBaseModel {
  date?: string | undefined;
  threads?: string[] | ThreadModel[] | undefined;
  note?: string | undefined;
  headSpace?: string | SpaceModel;
}
