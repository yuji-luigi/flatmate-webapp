import { AllModels } from "../models/allmodels";
import { FrontendEntity } from "./CrudSliceInterfaces";

export interface UpdateCrudDocumentInStorePayload {
  entity: FrontendEntity;
  updatedDocument: AllModels;
}

export interface FetchCrudPayload {
  entity: FrontendEntity;
  /** @description overwrite endpoint */
  owEndpoint?: string;
  query?: string;
  queryObject?: Record<string, string | number | boolean>;
  isChildrenTree?: boolean;
}
/** has parentId */
export interface FetchLinkedChildrenPayload {
  entity: FrontendEntity;
  query?: string;
  parentId: string;
  /** always true in this call */
  /*   isChildrenTree?: true;
   */
}
export interface DeleteCrudPayload {
  entity: FrontendEntity;
  documentId: string;
  query?: string;
  // paginationQuery?: string;
}

export interface DeleteLinkedChildrenPayload extends DeleteCrudPayload {
  // parentId: string;
  // paginationQuery?: string;
}
export interface UpdateCrudPayload {
  entity: FrontendEntity;
  /** form.values */
  updateData: AllModels;
  documentId: string;
  parentId?: string;
}

export interface AddCrudPayload {
  entity: FrontendEntity;
  /** form.values */
  newDocument: AllModels;
  /** specify parentId for creation of child of given id */
  parentId?: string;
  query?: string;
  queryObject?: Record<string, string | number | boolean>;
  config?: any;
}
export interface AddLinkedChildPayload {
  entity: FrontendEntity;
  /** form.values */
  newDocument: AllModels;
  /** specify parentId for creation of child of given id */
  parentId: string;
  query?: string;
}

// export type AddCrudPayload = {
//   entity: FrontendEntity;
//   newDocument: AllModels;
//   parentId?: string;
// };

export interface SelectCrudPayload {
  entity: FrontendEntity;
  document?: AllModels;
  documentId?: string | null;
}

export interface SetCrudDocumentsPayload {
  entity: FrontendEntity;
  documents: AllModels[];
  isChildrenTree?: boolean;
  totalDocuments: number;
}
export interface SetCrudDocumentPayload {
  entity: FrontendEntity;
  updatedDocument: AllModels;
}
