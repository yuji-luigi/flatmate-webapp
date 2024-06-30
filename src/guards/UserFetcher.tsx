import React from "react";
import axiosInstance from "../utils/axios-instance";
import { apiEndpoint, apiEndpointRootsEnum } from "../path/path-api";

export const UserFetcher = async ({ children }) => {
  const { data } = await axiosInstance.get(apiEndpoint.auth.me);
  return <div>{children}</div>;
};
