import React, { useEffect } from "react";
import { useCrudSliceStore } from "../redux/features/crud/crudSlice";
import { useCookieContext } from "../context/CookieContext";
import { Entity, FrontendEntity } from "../types/redux/CrudSliceInterfaces";
import useAuth from "../../hooks/useAuth";
import useRouterWithCustomQuery from "./useRouterWithCustomQuery";
import { sectionConfigsByUserType } from "../json/section-config/sectionsConfig";

export const useGetSectionConfig = () => {
  const { user } = useAuth();
  const { query } = useRouterWithCustomQuery();
  const entity = query.entity;
  if (!user || !entity) {
    console.error("useGetSectionConfig must be used in crud pages: [entity].tsx files");
    return null;
  }
  const currentSectionConfig = sectionConfigsByUserType[user?.loggedAs][entity];
  return currentSectionConfig;
};
