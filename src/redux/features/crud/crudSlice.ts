import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { use, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import {
  fetchCrudDocumentsWithPagination,
  addCrudDocumentDataTable,
  updateCrudDocument,
  deleteCrudDocumentWithPagination,
  fetchLinkedChildrenWithPagination,
  addLinkedChildrenDocumentDataTable,
  deleteLinkedChildDocumentWithPagination,
  addCrudDocument,
  fetchCrudDocumentsInfiniteScroll,
  fetchCrudDocuments,
  fetchCrudDocument,
} from "../crudAsyncThunks";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks/useRedux";
import { MongooseBaseModel } from "../../../types/models/mongoose-base-model";
import { NOTIFICATIONS } from "../../../data/showNofification/notificationObjects";
import {
  CrudState,
  Entity,
  Reduxdb,
  frontendEntities,
  TODO_MODEL,
  CrudSliceAction,
  FrontendEntity,
  isFrontendEntity,
} from "../../../types/redux/CrudSliceInterfaces";
import {
  UpdateCrudDocumentInStorePayload,
  SelectCrudPayload,
  FetchCrudPayload,
  FetchLinkedChildrenPayload,
  AddCrudPayload,
  AddLinkedChildPayload,
  UpdateCrudPayload,
  DeleteCrudPayload,
  DeleteLinkedChildrenPayload,
  SetCrudDocumentsPayload,
  SetCrudDocumentPayload,
} from "../../../types/redux/dispatch-args";
import { AllModels } from "../../../types/models/allmodels";

export const reduxdb: Reduxdb = [...frontendEntities, "placeholder"].reduce<Reduxdb>(
  (totalData, entity) => {
    totalData = {
      ...totalData,
      [entity]: {
        entity,
        documentsArray: [],
        totalDocuments: 0,
        singleCrudDocument: null,
        singleCrudDocuments: [],
        isChildrenTree: false,
      },
    };
    return totalData;
  },
  {} as Reduxdb
);

const initialState: CrudState = {
  reduxdb,
  status: "idle",
  submitting: false,
  error: null,
  message: null,
};

//TODO: ONDELETE GET REQUEST/ SOME UPDATE REDUX STORE LOGIC IN BACKEND OR IN FRONTEND

export const crudSlice = createSlice({
  name: "crudOperation",
  initialState,
  reducers: {
    deleteCrud: (state, action: PayloadAction<CrudSliceAction>) => {
      const { entity, documentId } = action.payload;
      state.reduxdb[entity].documentsArray.filter((data) => data._id !== documentId);
    },
    /** update by new document already fetched. */
    addOneInStore: (
      state,
      action: PayloadAction<{ entity: FrontendEntity; newDocument: MongooseBaseModel }>
    ) => {
      const { newDocument, entity } = action.payload;
      state.reduxdb[entity].documentsArray = [...state.reduxdb[entity].documentsArray, newDocument];
    },
    setOneInArrayInStore: (state, action: PayloadAction<UpdateCrudDocumentInStorePayload>) => {
      const { updatedDocument, entity } = action.payload;
      const documentIndex = state.reduxdb[entity].documentsArray.findIndex(
        (doc) => doc._id === updatedDocument._id
      );
      state.reduxdb[entity].documentsArray[documentIndex] = updatedDocument;
    },
    /** to reset singleCrudDocument, set document to null */
    selectCrudDocument: (state, action: PayloadAction<SelectCrudPayload>) => {
      // eslint-disable-next-line prefer-const
      let { entity, documentId, document } = action.payload;
      /** if both are null/undefined clean up the state */
      if (!documentId && !document) {
        state.reduxdb[entity].singleCrudDocument = null;
        return;
      }
      /** if the payload is object set itself in the store */
      if (document) {
        state.reduxdb[entity].singleCrudDocument = document;
      } else {
        /** if id is present then find from existing documents array */
        state.reduxdb[entity].singleCrudDocument =
          state.reduxdb[entity].documentsArray.find((doc) => doc._id === documentId) || null;
      }
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
    setCrudDocument: (state, action: PayloadAction<UpdateCrudDocumentInStorePayload>) => {
      const { updatedDocument, entity } = action.payload;
      state.reduxdb[entity].singleCrudDocument = updatedDocument;
    },
    setCrudDocuments: (state, action: PayloadAction<SetCrudDocumentsPayload>) => {
      const { entity, documents, totalDocuments, isChildrenTree } = action.payload;
      state.status = "succeed";
      state.reduxdb[entity].isChildrenTree = !!isChildrenTree;
      state.reduxdb[entity].documentsArray = documents;
      state.reduxdb[entity].totalDocuments = totalDocuments;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.submitting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      /**
       * FETCH DOCUMENTS
       */
      .addCase(fetchCrudDocumentsWithPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCrudDocumentsWithPagination.fulfilled,
        (state, action: PayloadAction<SetCrudDocumentsPayload>) => {
          const { entity, documents, totalDocuments, isChildrenTree = false } = action.payload;
          state.status = "succeed";
          state.reduxdb[entity].isChildrenTree = isChildrenTree;
          state.reduxdb[entity].documentsArray = documents;
          state.reduxdb[entity].totalDocuments = totalDocuments;
        }
      )
      .addCase(fetchCrudDocumentsWithPagination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCrudDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCrudDocuments.fulfilled,
        (state, action: PayloadAction<SetCrudDocumentsPayload>) => {
          const { entity, documents, totalDocuments, isChildrenTree = false } = action.payload;
          state.status = "succeed";
          state.reduxdb[entity].isChildrenTree = isChildrenTree;
          state.reduxdb[entity].documentsArray = documents;
          state.reduxdb[entity].totalDocuments = totalDocuments;
        }
      )
      .addCase(fetchCrudDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCrudDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCrudDocument.fulfilled,
        (state, action: PayloadAction<{ entity: FrontendEntity; document: AllModels }>) => {
          const { entity, document } = action.payload;
          state.status = "succeed";
          state.reduxdb[entity].singleCrudDocument = document || null;
        }
      )
      .addCase(fetchCrudDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // INFINITE SCROLL
      .addCase(fetchCrudDocumentsInfiniteScroll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCrudDocumentsInfiniteScroll.fulfilled,
        (state, action: PayloadAction<SetCrudDocumentsPayload>) => {
          const { entity, documents, totalDocuments, isChildrenTree = false } = action.payload;
          state.status = "succeed";
          state.reduxdb[entity].isChildrenTree = isChildrenTree;
          const prevDocuments = state.reduxdb[entity].documentsArray;
          state.reduxdb[entity].documentsArray = [...prevDocuments, ...documents];
          state.reduxdb[entity].totalDocuments = totalDocuments + prevDocuments.length;
        }
      )
      .addCase(fetchCrudDocumentsInfiniteScroll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      /**
       * ADD/CREATE NEW DOCUMENT
       */
      .addCase(addCrudDocumentDataTable.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCrudDocumentDataTable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(
        addCrudDocumentDataTable.fulfilled,
        (state, action: PayloadAction<SetCrudDocumentsPayload>) => {
          const { entity, /* documentId, */ totalDocuments, documents } = action.payload;
          state.status = "succeed";

          // const prevDocuments = state.reduxdb[entity].documentsArray;
          state.reduxdb[entity].totalDocuments = totalDocuments;
          state.reduxdb[entity].documentsArray = documents;
        }
      )
      .addCase(addLinkedChildrenDocumentDataTable.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLinkedChildrenDocumentDataTable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(
        addLinkedChildrenDocumentDataTable.fulfilled,
        (state, action: PayloadAction<SetCrudDocumentsPayload>) => {
          const { entity, /* documentId, */ totalDocuments, documents } = action.payload;
          state.status = "succeed";

          state.reduxdb[entity].totalDocuments = totalDocuments;
          state.reduxdb[entity].documentsArray = documents;
        }
      )
      /**
       * UPDATE/MODIFY A DOCUMENT
       */
      .addCase(updateCrudDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCrudDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(
        updateCrudDocument.fulfilled,
        (state, action: PayloadAction<{ entity: FrontendEntity; updatedDocument: AllModels }>) => {
          const { entity, updatedDocument } = action.payload;
          state.status = "succeed";
          const updatedDocuments = state.reduxdb[entity].documentsArray.map((document) => {
            if (document._id === updatedDocument._id) {
              return updatedDocument;
            }
            return document;
          });
          state.reduxdb[entity].documentsArray = updatedDocuments;
          // if (state.reduxdb[entity].singleCrudDocument) {
          state.reduxdb[entity].singleCrudDocument = updatedDocument;
          // }
        }
      )
      /**
       * DELETE A DOCUMENT
       */
      .addCase(deleteCrudDocumentWithPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCrudDocumentWithPagination.fulfilled, (state, action) => {
        const { entity, totalDocuments, documents } = action.payload;
        state.status = "succeed";
        const newDocumentArray = documents;
        // const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
        //   (document) => document._id !== documentId
        // );
        state.reduxdb[entity].totalDocuments = totalDocuments;
        state.reduxdb[entity].documentsArray = newDocumentArray;
      })
      .addCase(deleteLinkedChildDocumentWithPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteLinkedChildDocumentWithPagination.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteLinkedChildDocumentWithPagination.fulfilled, (state, action) => {
        const { entity, totalDocuments, documents } = action.payload;
        state.status = "succeed";
        const newDocumentArray = documents;
        // const newDocumentArray = state.reduxdb[entity].documentsArray.filter(
        //   (document) => document._id !== documentId
        // );
        state.reduxdb[entity].totalDocuments = totalDocuments;
        state.reduxdb[entity].documentsArray = newDocumentArray;
      });
  },
});

export const {
  selectCrudDocument,
  setCrudDocuments,
  setSubmitting,
  deleteCrud,
  resetStatus,
  setCrudDocument,
  setOneInArrayInStore,
} = crudSlice.actions;

export default crudSlice.reducer;

export const useCrudSliceStore = () => {
  const appDispatch = useAppDispatch();

  return {
    /** update single document in array without calling api. with already new document fetched. or updated in some how */
    addOneInStore(data: { entity: FrontendEntity; newDocument: MongooseBaseModel }) {
      appDispatch(crudSlice.actions.addOneInStore(data));
    },
    /** update single document in array without calling api. with already new document fetched. or updated in some how */
    setOneInArrayInStore(data: UpdateCrudDocumentInStorePayload) {
      appDispatch(crudSlice.actions.setOneInArrayInStore(data));
    },
    /** get documents from api and set in documentsArray in redux */
    fetchCrudDocuments(data: FetchCrudPayload) {
      if (!data.entity) {
        console.error("entity is required to fetch documents");
        return;
      }
      appDispatch(fetchCrudDocuments(data));
    },
    fetchCrudDocument(data: FetchCrudPayload) {
      appDispatch(fetchCrudDocument(data));
    },
    /** get documents with pagination from api and set in documentsArray in redux */
    fetchCrudDocumentsWithPagination(data: FetchCrudPayload) {
      if (!data.entity) {
        console.error("entity is required to fetch documents");
        return;
      }
      appDispatch(fetchCrudDocumentsWithPagination(data));
    },
    // TODO: add infinite scroll
    fetchCrudDocumentsInfiniteScroll(data: FetchCrudPayload) {
      appDispatch(fetchCrudDocumentsInfiniteScroll(data));
    },
    /** get children documents from api and set in documentsArray in redux */
    fetchLinkedChildrenWithPagination(data: FetchLinkedChildrenPayload) {
      if (!data.entity) {
        console.error("entity is required to fetch documents");
        return;
      }
      appDispatch(fetchLinkedChildrenWithPagination(data));
    },
    createCrudDocument(data: AddCrudPayload) {
      appDispatch(addCrudDocument(data));
    },
    /** add new document in api and issert in redux. */
    createCrudDocumentWithPagination(data: AddCrudPayload) {
      appDispatch(addCrudDocumentDataTable(data));
    },
    /** add new document in api and insert in redux. */
    createLinkedChildDocumentWithPagination(data: AddLinkedChildPayload) {
      appDispatch(addLinkedChildrenDocumentDataTable(data));
    },
    /** update in Api and update new document with old document in redux */
    updateCrudDocument(data: UpdateCrudPayload) {
      appDispatch(updateCrudDocument(data));
    },
    /** delete from Api and redux */
    deleteCrudDocumentWithPagination(data: DeleteCrudPayload) {
      appDispatch(deleteCrudDocumentWithPagination(data));
    },
    /** delete from Api and redux */
    deleteLinkedChildDocumentWithPagination(data: DeleteLinkedChildrenPayload) {
      appDispatch(deleteLinkedChildDocumentWithPagination(data));
    },
    /** set object in singleCrudDocument in Reduxdb*/
    selectCrudDocument(data: SelectCrudPayload) {
      appDispatch(selectCrudDocument(data));
    },
    setCrudDocuments(data: SetCrudDocumentsPayload) {
      appDispatch(setCrudDocuments(data));
    },
    setCrudDocument(data: SetCrudDocumentPayload) {
      appDispatch(setCrudDocument(data));
    },
    setSubmitting(bool: boolean) {
      appDispatch(setSubmitting(bool));
    },
    resetCrudStatus() {
      appDispatch(resetStatus());
    },
  };
};
// TODO: implement swr
/** Returns Array of Documents of the entity: whole array of entity */
// const useCrudDocuments = <ModelType>(entity?: FrontendEntity): ModelType[] | [] =>
//   useAppSelector((state) => state.crud.reduxdb[entity || ""]?.documentsArray);
const useCrudDocuments = <ModelType = MongooseBaseModel>(entity: FrontendEntity): ModelType[] => {
  return useAppSelector((state) => state.crud.reduxdb[entity].documentsArray) as ModelType[];
};

/** returns string if api sent message */
const useCrudMessage = () => useAppSelector((state) => state.crud.message);

/** returns status string during api call process */
const useCrudStatus = () => useAppSelector((state) => state.crud.status);

/** returns string if error is present. show flash on the screen */
const useCrudError = () => useAppSelector((state) => state.crud.error);

/** total document selector for entity */
const useTotalDocumentsCount = (entity: FrontendEntity): number => {
  return useAppSelector((state) => state.crud.reduxdb?.[entity || ""]?.totalDocuments || 0);
};

/** if it has a parent returns true. ex- space instances can be either a parent or a child */
const useIsChildrenTree = (entity: FrontendEntity): boolean => {
  console.log("entity", entity);
  return useAppSelector((state) => state.crud.reduxdb[entity].isChildrenTree);
};

/** Returns selected Document of the entity or if not selected returns null  */
const useCrudDocument = <ModelType>(entity: FrontendEntity): ModelType | undefined => {
  return useAppSelector((state) => state.crud.reduxdb[entity].singleCrudDocument) as ModelType;
};
/** Hook for selector. this time need do pass entity when initialize the hook. */
export const useCrudSelectors = <ModelType = MongooseBaseModel>(
  entity: FrontendEntity | "placeholder" = "placeholder"
) => {
  const _entity = useEntityFilter(entity);
  const crudDocuments = useCrudDocuments<ModelType>(_entity);
  // const crudDocuments = useAppSelector(
  //   (state) => state.crud.reduxdb[_entity]?.documentsArray
  // ) as ModelType[];
  const crudMessage = useCrudMessage();
  const crudStatus = useCrudStatus();
  const crudError = useCrudError();
  const totalDocumentsCount = useTotalDocumentsCount(_entity);
  const isChildrenTree = useIsChildrenTree(_entity);
  const crudDocument = useCrudDocument<ModelType>(_entity);
  const submitting = useAppSelector((state) => state.crud.submitting);
  const { resetCrudStatus } = useCrudSliceStore();

  useEffect(() => {
    if (crudError) {
      showNotification(NOTIFICATIONS.ERROR.general({ data: crudError, ms: 5000 }));
      resetCrudStatus();
    }
    // if (submitting) {
    //   showNotification(NOTIFICATIONS.LOADING.general);
    //   resetCrudStatus();
    // }
  }, [crudError, submitting]);

  return {
    /** Returns Array of Documents of the entity: whole array of entity */
    crudDocuments,
    /** Returns selected Document of the entity */
    crudDocument,
    /** returns string if error is present. to show flash on the screen */
    crudError,
    /** returns string if api sent message */
    crudMessage,
    /** returns status string during api call process */
    crudStatus,
    /** if it has a parent returns true. ex- space instances can be either a parent or a child */
    isChildrenTree,
    /** number of total documents in queried array from db. */
    totalDocumentsCount,
    submitting,
  };
};

/** Hook for selector. this time need do pass entity when initialize the hook. */
export const useEntityFilter = (entity: string): FrontendEntity | "placeholder" => {
  if (isFrontendEntity(entity)) {
    return entity as FrontendEntity;
  }
  return "placeholder";
};
