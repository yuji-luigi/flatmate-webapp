import { Axios, AxiosRequestConfig } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import axiosInstance, { AxiosResDataGeneric } from "../src/utils/axios-instance";

export type FetchMethods = "POST" | "GET" | "PUT" | "PATCH";
const useFetch = async ({ path, method }: { path: string; method: FetchMethods }) => {
  const res = await fetch(path, {
    method,
  });
  const data = await res.json();
  return data;
};

export default useFetch;
type AxiosMethods = "post" | "get" | "delete" | "put" | "patch";

export function useFetchSwr<Data = any, Payload = any>({
  path,
  method,
  payload = {} as Payload,
  swrConfig = {},
  axiosConfig = {},
}: {
  path: string;
  method: AxiosMethods;
  payload?: Payload;
  axiosConfig?: AxiosRequestConfig;
  swrConfig?: SWRConfiguration;
}) {
  return useSWR<AxiosResDataGeneric<Data>>(
    [method, path, payload, axiosConfig],
    fetcher,
    swrConfig
  );
}

type URL = string;
async function fetcher<Data, Payload>(
  args: [AxiosMethods, URL, Payload, AxiosRequestConfig]
): Promise<Data> {
  const [method, path, payload, axiosConfig] = args;
  if (method === "post" || method === "put" || method === "patch") {
    const rawRes = await axiosInstance.post(path, payload, axiosConfig);
    return rawRes.data;
  }
  const rawRes = await axiosInstance[method](path, axiosConfig);
  return rawRes.data;
}
