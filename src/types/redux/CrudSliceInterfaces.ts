import { MongooseBaseModel } from "../models/mongoose-base-model";

export const entities = [
  "users",
  "spaces",
  "maintenances",
  "checks",
  "comments",
  "bookmarks",
  "tags",
  "threads",
  "userSettings",
  "uploads",
  "wallets",
  "events",
] as const;

export const singleEntities = {
  users: "user",
  spaces: "space",
  maintenances: "maintenance",
  checks: "check",
  comments: "comment",
  bookmarks: "bookmark",
  tags: "tag",
  threads: "thread",
  userSettings: "userSetting",
  uploads: "upload",
  wallets: "wallet",
  events: "event",
} as const;

const sections = ["statistics", "posts", "home"] as const;

export const frontendEntities = [...entities, ...sections] as const;
export type Entity = FrontendEntity;

export type FrontendEntity = (typeof frontendEntities)[number];

export type TODO_MODEL = Record<string, any> & MongooseBaseModel;

export interface ReduxDbEntity {
  entity: Entity;
  documentsArray: TODO_MODEL[];
  totalDocuments: number;
  /** document */
  singleCrudDocument: TODO_MODEL | null;
  /** now leave this */
  isChildrenTree: boolean;
  /** _id of singleCrudDocuments  */
  singleCrudDocuments: string[] | [];
}

export interface Statistics {
  checksByMonth: {
    nChecks: number;
    month: Date;
    total: number;
  }[];
  checksByDate:
    | {
        date: Date;
        total: number;
        data: {
          date: Date;
          total: number;
          entity: string;
          name: string;
        }[];
      }[]
    | [];
}
export type Reduxdb = Record<FrontendEntity | string, ReduxDbEntity>;

export interface CrudState {
  reduxdb: Reduxdb;
  status: CrudStatus;
  submitting: boolean;
  error?: null | string;
  message?: null | string;
}

export interface AddedCrudResponse {
  success: boolean;
  collection: Entity;
  data: TODO_MODEL;
  count: Number;
}

export interface UseCrudSliceReturnTypes {
  /** Returns Array of Documents of the entity: whole array of entity */
  crudDocuments: Array<TODO_MODEL>;
  /** Returns selected Document of the entity. need to set to null every time creation of new document happens  */
  crudDocument: TODO_MODEL | null;
  /** returns string if error is present. to show flash on the screen */
  crudError: string | null | undefined;
  /** returns string if api sent message */
  crudMessage: string | null | undefined;
  /** returns status string during api call process */
  crudStatus: CrudStatus;
  /** if it has a parent returns true. ex- space instances can be either a parent or a child */
  isChildrenTree: boolean;
  /** number of total documents in queried array from db. */
  totalDocumentsCount: number;
}

type CrudStatus = "idle" | "loading" | "succeed" | "failed";
