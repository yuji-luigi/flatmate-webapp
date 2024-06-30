import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { json } from "stream/consumers";
import Link from "next/link";
import { apiEndpointRootsEnum } from "../../../path/path-api";
import axiosInstance from "../../../utils/axios-instance";
// import { useCurrentSpaceContext } from '../../../context/CurrentSpaceContext';
import { useCookieContext } from "../../../context/CookieContext";
import { PATH_CLIENT, _PATH_FRONTEND } from "../../../path/path-frontend";

const getSpaceAsCookie = async (crudId: string) => {
  const res = await axiosInstance.get(`${apiEndpointRootsEnum.getSpaceSelections}/${crudId}`, {
    withCredentials: true,
  });

  return res.data.data;
};

/**
 * in this page todo
 * 1. get crudId from url
 * 2. get space as jwt from server
 * 3. redirect to dashboard.
 *
 * not using onClick event on button because it will be a link
 * so the component can be used generically
 */

const EnterSpacePage = () => {
  const router = useRouter();
  const { documentId } = router.query;
  const { setCurrentSpace } = useCookieContext();
  const { data, error, isLoading } = useSWR(documentId, getSpaceAsCookie);
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) {
    return <div>no data</div>;
  }
  // set session localStorage. cookie is handled by server
  // redirect to dashboard

  // setSpaceSession(data.jwt);

  router.push(_PATH_FRONTEND.dashboard.root);
  return <p>loading...</p>;
};

export default EnterSpacePage;
