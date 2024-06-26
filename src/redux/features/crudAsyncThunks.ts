/*************************************
 *  Created on Sat Feb 04 2023
 *
 *  Copyright (c) 2023 Yuji Sato
 * */

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiEndpointRootsEnum,
  PATH_API_DATA_TABLE,
  PATH_API_DATA_TABLE_ROOT,
} from "../../path/path-api";
import axiosInstance, { AxiosResData, uploadConfig } from "../../utils/axios-instance";
import { UploadModel } from "../../types/models/upload-model";
import {
  AddCrudPayload,
  DeleteCrudPayload,
  DeleteLinkedChildrenPayload,
  FetchCrudPayload,
  FetchLinkedChildrenPayload,
  UpdateCrudPayload,
} from "../../types/redux/dispatch-args";
import { AllModels, isAllModels } from "../../types/models/allmodels";

interface MediaField {
  [key: string]: File[] | UploadModel[] | [];
  // [Symbol.iterator](): IterableIterator<string>; // to make sure it is iterable
}

export function hasMedia(mediaField: MediaField) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in mediaField) {
    if (mediaField[key]?.length > 0) return true;
  }
  return false;
}

export const HTTP_MULTIPART_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

export const fetchCrudDocuments = createAsyncThunk(
  "cruds/dataTable/fetchCrudDocuments",
  async ({
    entity,
    query,
    isChildrenTree = false,
    queryObject = {},
    owEndpoint,
  }: FetchCrudPayload) => {
    const _entity = entity === "posts" ? "threads" : entity;
    const endpoint = owEndpoint || _entity;
    const res = await axiosInstance.get<AxiosResData>(`${endpoint}${query || ""}`, {
      params: queryObject,
    });
    return {
      entity: _entity,
      isChildrenTree,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);
export const fetchCrudDocument = createAsyncThunk(
  "cruds/dataTable/fetchCrudDocument",
  async ({
    entity,
    query,
    isChildrenTree = false,
    queryObject = {},
    owEndpoint,
  }: FetchCrudPayload) => {
    const _entity = entity === "posts" ? "threads" : entity;
    const endpoint = owEndpoint || _entity;
    const res = await axiosInstance.get<AxiosResData>(`${endpoint}${query || ""}`, {
      params: queryObject,
    });
    return {
      entity: _entity,
      isChildrenTree,
      document: res.data.data,
    };
  }
);

export const fetchCrudDocumentsWithPagination = createAsyncThunk(
  "cruds/dataTable/fetchCrudDocumentsWithPagination",
  async ({ entity, query, isChildrenTree = false, queryObject = {} }: FetchCrudPayload) => {
    const _entity = entity === "posts" ? "threads" : entity;
    const res = await axiosInstance.get<AxiosResData>(
      `${_entity}/${PATH_API_DATA_TABLE_ROOT}${query || ""}`,
      { params: queryObject }
    );
    return {
      entity: _entity,
      isChildrenTree,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

export const fetchCrudDocumentsInfiniteScroll = createAsyncThunk(
  "cruds/dataTable/fetchCrudDocumentsInfiniteScroll",
  async ({ entity, query, isChildrenTree = false, queryObject = {} }: FetchCrudPayload) => {
    const _entity = entity === "posts" ? "threads" : entity;
    const res = await axiosInstance.get<AxiosResData>(
      `${_entity}/${PATH_API_DATA_TABLE_ROOT}${query || ""}`,
      { params: queryObject }
    );
    return {
      entity: _entity,
      isChildrenTree,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

export const fetchLinkedChildrenWithPagination = createAsyncThunk(
  "cruds/dataTable/fetchCrudDocumentsWithPagination",
  async ({ entity, query, /* isChildrenTree = true, */ parentId }: FetchLinkedChildrenPayload) => {
    const res = await axiosInstance.get<AxiosResData>(
      `/${entity}/${PATH_API_DATA_TABLE_ROOT}/${apiEndpointRootsEnum.linkedChildren}/${parentId}${query || ""}`
    );
    return {
      entity,
      /**
       * set to be true because is not head
       * ? or put the logic inside reducer.
       */
      isChildrenTree: true,
      documents: res.data.data,
      totalDocuments: res.data.totalDocuments,
    };
  }
);

interface AddCrudPayloadWithConfig extends AddCrudPayload {
  config?: {
    headers: {
      "Content-Type": "multipart/form-data";
    };
  };
}
/**
 * addCrudDocumentDataTable handles regular crud creation and linkedChildren creation
 * ! Todo: should be separate the functions
 * */
export const addCrudDocumentDataTable = createAsyncThunk(
  "crud/addDocument",
  async ({ entity, newDocument, query = "", config }: AddCrudPayloadWithConfig) => {
    const res = await axiosInstance.post(
      `${entity}/${PATH_API_DATA_TABLE_ROOT}${query}`,
      newDocument,
      config
    );
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      // documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
    // return res.data;
  }
);
/**
 * addCrudDocumentDataTable handles regular crud creation and linkedChildren creation
 * ! Todo: should be separate the functions
 * */
export const addCrudDocument = createAsyncThunk(
  "crud/addDocument",
  async ({
    entity,
    newDocument,
    query = "",
    config,
    queryObject,
    endpoint,
  }: AddCrudPayloadWithConfig) => {
    const res = await axiosInstance.post(`${endpoint || entity}`, newDocument, {
      params: queryObject,
      ...config,
    });
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      // documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
    // return res.data;
  }
);
export const addLinkedChildrenDocumentDataTable = createAsyncThunk(
  "crud/withPagination/addLinkedChildrenDocument",
  async ({ entity, newDocument, parentId, query = "" }: AddCrudPayload) => {
    /** handle endpoint by checking if parentId is passed */
    const endPoint = `${entity}/${PATH_API_DATA_TABLE_ROOT}/${apiEndpointRootsEnum.linkedChildren}/${parentId}`;
    const res = await axiosInstance.post(`${endPoint}${query}`, newDocument);
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      // documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
    // return res.data;
  }
);

// always return the updated document. without pagination.
export const updateCrudDocument = createAsyncThunk(
  "crud/updateDocument",
  async ({ entity, updateData, documentId }: UpdateCrudPayload) => {
    const endpoint = `${entity}/${documentId}`;
    const res = await axiosInstance.put(endpoint, updateData /* config */);
    if (!isAllModels(res.data.data)) {
      throw new Error("Data is not AllModels");
    }
    const payload = {
      entity,
      updatedDocument: res.data.data,
    };
    return payload;
  }
);

export const deleteCrudDocumentWithPagination = createAsyncThunk(
  "crud/withPagination/deleteDocument",
  async ({ entity, documentId, query = "" }: DeleteCrudPayload) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(
      `${entity}/${PATH_API_DATA_TABLE_ROOT}/${documentId}${query}`
    );
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
  }
);

export const deleteLinkedChildDocumentWithPagination = createAsyncThunk(
  "crud/withPagination/deleteLinkedChildDocumentWithPagination",
  async ({ entity, documentId, query = "" }: DeleteLinkedChildrenPayload) => {
    /**
     * in the Api first delete and do getCrudDocuments
     * returns new crudDocuments with limit number
     *  */
    const res = await axiosInstance.delete(
      `/${entity}/${PATH_API_DATA_TABLE_ROOT}/${apiEndpointRootsEnum.linkedChildren}/${documentId}${query}`
    );
    const payload = {
      // entity: res.data.collection,
      entity,
      documents: res.data.data,
      documentId,
      totalDocuments: res.data.totalDocuments,
    };
    return payload;
  }
);
