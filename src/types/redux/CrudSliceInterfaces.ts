import { access } from "fs";
import { AllModels } from "../models/allmodels";
import { MongooseBaseModel } from "../models/mongoose-base-model";
import { property_manager } from "../../json/section-config/sectionBaseConfigs";

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
  "roles",
  "accessPermissions",
  "invitations",
] as const;

export const userTypes = [
  "inhabitant",
  "property_manager",
  "maintainer",
  "system_admin",
  "super_admin",
] as const;

const sections = ["statistics", "posts", "home"] as const;

export const singleEntities: Record<FrontendEntity, string> = {
  users: "user",
  accessPermissions: "accessPermission",
  roles: "role",
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
  inhabitant: "inhabitant",
  property_manager: "property_manager",
  statistics: "statistic",
  posts: "post",
  home: "home",
  invitations: "invitation",
  maintainer: "maintainer",
  system_admin: "system_admin",
  super_admin: "super_admin",
  placeholder: "placeholder",
} as const;

export const frontendEntities = [...entities, ...sections, ...userTypes, "placeholder"] as const;
export type Entity = (typeof entities)[number];

export function isFrontendEntity(entity: any): entity is Entity {
  return frontendEntities.includes(entity as Entity);
}
export type FrontendEntity = (typeof frontendEntities)[number];

export type TODO_MODEL = MongooseBaseModel;

export interface ReduxDbEntity {
  entity: Entity;
  documentsArray: AllModels[];
  totalDocuments: number;
  /** document */
  singleCrudDocument: AllModels | null;
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
export type Reduxdb = Record<FrontendEntity, ReduxDbEntity>;

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

export type CrudSliceAction = {
  entity: FrontendEntity;
  documentId?: string;
};
