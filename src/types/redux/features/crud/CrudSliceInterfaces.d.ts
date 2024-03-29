interface ReduxDbEntity<Entity> {
  entity: Sections;
  documentsArray: any[] | [];
  totalDocuments: number;
  /** document */
  singleCrudDocument: AllModels | null;
  /** now leave this */
  isChildrenTree: boolean;
  /** _id of singleCrudDocuments  */
  singleCrudDocuments: string[] | [];
}

interface Statistics {
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

interface Reduxdb {
  [key: string]: ReduxDbEntity<AllModels>;
  home: ReduxDbEntity<Array<Record>>;
  users: ReduxDbEntity<UserModel>;
  buildings: ReduxDbEntity<Building>;
  billing: ReduxDbEntity<Array<Record>>;
  statistics: ReduxDbEntity<Array<Record>>;
  comments: ReduxDbEntity<Array<Record>>;
  funds: ReduxDbEntity<Array<Record>>;
  fundRules: ReduxDbEntity<Array<Record>>;
  instances: ReduxDbEntity<Array<Record>>;
  proposals: ReduxDbEntity<Array<Record>>;
  notifications: ReduxDbEntity<Array<Record>>;
  bookmarks: ReduxDbEntity<Array<Record>>;
  tags: ReduxDbEntity<Array<Record>>;
  threads: ReduxDbEntity<Array<Record>>;
  userSettings: ReduxDbEntity<Array<Record>>;
  uploads: ReduxDbEntity<Array<Record>>;
  wallets: ReduxDbEntity<Array<Record>>;
  events: ReduxDbEntity<Array<Record>>;
}

// interface SelectedDocument {
//   entity: Sections;
//   document: AllModels;
// }
interface CrudState {
  reduxdb: Reduxdb;
  status: CrudStatus;
  submitting: boolean;
  error?: null | string;
  message?: null | string;
}

// type SelectCrudPayload = RequireAtLeastOne<SelectCrudPayload, 'document' | 'documentId'>;

interface AddedCrudResponse {
  success: boolean;
  collection: Sections;
  data: AllModels;
  count: Number;
}

interface UseCrudSliceReturnTypes {
  /** Returns Array of Documents of the entity: whole array of entity */
  crudDocuments: Array<AllModels>;
  /** Returns selected Document of the entity. need to set to null every time creation of new document happens  */
  crudDocument: AllModels | null;
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
