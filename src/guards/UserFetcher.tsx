import React from "react";
import axiosInstance from "../utils/axios-instance";
import { _PATH_API, PATH_API } from "../path/path-api";

export const UserFetcher = async ({ children }) => {
  const { data } = await axiosInstance.get(_PATH_API.auth.me);
  return <div>{children}</div>;
};
