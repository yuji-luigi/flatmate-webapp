/*************************************
 *  Created on Sat Feb 04 2023
 *
 *  Copyright (c) 2023 Yuji Sato
 * */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { AxiosResData, AxiosResDataGeneric } from "../../utils/axios-instance";
import { apiEndpoint } from "../../path/path-api";
import { SpaceModel } from "../../types/models/space-model";

export type FetchSpaceSelectionPayload = {
  query?: string;
  queryObject?: Record<string, unknown>;
};

export const fetchSpaceSelections = createAsyncThunk(
  "spaceSelections/fetchSpaceSelections",
  async ({ query, queryObject = {} }: FetchSpaceSelectionPayload) => {
    const res = await axiosInstance.get<AxiosResDataGeneric<SpaceModel[]>>(
      `${apiEndpoint.spaceSelections.root}${query || ""}`,
      queryObject
    );
    return {
      documents: res.data.data,
    };
  }
);

export const selectSpaceSelection = createAsyncThunk(
  "spaceSelections/selectSpaceSelection",
  async (id: string) => {
    const res = await axiosInstance.put<AxiosResDataGeneric<SpaceModel[]>>(
      apiEndpoint.spaceSelections.byId(id)
    );
    return {
      documents: res.data.data,
    };
  }
);
