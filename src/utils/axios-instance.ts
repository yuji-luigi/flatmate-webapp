import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Sections } from "../types/general/data/sections-type";
import { API_BASE_URL } from "../path/path-api";
import { AllModels } from "../types/models/allmodels";
import { UserModel, Role, MeUser } from "../types/models/space-model";

// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export interface AxiosResData {
  success: boolean;
  collection: Sections;
  data: Array<AllModels>;
  totalDocuments: number;
}
export interface AxiosResDataGeneric<DataType> {
  success: boolean;
  collection: Sections;
  data: DataType;
}
export interface AxiosMeResponse {
  success: boolean;
  collection: Sections;
  user: MeUser;
  loggedAs: Role;
}
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accessToken');
    // config.headers.Authorization = token as string;
    // config.withCredentials = true;
    return { ...config, withCredentials: true };
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<AxiosResData>) =>
    // const token = localStorage.getItem('accessToken');
    // response.headers.Authorization = token as string;
    response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Error connecting to server.")
);

export const uploadConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  // withCredentials: true,
};
export default axiosInstance;
