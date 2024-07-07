import { Axios, AxiosRequestConfig } from "axios";
import useSWR, { SWRConfiguration } from "swr";
import axiosInstance, {
  AxiosResDataGeneric,
  fetcher,
  fetcherWithoutData,
} from "../src/utils/axios-instance";
import { useEffect, useState } from "react";
import { set } from "nprogress";

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

type URL = string;

export function useRequestor<Data, Payload>(
  path: string,
  {
    method = "get",
    payload,
    axiosConfig,
  }: {
    method: AxiosMethods;
    payload?: Payload;
    axiosConfig?: AxiosRequestConfig;
  }
): { data: Data | null; isLoading: boolean; error: any } {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | any>(null);
  const args: [AxiosMethods, URL, Payload?, AxiosRequestConfig?] = [
    method,
    path,
    payload,
    axiosConfig,
  ];
  const makeRequest = async () => {
    try {
      const rawRes = await requestor<Data, Payload>(args);
      setData(rawRes.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    makeRequest();
  }, [args]);

  return { data, isLoading, error };
}

async function requestor<Data, Payload>(
  args: [AxiosMethods, URL, Payload?, AxiosRequestConfig?]
): Promise<{ data: Data; [key: string]: any }> {
  const [method, path, payload, axiosConfig] = args;
  if (method === "post" || method === "put" || method === "patch") {
    const rawRes = await axiosInstance.post(path, payload, axiosConfig);
    return rawRes.data;
  }
  const rawRes = await axiosInstance[method](path, axiosConfig);
  return rawRes;
}
