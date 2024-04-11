import React, { useEffect } from "react";
import { useCrudSliceStore } from "../redux/features/crud/crudSlice";
import { useCookieContext } from "../context/CookieContext";
import { Entity, FrontendEntity } from "../types/redux/CrudSliceInterfaces";

export const useGetCrudDocuments = ({
  entity,
  withPagination = true,
}: {
  entity?: FrontendEntity | null;
  withPagination: boolean;
}) => {
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { currentSpace, currentOrganization } = useCookieContext();

  useEffect(() => {
    if (!entity) return;
    fetchCrudDocumentsWithPagination({ entity });
  }, [currentSpace?._id]);
};
