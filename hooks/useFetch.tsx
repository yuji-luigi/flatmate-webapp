import { Axios, AxiosRequestConfig } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import axiosInstance, {
  AxiosResDataGeneric,
  fetcher,
  fetcherWithoutData,
} from "../src/utils/axios-instance";

export type FetchMethods = "POST" | "GET" | "PUT" | "PATCH";

export function useFetch<T>(
  path: string,
  configs: {
    swrConfig?: SWRConfiguration;
    axiosConfig?: AxiosRequestConfig;
    withData?: boolean;
  } = { withData: true }
) {
  const { swrConfig, axiosConfig, withData } = configs;
  // TODO: necessary useMemo?
  return useSWR([path, axiosConfig, withData], fetcher, swrConfig);
}

type AxiosMethods = "post" | "get" | "delete" | "put" | "patch";

export function useRequest<Data = any, Payload = any>({
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
    requestor,
    swrConfig
  );
}

type URL = string;
async function requestor<Data, Payload>(
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
